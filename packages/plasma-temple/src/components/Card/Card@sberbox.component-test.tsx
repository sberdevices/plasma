import React from 'react';

import { startApp } from '../../testHelpers/testRenderHelpers';
import { Grid } from '../Grid/Grid';

import { Card, CardProps } from './Card';

const entity = {
    id: 1,
    image: {
        src: 'images/placeholder.png',
    },
};

export function generateWrapper(passedProps?: Partial<CardProps>) {
    const defaultProps: CardProps = {
        entity,
        index: 0,
        onClick: () => {},
    };

    const props = { ...defaultProps, ...passedProps };

    startApp(
        [
            {
                name: 'grid',
                component: () => (
                    <Grid>
                        <Card {...props}>Карточка</Card>
                    </Grid>
                ),
            },
        ],
        ({ pushScreen }) => pushScreen('grid'),
    );

    cy.mockBackgroundImage('[data-cy="Card-image"] > div', 'images/placeholder.png');
}

describe('Card', () => {
    it('render ', () => {
        generateWrapper();
        cy.matchImageSnapshot();
    });

    it('render cover content', () => {
        generateWrapper({ cover: true });
        cy.matchImageSnapshot();
    });

    it('render cover content without gradient', () => {
        generateWrapper({ cover: true, coverGradient: false });
        cy.matchImageSnapshot();
    });

    it('render custom ratio', () => {
        generateWrapper({ ratio: 150 });
        cy.matchImageSnapshot();
    });

    it('render with image ratio', () => {
        generateWrapper({ entity: { ...entity, image: { ...entity.image, ratio: '1 / 2' }, ratio: 110 } });
        cy.matchImageSnapshot();
    });

    it('render with position badge', () => {
        generateWrapper({ withPositionBadge: true });
        cy.matchImageSnapshot();
    });

    it('render with badge', () => {
        generateWrapper({ entity: { ...entity, badge: { type: 'accent', content: 'Скидка 40%' } } });
        cy.matchImageSnapshot();
    });

    it('click on Card', () => {
        const onClickStub = cy.stub();
        generateWrapper({ onClick: onClickStub });
        cy.get('[data-cy="Card"]')
            .click()
            .then(() => {
                expect(onClickStub).to.be.calledOnce;
            });
    });
});
