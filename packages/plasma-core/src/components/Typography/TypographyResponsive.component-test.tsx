import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-core: ResponsiveTypography', () => {
    const BodyL = getComponent('BodyL');
    const BodyM = getComponent('BodyM');
    const BodyS = getComponent('BodyS');
    const BodyXS = getComponent('BodyXS');
    const BodyXXS = getComponent('BodyXXS');
    const DsplL = getComponent('DsplL');
    const DsplM = getComponent('DsplM');
    const DsplS = getComponent('DsplS');
    const H1 = getComponent('H1');
    const H2 = getComponent('H2');
    const H3 = getComponent('H3');
    const H4 = getComponent('H4');
    const H5 = getComponent('H5');
    const TextL = getComponent('TextL');
    const TextM = getComponent('TextM');
    const TextS = getComponent('TextS');
    const TextXS = getComponent('TextXS');

    const body = (
        <CypressTestDecorator>
            <BodyL>BodyL</BodyL>
            <BodyL bold>BodyL Semibold</BodyL>
            <BodyM>BodyM</BodyM>
            <BodyM bold>BodyM Semibold</BodyM>
            <BodyS>BodyS</BodyS>
            <BodyS bold>BodyS Semibold</BodyS>
            <BodyXS>BodyXS</BodyXS>
            <BodyXS bold>BodyXS Semibold</BodyXS>
            <BodyXXS>BodyXXS</BodyXXS>
            <BodyXXS bold>BodyXXS Semibold</BodyXXS>
        </CypressTestDecorator>
    );
    const dspl = (
        <CypressTestDecorator>
            <DsplL>DsplL</DsplL>
            <DsplM>DsplL</DsplM>
            <DsplS>DsplS</DsplS>
        </CypressTestDecorator>
    );
    const headings = (
        <CypressTestDecorator>
            <H1>H1</H1>
            <H2>H2</H2>
            <H3>H3</H3>
            <H4>H4</H4>
            <H5>H5</H5>
        </CypressTestDecorator>
    );
    const text = (
        <CypressTestDecorator>
            <TextL>TextL</TextL>
            <TextL bold>TextL Semibold</TextL>
            <TextM>TextM</TextM>
            <TextM bold>TextM Semibold</TextM>
            <TextS>TextS</TextS>
            <TextS bold>TextS Semibold</TextS>
            <TextXS>TextXS</TextXS>
            <TextXS bold>TextXS Semibold</TextXS>
        </CypressTestDecorator>
    );

    it('Body @375px', () => {
        mount(body);

        cy.viewport(375, 667);
        cy.matchImageSnapshot();
    });

    it('Body @758px', () => {
        mount(body);

        cy.viewport(768, 1024);
        cy.matchImageSnapshot();
    });

    it('Body @1366px', () => {
        mount(body);

        cy.viewport(1366, 768);
        cy.matchImageSnapshot();
    });

    it('Dspl @375px', () => {
        mount(dspl);

        cy.viewport(375, 667);
        cy.matchImageSnapshot();
    });

    it('Dspl @768px', () => {
        mount(dspl);

        cy.viewport(768, 1024);
        cy.matchImageSnapshot();
    });

    it('Dspl @1366px', () => {
        mount(dspl);

        cy.viewport(1366, 768);
        cy.matchImageSnapshot();
    });

    it('H @375px', () => {
        mount(headings);

        cy.viewport(375, 667);
        cy.matchImageSnapshot();
    });

    it('H @768px', () => {
        mount(headings);

        cy.viewport(768, 1024);
        cy.matchImageSnapshot();
    });

    it('H @1366px', () => {
        mount(headings);

        cy.viewport(1366, 768);
        cy.matchImageSnapshot();
    });

    it('Text @375px', () => {
        mount(text);

        cy.viewport(375, 667);
        cy.matchImageSnapshot();
    });

    it('Text @768px', () => {
        mount(text);

        cy.viewport(768, 1024);
        cy.matchImageSnapshot();
    });

    it('Text @1366px', () => {
        mount(text);

        cy.viewport(1366, 768);
        cy.matchImageSnapshot();
    });
});
