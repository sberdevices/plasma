import React from 'react';
import ReactDom from 'react-dom';
import { mount } from '@cypress/react';
import { CypressTestDecorator, getComponent, PadMe } from '@sberdevices/plasma-cy-utils';

describe('plasma-core: Price', () => {
    const Price = getComponent('Price');

    // TODO: why we need global styles on body ?

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <style>{`
                    body {
                        font-family: "SB Sans Text", sans-serif;
                    }
                `}</style>
                <Price>12345.67</Price>
            </CypressTestDecorator>,
            { ReactDom },
        );

        cy.matchImageSnapshot();
    });

    it('_currency', () => {
        mount(
            <CypressTestDecorator>
                <style>{`
                    body {
                        font-family: "SB Sans Text", sans-serif;
                    }
                `}</style>
                <Price currency="rub">12345.67</Price>
                <PadMe />
                <Price currency="usd">12345.67</Price>
                <PadMe />
                <Price currency="eur">12345.67</Price>
            </CypressTestDecorator>,
            { ReactDom },
        );

        cy.matchImageSnapshot();
    });

    it('_stroke', () => {
        mount(
            <CypressTestDecorator>
                <style>{`
                    body {
                        font-family: "SB Sans Text", sans-serif;
                    }
                `}</style>
                <Price stroke>12345.67</Price>
            </CypressTestDecorator>,
            { ReactDom },
        );

        cy.matchImageSnapshot();
    });

    it('_minFraction', () => {
        mount(
            <CypressTestDecorator>
                <style>{`
                    body {
                        font-family: "SB Sans Text", sans-serif;
                    }
                `}</style>
                <Price minimumFractionDigits={4}>12345.6789</Price>
            </CypressTestDecorator>,
            { ReactDom },
        );

        cy.matchImageSnapshot();
    });
});
