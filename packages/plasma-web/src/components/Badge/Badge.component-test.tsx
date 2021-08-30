/* eslint-disable */
import React from 'react';
import ReactDom from 'react-dom';
import { mount } from '@cypress/react';
import { Badge } from './Badge';

import { CypressTestDecorator } from '../../helpers/CypressHelpers';

describe('Badge', () => {
    it('renders Badge', () => {
        mount(
            <CypressTestDecorator>
                <Badge text={'Badge-web'} size={'l'} view={'primary'} />
            </CypressTestDecorator>,
            { ReactDom },
        );
        cy.matchImageSnapshot();
    });
});
