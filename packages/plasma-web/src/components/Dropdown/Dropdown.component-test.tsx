/* eslint-disable */
import React from 'react';
import ReactDom from 'react-dom';
import { mount } from '@cypress/react';

import { CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-web: Dropdown', () => {
    const Dropdown = getComponent('Dropdown');
    const Button = getComponent('Button');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Dropdown
                    opened
                    items={[
                        { value: 'one', label: 'first' },
                        { value: 'two', label: 'second' },
                    ]}
                >
                    <Button text="open" />
                </Dropdown>
            </CypressTestDecorator>,
            { ReactDom },
        );

        cy.get('button').click();

        cy.matchImageSnapshot();
    });
});
