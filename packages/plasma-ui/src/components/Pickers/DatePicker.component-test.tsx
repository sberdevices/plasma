import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-ui: DatePicker', () => {
    const DatePicker = getComponent('DatePicker');

    it('default', () => {
        mount(
            <CypressTestDecorator>
                <DatePicker value={new Date(1985, 8, 1)} min={new Date(1975, 1, 1)} max={new Date(1985, 10, 30)} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('without infiniteScroll', () => {
        mount(
            <CypressTestDecorator>
                <DatePicker
                    infiniteScroll={false}
                    value={new Date(1980, 8, 1)}
                    min={new Date(1975, 1, 1)}
                    max={new Date(1985, 10, 30)}
                />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
