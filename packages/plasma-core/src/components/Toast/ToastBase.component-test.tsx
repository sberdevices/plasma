import React from 'react';
import ReactDom from 'react-dom';
import { mount } from '@cypress/react';
import { CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';
import { IconClose } from '@sberdevices/plasma-icons';
import { critical } from '@sberdevices/plasma-tokens-b2c';

describe('plasma-core: Toast', () => {
    const Toast = getComponent('Toast');

    it('default', () => {
        mount(
            <CypressTestDecorator>
                <Toast text="Short Text Message Without Action" />
            </CypressTestDecorator>,
            { ReactDom },
        );

        cy.matchImageSnapshot();
    });

    it('with icon', () => {
        mount(
            <CypressTestDecorator>
                <Toast
                    text="Short Text Message Without Action"
                    contentLeft={<IconClose size="xs" color={critical} />}
                />
            </CypressTestDecorator>,
            { ReactDom },
        );

        cy.matchImageSnapshot();
    });
});
