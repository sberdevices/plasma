import React from 'react';
import ReactDom from 'react-dom';
import { mount } from '@cypress/react';
import { CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-core: Radiobox', () => {
    const Radiobox = getComponent('Radiobox');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Radiobox />
            </CypressTestDecorator>,
            { ReactDom },
        );

        cy.matchImageSnapshot();
    });

    it('__label', () => {
        mount(
            <CypressTestDecorator>
                <Radiobox name="robots" label="simple radiobox" />
                <Radiobox
                    name="robots"
                    label={
                        <span>
                            radiobox with <a href="https://plasma.sberdevices.ru/">link</a>
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
                <Radiobox name="robots" label="simple radiobox" description="О чём мечтают роботы?" />
                <Radiobox
                    name="robots"
                    label="simple radiobox"
                    description={
                        <span>
                            Об <a href="https://plasma.sberdevices.ru">электроовцах</a>
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
                <Radiobox name="robots" checked label="radiobox checked" description="О чём мечтают роботы?" />
                <Radiobox name="robots" label="radiobox" description="О чём мечтают роботы?" />
            </CypressTestDecorator>,
            { ReactDom },
        );
        cy.matchImageSnapshot();
    });

    it('_disabled', () => {
        mount(
            <CypressTestDecorator>
                <Radiobox checked disabled label="radiobox checked" description="О чём мечтают роботы?" />
                <Radiobox disabled label="radiobox" description="О чём мечтают роботы?" />
            </CypressTestDecorator>,
            { ReactDom },
        );
        cy.matchImageSnapshot();
    });
});
