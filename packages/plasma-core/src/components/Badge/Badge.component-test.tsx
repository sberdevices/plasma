/* eslint-disable */
import React from 'react';
import { IconEye } from '@sberdevices/plasma-icons';

import { mount, CypressTestDecorator, getComponent, PadMe, SpaceMe } from '@sberdevices/plasma-cy-utils';

const Icon = () => <IconEye color="inherit" size="xs" />;

describe('plasma-core: Badge', () => {
    const Badge = getComponent('Badge');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Badge text="Badge" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('with Icon', () => {
        mount(
            <CypressTestDecorator>
                <Badge text="Badge" contentLeft={<Icon />} />
                <PadMe />
                <Badge contentLeft={<Icon />} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_sizes', () => {
        mount(
            <CypressTestDecorator>
                <Badge text="Badge_size_l" size="l" contentLeft={<Icon />} />
                <PadMe />
                <Badge text="Badge_size_s" size="s" contentLeft={<Icon />} />
                <PadMe />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_circled', () => {
        mount(
            <CypressTestDecorator>
                circled :
                <SpaceMe />
                <Badge circled size="l" text="18" />
                <SpaceMe />
                <Badge circled size="s" text="18" />
                <PadMe />
                simple :
                <SpaceMe />
                <Badge size="l" text="18" />
                <SpaceMe />
                <Badge size="s" text="18" />
                <PadMe />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
