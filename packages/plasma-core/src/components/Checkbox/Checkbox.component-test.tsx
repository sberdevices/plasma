import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-core: Checkbox', () => {
    const Checkbox = getComponent('Checkbox');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Checkbox />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('with focus', () => {
        mount(
            <CypressTestDecorator>
                <Checkbox label="checkbox with focus" />
            </CypressTestDecorator>,
        );

        cy.get('input').focus();

        cy.matchImageSnapshot();
    });

    it('__label', () => {
        mount(
            <CypressTestDecorator>
                <Checkbox label="simple checkbox" />
                <Checkbox
                    label={
                        <span>
                            chekbox with <a href="https://plasma.sberdevices.ru/">link</a>
                        </span>
                    }
                />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('__description', () => {
        mount(
            <CypressTestDecorator>
                <Checkbox label="simple checkbox" description="О чём мечтают роботы?" />
                <Checkbox
                    label="simple checkbox"
                    description={
                        <span>
                            Об <a href="https://plasma.sberdevices.ru/">электроовцах</a>
                        </span>
                    }
                />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('_checked', () => {
        mount(
            <CypressTestDecorator>
                <Checkbox checked label="checkbox checked" description="О чём мечтают роботы?" />
                <Checkbox label="checkbox" description="О чём мечтают роботы?" />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('_focused', () => {
        mount(
            <CypressTestDecorator>
                <Checkbox focused checked label="checkbox checked" description="О чём мечтают роботы?" />
                <Checkbox focused label="checkbox" description="О чём мечтают роботы?" />
                <Checkbox focused indeterminate label="indeterminate checkbox" description="О чём мечтают роботы?" />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('_indeterminate', () => {
        mount(
            <CypressTestDecorator>
                <Checkbox indeterminate label="indeterminate checkbox" description="О чём мечтают роботы?" />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('_disabled', () => {
        mount(
            <CypressTestDecorator>
                <Checkbox checked disabled label="checkbox checked" description="О чём мечтают роботы?" />
                <Checkbox disabled label="checkbox" description="О чём мечтают роботы?" />
                <Checkbox indeterminate disabled label="indeterminate checkbox" description="О чём мечтают роботы?" />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('squeezes', () => {
        mount(
            <CypressTestDecorator>
                <div style={{ overflow: 'hidden', width: 150 }}>
                    <Checkbox
                        checked
                        disabled
                        label="Checkbox with a very very very very very long label"
                        description="Checkbox description with a very very very very very long text"
                    />
                    <Checkbox disabled label="Checkbox 2" description="Checkbox 2 description" />
                </div>
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });
});
