import React from 'react';
import ReactDom from 'react-dom';
import { mount } from '@cypress/react';

import { CypressTestDecorator, getComponent } from '../../__helpers';

describe('plasma-core: Checkbox', () => {
    const Checkbox = getComponent('Checkbox');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Checkbox />
            </CypressTestDecorator>,
            { ReactDom },
        );
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
            { ReactDom },
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
            { ReactDom },
        );
        cy.matchImageSnapshot();
    });

    it('_checked', () => {
        mount(
            <CypressTestDecorator>
                <Checkbox checked label="checkbox checked" description="О чём мечтают роботы?" />
                <Checkbox label="checkbox" description="О чём мечтают роботы?" />
            </CypressTestDecorator>,
            { ReactDom },
        );
        cy.matchImageSnapshot();
    });

    it('_indeterminate', () => {
        mount(
            <CypressTestDecorator>
                <Checkbox indeterminate label="indeterminate checkbox" description="О чём мечтают роботы?" />
            </CypressTestDecorator>,
            { ReactDom },
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
            { ReactDom },
        );
        cy.matchImageSnapshot();
    });
});
