import React from 'react';

import { startApp } from '../../testHelpers/testRenderHelpers';
import { Card, CardEntity } from '../Card/Card';

import { Grid, GridProps } from './Grid';

const items = Array.from(
    { length: 6 },
    (_, index) =>
        ({
            id: index,
            name: 'Название ',
            image: { src: 'images/img.png' },
        } as CardEntity<number>),
);

export function generateWrapper(props?: Partial<GridProps>) {
    startApp([
        {
            name: 'grid',
            component: () => (
                <Grid {...props}>
                    {items.map((item, index) => (
                        <Card key={item.id} entity={item} index={index} onClick={() => {}} cover>
                            {item.name}
                        </Card>
                    ))}
                </Grid>
            ),
        },
    ]);

    cy.mockBackgroundImage('[data-cy="Card-image"] > div', 'images/img.png');

    if (props?.background) {
        cy.mockImage('[data-cy="background-image"]', 'images/parrot.png');
    }
}

describe('Grid', () => {
    it('render grid', () => {
        generateWrapper();
        cy.matchImageSnapshot();
    });

    it('render grid with background', () => {
        generateWrapper({ background: { src: 'images/img.png' } });
        cy.matchImageSnapshot();
    });

    it('set grid columns', () => {
        generateWrapper({ columnXL: 3, columnM: 2, columnS: 1 });
        cy.matchImageSnapshot();
    });
});
