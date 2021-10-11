import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-ui: Typography', () => {
    const Body1 = getComponent('Body1');
    const Body2 = getComponent('Body2');
    const Body3 = getComponent('Body3');
    const Display1 = getComponent('Display1');
    const Display2 = getComponent('Display2');
    const Display3 = getComponent('Display3');

    it('Body3', () => {
        mount(
            <CypressTestDecorator>
                <style>{`
                    body {
                        font-family: "SB Sans Text", sans-serif;
                    }
                `}</style>
                <Body1>Hello Body 1</Body1>
                <Body2>Hello Body 2</Body2>
                <Body3>Hello Body 3</Body3>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('Display', () => {
        mount(
            <CypressTestDecorator>
                <style>{`
                    body {
                        font-family: "SB Sans Text", sans-serif;
                    }
                `}</style>
                <Display1>Hello Display 1</Display1>
                <Display2>Hello Display 2</Display2>
                <Display3>Hello Display 3</Display3>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
