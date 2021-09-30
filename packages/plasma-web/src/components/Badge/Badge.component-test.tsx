/* eslint-disable */
import React from 'react';
import ReactDom from 'react-dom';
import { mount } from '@cypress/react';
import { Badge } from '.';

import { CypressTestDecorator } from '../../helpers/CypressHelpers';

describe('Badge', () => {
    it('renders Badge', () => {
        mount(
            <CypressTestDecorator>
                <Badge text="Badge-web" />
            </CypressTestDecorator>,
            { ReactDom },
        );
        cy.matchImageSnapshot();
    });
});
