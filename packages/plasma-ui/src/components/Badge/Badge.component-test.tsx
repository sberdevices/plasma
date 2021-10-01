import React from 'react';
import ReactDom from 'react-dom';
import { mount } from '@cypress/react';
import { IconEye } from '@sberdevices/plasma-icons';

import { CypressTestDecorator, Padme, SpaceMe } from '../../helpers/CypressHelpers';

import { Badge } from '.';

const Icon = () => <IconEye color="inherit" size="xs" />;

describe('Badge', () => {
    it('_view', () => {
        mount(
            <CypressTestDecorator>
                <Badge view="primary" text="Badge_view_primary" contentLeft={<Icon />} />
                <SpaceMe />
                <Badge view="primary" contentLeft={<Icon />} />
                <Padme />
                <div style={{ background: 'white' }}>
                    <Badge view="secondary" text="Badge_view_secondary" contentLeft={<Icon />} />
                    <SpaceMe />
                    <Badge view="secondary" contentLeft={<Icon />} />
                </div>
            </CypressTestDecorator>,
            { ReactDom },
        );
        cy.matchImageSnapshot();
    });
});
