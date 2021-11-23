import React from 'react';
import { IconDownload } from '@sberdevices/plasma-icons';
import { mount, CypressTestDecorator, getComponent, PadMe, SpaceMe } from '@sberdevices/plasma-cy-utils';

const Icon = () => <IconDownload color="inherit" />;

describe('plasma-ui: ActionButton', () => {
    const ActionButton = getComponent('ActionButton');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <ActionButton>
                    <Icon />
                </ActionButton>
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('_view', () => {
        mount(
            <CypressTestDecorator>
                <ActionButton view="secondary">
                    <Icon />
                </ActionButton>
                <SpaceMe />
                <ActionButton view="secondary" disabled>
                    <Icon />
                </ActionButton>
                <PadMe />
                <ActionButton view="primary">
                    <Icon />
                </ActionButton>
                <SpaceMe />
                <ActionButton view="primary" disabled>
                    <Icon />
                </ActionButton>
                <PadMe />
                <ActionButton view="success">
                    <Icon />
                </ActionButton>
                <SpaceMe />
                <ActionButton view="success" disabled>
                    <Icon />
                </ActionButton>
                <PadMe />
                <ActionButton view="warning">
                    <Icon />
                </ActionButton>
                <SpaceMe />
                <ActionButton view="warning" disabled>
                    <Icon />
                </ActionButton>
                <PadMe />
                <ActionButton view="critical">
                    <Icon />
                </ActionButton>
                <SpaceMe />
                <ActionButton view="critical" disabled>
                    <Icon />
                </ActionButton>
                <PadMe />
                <ActionButton view="checked">
                    <Icon />
                </ActionButton>
                <SpaceMe />
                <ActionButton view="checked" disabled>
                    <Icon />
                </ActionButton>
                <PadMe />
                <ActionButton view="overlay">
                    <Icon />
                </ActionButton>
                <SpaceMe />
                <ActionButton view="overlay" disabled>
                    <Icon />
                </ActionButton>
                <PadMe />
                <ActionButton view="clear">
                    <Icon />
                </ActionButton>
                <SpaceMe />
                <ActionButton view="clear" disabled>
                    <Icon />
                </ActionButton>
                <PadMe />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('_size', () => {
        mount(
            <CypressTestDecorator>
                <ActionButton size="l">
                    <Icon />
                </ActionButton>
                <PadMe />
                <ActionButton size="m">
                    <Icon />
                </ActionButton>
                <PadMe />
                <ActionButton size="s">
                    <Icon />
                </ActionButton>
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });
});
