/* eslint-disable cypress/no-unnecessary-waiting */
import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

const noop = () => {};

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

    it('change values', () => {
        mount(
            <CypressTestDecorator>
                <DatePicker
                    scrollSnapType="none"
                    onChange={noop}
                    value={new Date(1985, 8, 1)}
                    min={new Date(1975, 1, 1)}
                    max={new Date(1995, 10, 30)}
                />
            </CypressTestDecorator>,
        );

        // отключение анимаций на всех div'ах внутри окружения, TODO: перенести в plasma-cy-utils?
        cy.get('div').invoke('attr', 'style', 'transition: unset; animation: none; scroll-snap-type: none;');

        cy.contains('5').click({ force: true });
        cy.contains('мая').click({ force: true });
        cy.contains('1979').click({ force: true });

        cy.wait(1000);

        cy.matchImageSnapshot();
    });

    it('with controls', () => {
        mount(
            <CypressTestDecorator>
                <DatePicker
                    value={new Date(1980, 8, 1)}
                    min={new Date(1975, 1, 1)}
                    max={new Date(1985, 10, 30)}
                    controls
                    autofocus
                />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
