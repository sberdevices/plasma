import React from 'react';
import ReactDom from 'react-dom';
import { mount } from '@cypress/react';
import { CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-core: TextArea', () => {
    const TextArea = getComponent('TextArea');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <TextArea value="Welcome" />
            </CypressTestDecorator>,
            { ReactDom },
        );

        cy.matchImageSnapshot();
    });
});
