import React from 'react';
import ReactDom from 'react-dom';
import { mount } from '@cypress/react';

import { CypressTestDecorator } from '../../helpers/CypressHelpers';

import { Badge } from './Badge';

describe('Badge', () => {
    it('renders Badge', () => {
        mount(
            <CypressTestDecorator>
                <Badge text="11" size="l" view="primary" circled />
            </CypressTestDecorator>,
            { ReactDom },
        );
        cy.matchImageSnapshot();
    });
});
