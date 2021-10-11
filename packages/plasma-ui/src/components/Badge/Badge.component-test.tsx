import React from 'react';
import { IconEye } from '@sberdevices/plasma-icons';
import { mount, CypressTestDecorator, PadMe, SpaceMe } from '@sberdevices/plasma-cy-utils';

import { Badge } from '.';

const Icon = () => <IconEye color="inherit" size="xs" />;

describe('Badge', () => {
    it('_view', () => {
        mount(
            <CypressTestDecorator>
                <Badge view="primary" text="Badge_view_primary" contentLeft={<Icon />} />
                <SpaceMe />
                <Badge view="primary" contentLeft={<Icon />} />
                <PadMe />
                <div style={{ background: 'white' }}>
                    <Badge view="secondary" text="Badge_view_secondary" contentLeft={<Icon />} />
                    <SpaceMe />
                    <Badge view="secondary" contentLeft={<Icon />} />
                </div>
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });
});
