/* eslint-disable */
import React from 'react';
import { IconEye } from '@sberdevices/plasma-icons';

import { mount, CypressTestDecorator, getComponent, PadMe, SpaceMe } from '@sberdevices/plasma-cy-utils';

const Icon = () => <IconEye color="inherit" size="xs" />;

describe('plasma-web: Badge', () => {
    const Badge = getComponent('Badge');

    it('_view', () => {
        mount(
            <CypressTestDecorator>
                <Badge view="primary" text="Badge_view_primary" contentLeft={<Icon />} />
                <SpaceMe />
                <Badge view="primary" contentLeft={<Icon />} />
                <PadMe />
                <Badge view="secondary" text="Badge_view_secondary" contentLeft={<Icon />} />
                <SpaceMe />
                <Badge view="secondary" contentLeft={<Icon />} />
                <PadMe />
                <Badge view="success" text="Badge_view_success" contentLeft={<Icon />} />
                <SpaceMe />
                <Badge view="success" contentLeft={<Icon />} />
                <PadMe />
                <Badge view="warning" text="Badge_view_warning" contentLeft={<Icon />} />
                <SpaceMe />
                <Badge view="warning" contentLeft={<Icon />} />
                <PadMe />
                <Badge view="critical" text="Badge_view_critical" contentLeft={<Icon />} />
                <SpaceMe />
                <Badge view="critical" contentLeft={<Icon />} />
                <PadMe />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });
});
