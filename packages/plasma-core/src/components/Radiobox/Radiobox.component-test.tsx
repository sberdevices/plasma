import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-core: Radiobox', () => {
    const Radiobox = getComponent('Radiobox');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Radiobox />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('with focus', () => {
        mount(
            <CypressTestDecorator>
                <Radiobox label="checkbox with focus" />
            </CypressTestDecorator>,
        );

        cy.get('input').focus();

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
        );
        cy.matchImageSnapshot();
    });

    it('_checked', () => {
        mount(
            <CypressTestDecorator>
                <Radiobox name="robots" checked label="radiobox checked" description="О чём мечтают роботы?" />
                <Radiobox name="robots" label="radiobox" description="О чём мечтают роботы?" />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('_focused', () => {
        mount(
            <CypressTestDecorator>
                <Radiobox name="robots" focused label="radiobox checked" description="О чём мечтают роботы?" />
                <Radiobox name="robots" focused checked label="radiobox" description="О чём мечтают роботы?" />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('_disabled', () => {
        mount(
            <CypressTestDecorator>
                <Radiobox checked disabled label="radiobox checked" description="О чём мечтают роботы?" />
                <Radiobox disabled label="radiobox" description="О чём мечтают роботы?" />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it(':id', () => {
        mount(
            <CypressTestDecorator noSSR>
                <Radiobox name="uniqId" label="radiobox" description="О чём мечтают роботы?" />
                <Radiobox name="robots" id="radio" label="radiobox" description="О чём мечтают роботы?" />
            </CypressTestDecorator>,
        );

        cy.get('#radio').then((el) => {
            cy.get(`#${el.attr('aria-labelledby')}`).should('contain', 'radiobox');

            cy.get(`#${el.attr('aria-describedby')}`).should('contain', 'О чём мечтают роботы');
        });

        cy.get('[name="uniqId"]').then((el) => {
            cy.get(`#${el.attr('aria-labelledby')}`).should('contain', 'radiobox');

            cy.get(`#${el.attr('aria-describedby')}`).should('contain', 'О чём мечтают роботы');
        });

        cy.get('[name="uniqId"]').should('have.attr', 'id');
    });

    it('squeezes', () => {
        mount(
            <CypressTestDecorator>
                <div style={{ overflow: 'hidden', width: 150 }}>
                    <Radiobox
                        checked
                        disabled
                        label="Radiobox with a very very very very very long label"
                        description="Radiobox description with a very very very very very long text"
                    />
                    <Radiobox disabled label="Radiobox 2" description="Radiobox 2 description" />
                </div>
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });
});

describe('plasma-core: RadioGroup', () => {
    const Radiobox = getComponent('Radiobox');
    const RadioGroup = getComponent('RadioGroup');
    const H3 = getComponent('Headline3');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <RadioGroup aria-labelledby="radiogroup-title-id">
                    <H3 id="radiogroup-title-id">Заголовок</H3>
                    <Radiobox name="radio-1" label="Радиокнопка 1" description="Описание 1" defaultChecked />
                    <Radiobox name="radio-1" label="Радиокнопка 2" description="Описание 2" />
                </RadioGroup>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
