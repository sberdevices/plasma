import React from 'react';
import ReactDom from 'react-dom';
import { mount } from '@cypress/react';
import { CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-core: TextField', () => {
    const TextField = getComponent('TextField');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <TextField value="Welcome" />
            </CypressTestDecorator>,
            { ReactDom },
        );

        cy.matchImageSnapshot();
    });
});
