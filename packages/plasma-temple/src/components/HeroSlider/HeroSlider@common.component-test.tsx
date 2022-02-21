import React from 'react';

import { startApp, wrapComponent, images } from '../../testHelpers/testRenderHelpers';

import { HeroSlider } from './HeroSlider';
import { HeroSliderProps } from './types';

interface State {
    'hero-slider': {
        items: HeroSliderProps;
    };
}

// const imageSrc = 'https://plasma.sberdevices.ru/ui-storybook/images/320_320_0.jpg';

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

describe('HeroSlider', () => {
    let onItemClick: () => void;
    let onActiveItemChange: () => void;

    beforeEach(() => {
        // stubImage(imageSrc, 'images/320_320_0.jpg');

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

    it('render', () => {
        cy.matchImageSnapshot();
    });

    it('should switch to next slide automaticaly', () => {
        cy.get('[data-cy="hero-slide-1"]', { timeout: 3500 })
            .should('be.visible')
            .then(() => {
                expect(onActiveItemChange).to.be.calledWithExactly(
                    {
                        title: 'Slide 2',
                        src: images.image320,
                        id: 2,
                    },
                    1,
                );
            });
    });
});

describe('HeroSlider without timline', () => {
    it('render', () => {
        initTests({
            withTimeline: false,
            disableAutofocus: true,
            items: Array.from({ length: 6 }, (_, i) => {
                return {
                    title: `Slide ${i + 1}`,
                    src: images.image320,
                    id: i + 1,
                };
            }),
            buttonText: 'Покажи',
        }).then(() => cy.matchImageSnapshot());
    });
});
