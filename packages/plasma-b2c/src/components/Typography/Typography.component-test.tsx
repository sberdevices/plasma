import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-b2c: Typography', () => {
    const BodyL = getComponent('BodyL');
    const BodyM = getComponent('BodyM');
    const BodyS = getComponent('BodyS');
    const BodyXS = getComponent('BodyXS');
    const BodyXXS = getComponent('BodyXXS');
    const TextL = getComponent('TextL');
    const TextM = getComponent('TextM');
    const TextS = getComponent('TextS');
    const TextXS = getComponent('TextXS');

    it('BodyL', () => {
        mount(
            <CypressTestDecorator>
                <BodyL>BodyL</BodyL>
                <BodyL bold>BodyL Semibold</BodyL>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('BodyM', () => {
        mount(
            <CypressTestDecorator>
                <BodyM>BodyM</BodyM>
                <BodyM bold>BodyM Semibold</BodyM>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('BodyS', () => {
        mount(
            <CypressTestDecorator>
                <BodyS>BodyS</BodyS>
                <BodyS bold>BodyS Semibold</BodyS>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('BodyXS', () => {
        mount(
            <CypressTestDecorator>
                <BodyXS>BodyXS</BodyXS>
                <BodyXS bold>BodyXS Semibold</BodyXS>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('BodyXXS', () => {
        mount(
            <CypressTestDecorator>
                <BodyXXS>BodyXXS</BodyXXS>
                <BodyXXS bold>BodyXXS Semibold</BodyXXS>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('TextL', () => {
        mount(
            <CypressTestDecorator>
                <TextL>TextL</TextL>
                <TextL bold>TextL Semibold</TextL>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('TextM', () => {
        mount(
            <CypressTestDecorator>
                <TextM>TextM</TextM>
                <TextM bold>TextM Semibold</TextM>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('TextS', () => {
        mount(
            <CypressTestDecorator>
                <TextS>TextS</TextS>
                <TextS bold>TextS Semibold</TextS>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('TextXS', () => {
        mount(
            <CypressTestDecorator>
                <TextXS>TextXS</TextXS>
                <TextXS bold>TextXS Semibold</TextXS>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
