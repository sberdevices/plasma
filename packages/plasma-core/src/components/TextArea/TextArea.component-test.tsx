import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-core: TextArea', () => {
    const TextArea = getComponent('TextArea');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <TextArea value="Welcome" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
