import React from 'react';

import { navigate } from '../../../../../cypress/support/commands';
import { startApp, wrapComponent, images } from '../../testHelpers/testRenderHelpers';

import { HeroSlider } from './HeroSlider';
import { HeroSliderProps } from './types';

interface State {
    'hero-slider': {
        items: HeroSliderProps;
    };
}

function initTests<T>(outerProps: T) {
    return startApp<keyof State, State>(
        [
            {
                name: 'hero-slider',
                component: wrapComponent((props) => <HeroSlider {...props.state} />, {
                    state: outerProps,
                }),
            },
        ],
        ({ pushScreen }) => pushScreen('hero-slider'),
    );
}

describe('HeroSlider@sberbox', () => {
    let onItemClick: () => void;
    let onActiveItemChange: () => void;

    beforeEach(() => {
        onItemClick = cy.stub();
        onActiveItemChange = cy.stub();

        initTests({
            time: 3000,
            withTimeline: true,
            items: Array.from({ length: 6 }, (_, i) => {
                return {
                    title: `Slide ${i + 1}`,
                    src: images.image320,
                    id: i + 1,
                };
            }),
            onItemClick,
            onActiveItemChange,
            buttonText: 'Покажи',
        });
    });

    it('circular play', () => {
        cy.sendNavigateAction(navigate.RIGHT, { times: 5 });

        cy.get('[data-cy="hero-slide-5"]').should('be.visible');

        cy.get('[data-cy="hero-slide-0"]', { timeout: 3500 })
            .should('be.visible')
            .then(() => {
                expect(onActiveItemChange).to.be.calledWithExactly(
                    {
                        title: 'Slide 1',
                        src: images.image320,
                        id: 1,
                    },
                    0,
                );
            });
    });

    it('switch forward by keyboard', () => {
        cy.sendNavigateAction(navigate.RIGHT, { times: 2 }).then(() => {
            expect(onActiveItemChange).to.be.calledThrice;
            expect(onActiveItemChange).to.be.calledWithExactly(
                {
                    title: 'Slide 3',
                    src: images.image320,
                    id: 3,
                },
                2,
            );

            cy.matchImageSnapshot();
        });
    });

    it('switch backward by keyboard', () => {
        cy.sendNavigateAction(navigate.LEFT, { times: 2 }).then(() => {
            expect(onActiveItemChange).to.be.calledThrice;
            expect(onActiveItemChange).to.be.calledWithExactly(
                {
                    title: 'Slide 5',
                    src: images.image320,
                    id: 5,
                },
                4,
            );

            cy.matchImageSnapshot();
        });
    });

    it('call click handler', () => {
        cy.focused()
            .click()
            .then(() => {
                expect(onItemClick).to.be.calledWithExactly(
                    {
                        title: 'Slide 1',
                        src: images.image320,
                        id: 1,
                    },
                    0,
                );

                expect(onItemClick).to.be.called;
            });
    });
});
