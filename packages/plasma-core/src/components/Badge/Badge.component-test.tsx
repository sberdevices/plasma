/* eslint-disable */
import React from 'react';
import ReactDom from 'react-dom';
import { mount } from '@cypress/react';
import { IconEye } from '@sberdevices/plasma-icons';

import { CypressTestDecorator, getComponent, Padme, SpaceMe } from '../../__helpers/CypressHelpers';

const Icon = () => <IconEye color="inherit" size="xs" />;

describe('plasma-core: Badge', () => {
    const Badge = getComponent('Badge');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Badge text="Badge" />
            </CypressTestDecorator>,
            { ReactDom },
        );
        cy.matchImageSnapshot();
    });

    it('with Icon', () => {
        mount(
            <CypressTestDecorator>
                <Badge text="Badge" contentLeft={<Icon />} />
                <Padme />
                <Badge contentLeft={<Icon />} />
            </CypressTestDecorator>,
            { ReactDom },
        );
        cy.matchImageSnapshot();
    });

    it('_sizes', () => {
        mount(
            <CypressTestDecorator>
                <Badge text="Badge_size_l" size="l" contentLeft={<Icon />} />
                <Padme />
                <Badge text="Badge_size_s" size="s" contentLeft={<Icon />} />
                <Padme />
            </CypressTestDecorator>,
            { ReactDom },
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
                <Padme />
                simple :
                <SpaceMe />
                <Badge size="l" text="18" />
                <SpaceMe />
                <Badge size="s" text="18" />
                <Padme />
            </CypressTestDecorator>,
            { ReactDom },
        );
        cy.matchImageSnapshot();
    });
});
