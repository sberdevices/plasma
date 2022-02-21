import React from 'react';
import { unmount } from '@cypress/react';
import { Card, CardBody, CardMedia, CardContent, CardHeadline1 } from '@sberdevices/plasma-ui';

import { navigate } from '../../../../../cypress/support/commands';
import { wrapComponent, startApp, images } from '../../testHelpers/testRenderHelpers';

import { GalleryPage } from './GalleryPage';
import { GalleryPageState } from './types';

interface State {
    gallery: GalleryPageState<{}>;
}

/**
 * TODO
 * упросить инициализацию после влития
 * https://github.com/sberdevices/plasma/pull/1041
 * https://github.com/sberdevices/plasma/pull/1046
 */
describe('GalleryPage', () => {
    describe('Single Gallery on Page', () => {
        let stubbedOnCardClick: Function;

        const stubbedData = Array.from({ length: 10 }, (_, i) => ({
            label: `Title ${i + 1}`,
            description: `Decription for Card ${i + 1}`,
            id: i,
            position: i + 1,
            image: {
                src: images.image320,
            },
        }));

        beforeEach(() => {
            stubbedOnCardClick = cy.stub();

            startApp<keyof State, State>(
                [
                    {
                        name: 'gallery',
                        component: wrapComponent(GalleryPage, () => ({
                            onCardClick: stubbedOnCardClick,
                        })),
                    },
                ],
                ({ pushHistory }) => {
                    pushHistory('gallery', {
                        activeGalleryIndex: 0,
                        gallery: {
                            items: stubbedData,
                            activeCardIndex: 0,
                        },
                    });
                },
            );
        });

        afterEach(() => {
            cy.matchImageSnapshot();
            unmount();
        });

        it('screen rendered', () => {
            cy.get('[data-cy="gallery-0"] [tabindex="0"]').should('be.exist');
        });

        it('click on card', () => {
            cy.sendNavigateAction([navigate.RIGHT, navigate.ENTER]).then(() => {
                expect(stubbedOnCardClick).to.be.calledWith(stubbedData[1]);
            });
        });
    });

    describe('Single Gallery with title on Page', () => {
        let stubbedOnCardClick: Function;

        const stubbedData = Array.from({ length: 10 }, (_, i) => ({
            label: `Title ${i + 1}`,
            description: `Decription for Card ${i + 1}`,
            id: i,
            position: i + 1,
            image: {
                src: images.image320,
            },
        }));

        beforeEach(() => {
            stubbedOnCardClick = cy.stub();

            startApp<keyof State, State>(
                [
                    {
                        name: 'gallery',
                        component: wrapComponent(GalleryPage, () => ({
                            onCardClick: stubbedOnCardClick,
                        })),
                    },
                ],
                ({ pushHistory }) => {
                    pushHistory('gallery', {
                        activeGalleryIndex: 0,
                        gallery: {
                            title: 'Cypress Gallery',
                            items: stubbedData,
                            activeCardIndex: 0,
                        },
                    });
                },
            );
        });

        afterEach(() => {
            cy.matchImageSnapshot();
            unmount();
        });

        it('screen rendered', () => {
            cy.get('[data-cy="gallery-0"] [tabindex="0"]').should('be.exist');
        });

        it('click on card', () => {
            cy.sendNavigateAction([navigate.RIGHT, navigate.ENTER]).then(() => {
                expect(stubbedOnCardClick).to.be.calledWith(stubbedData[1]);
            });
        });
    });

    describe('Multiple Galleries on Page', () => {
        let stubbedOnCardClick: Function;

        const stubbedData = Array.from({ length: 10 }, (_, i) => ({
            label: `Title ${i + 1}`,
            description: `Decription for Card ${i + 1}`,
            id: i,
            position: i + 1,
            image: {
                src: images.image320,
            },
        }));

        const galleries = [
            {
                title: 'Cypress Gallery 1',
                id: 'first',
                activeCardIndex: 0,
                items: stubbedData.map((item) => ({
                    ...item,
                    time: '3h 42min',
                })),
            },
            {
                title: 'Cypress Gallery 2',
                id: 'second',
                activeCardIndex: 0,
                items: stubbedData,
            },
            {
                title: 'Cypress Gallery 3',
                id: 'third',
                activeCardIndex: 0,
                items: stubbedData.map((item, index) => ({
                    ...item,
                    tag: `Tag ${index + 1}`,
                })),
            },
        ];

        beforeEach(() => {
            stubbedOnCardClick = cy.stub();

            startApp<keyof State, State>(
                [
                    {
                        name: 'gallery',
                        component: wrapComponent(GalleryPage, () => ({
                            onCardClick: stubbedOnCardClick,
                        })),
                    },
                ],
                ({ pushHistory }) => {
                    pushHistory('gallery', {
                        activeGalleryIndex: 0,
                        gallery: galleries,
                    });
                },
            );
        });

        afterEach(() => {
            cy.matchImageSnapshot();
            unmount();
        });

        it('screen rendered', () => {
            cy.get('[data-cy="gallery-0"] [tabindex="0"]').should('be.exist');
        });

        it('click on card', () => {
            cy.sendNavigateAction([
                navigate.DOWN,
                navigate.RIGHT,
                navigate.DOWN,
                navigate.UP,
                navigate.RIGHT,
                navigate.ENTER,
            ]).then(() => {
                expect(stubbedOnCardClick).to.be.calledWith(stubbedData[2]);
            });
        });
    });

    describe('CustomCard in galleries', () => {
        it('Variable card height', () => {
            const stubbedData = Array.from({ length: 10 }, (_, i) => ({
                label: `Title ${i + 1}`,
                description: `Decription for Card ${i + 1}`,
                id: i,
                position: i + 1,
                image: {
                    src: images.image320,
                },
            }));

            const galleries = [
                {
                    title: 'Cypress Gallery 1',
                    id: 'first',
                    activeCardIndex: 0,
                    items: stubbedData.map((item) => ({
                        ...item,
                        covered: true,
                    })),
                },
                {
                    title: 'Cypress Gallery 2',
                    id: 'second',
                    activeCardIndex: 0,
                    items: stubbedData.map((item) => ({
                        ...item,
                        covered: false,
                    })),
                },
            ];

            const CustomCard: React.FC<GalleryCardProps> = ({ card, focused }) => {
                const src = Array.isArray(card.image.src) ? card.image.src[0] : card.image.src;

                return (
                    <Card focused={focused} style={{ width: '398px', height: card.covered ? '200px' : '600px' }}>
                        <CardBody>
                            <CardMedia src={src} ratio={card.covered ? '2 / 1' : '1 / 1'} />
                            <CardContent cover={card.covered}>
                                <CardHeadline1>{card.label}</CardHeadline1>
                            </CardContent>
                        </CardBody>
                    </Card>
                );
            };

            const stubbedOnCardClick = cy.stub();

            startApp<keyof State, State>(
                [
                    {
                        name: 'gallery',
                        component: wrapComponent(GalleryPage, () => ({
                            onCardClick: stubbedOnCardClick,
                            galleryCard: CustomCard,
                        })),
                    },
                ],
                ({ pushHistory }) => {
                    pushHistory('gallery', {
                        activeGalleryIndex: 0,
                        gallery: galleries,
                    });
                },
            ).then(() => {
                cy.matchImageSnapshot();
            });
        });
    });
});
