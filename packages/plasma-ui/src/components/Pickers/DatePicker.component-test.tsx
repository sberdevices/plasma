/* eslint-disable cypress/no-unnecessary-waiting */
import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

const noop = () => {};

describe('plasma-ui: DatePicker', () => {
    const DatePicker = getComponent('DatePicker');
    const AutofocusedDatePicker = () => (
        <DatePicker
            scrollSnapType="none"
            onChange={noop}
            infiniteScroll={false}
            value={new Date(2022, 0, 12)}
            min={new Date(2000, 3, 15)}
            max={new Date(2025, 10, 30)}
            autofocus
        />
    );

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

        cy.get('div > div:nth-child(1)').contains('5').click({ force: true });
        cy.wait(150);
        cy.get('div > div:nth-child(2)').contains('мая').click({ force: true });
        cy.wait(150);
        cy.get('div > div:nth-child(3)').contains('1979').click({ force: true });

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

    it('jump 10 down', () => {
        mount(
            <CypressTestDecorator>
                <AutofocusedDatePicker />
            </CypressTestDecorator>,
        );

        cy.get('body').type('{pagedown}');
        cy.wait(100);
        cy.matchImageSnapshot();
    });

    it('jump 10 up', () => {
        mount(
            <CypressTestDecorator>
                <AutofocusedDatePicker />
            </CypressTestDecorator>,
        );

        cy.get('body').type('{pageup}');
        cy.wait(100);
        cy.matchImageSnapshot();
    });

    it('jump home', () => {
        mount(
            <CypressTestDecorator>
                <AutofocusedDatePicker />
            </CypressTestDecorator>,
        );

        cy.get('body').type('{home}');
        cy.wait(100);
        cy.matchImageSnapshot();
    });

    it('jump end', () => {
        mount(
            <CypressTestDecorator>
                <AutofocusedDatePicker />
            </CypressTestDecorator>,
        );

        cy.get('body').type('{end}');
        cy.wait(100);
        cy.matchImageSnapshot();
    });
});
