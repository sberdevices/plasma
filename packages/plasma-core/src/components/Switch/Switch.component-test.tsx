import React from 'react';
import { mount, CypressTestDecorator, getComponent, PadMe } from '@sberdevices/plasma-cy-utils';

describe('plasma-core: Switch', () => {
    const Switch = getComponent('Switch');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Switch label="Переключатель" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_checked', () => {
        mount(
            <CypressTestDecorator>
                <Switch checked label="Переключатель" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_focused', () => {
        mount(
            <CypressTestDecorator>
                <Switch focused label="Переключатель" />
                <PadMe />
                <Switch focused checked label="Переключатель" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_disabled', () => {
        mount(
            <CypressTestDecorator>
                <Switch disabled focused label="Переключатель" />
                <PadMe />
                <PadMe />
                <Switch disabled focused checked label="Переключатель" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_pressed', () => {
        mount(
            <CypressTestDecorator>
                <Switch label="Переключатель" />
                <PadMe />
                <Switch pressed label="Переключатель" />
                <PadMe />
                <Switch checked label="Переключатель" />
                <PadMe />
                <Switch pressed checked label="Переключатель" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('onClick', () => {
        mount(
            <CypressTestDecorator>
                <Switch id="switch" label="Переключатель" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
        cy.get('#switch').click();
        cy.matchImageSnapshot('clicked');
    });
});
