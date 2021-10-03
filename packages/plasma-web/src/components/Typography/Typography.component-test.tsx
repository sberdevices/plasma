import React from 'react';
import ReactDom from 'react-dom';
import { mount } from '@cypress/react';
import { CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-web: Typography', () => {
    const Headline5 = getComponent('Headline5');
    const Subtitle = getComponent('Subtitle');

    it('Headline5', () => {
        mount(
            <CypressTestDecorator>
                <style>{`
                    body {
                        font-family: "SB Sans Text", sans-serif;
                    }
                `}</style>
                <Headline5>Hello Headline5</Headline5>
            </CypressTestDecorator>,
            { ReactDom },
        );

        cy.matchImageSnapshot();
    });

    it('Subtitle', () => {
        mount(
            <CypressTestDecorator>
                <style>{`
                    body {
                        font-family: "SB Sans Text", sans-serif;
                    }
                `}</style>
                <Subtitle>Hello Subtitle</Subtitle>
            </CypressTestDecorator>,
            { ReactDom },
        );

        cy.matchImageSnapshot();
    });
});
