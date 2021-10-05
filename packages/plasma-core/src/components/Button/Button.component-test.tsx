import React from 'react';
import ReactDom from 'react-dom';
import { mount } from '@cypress/react';
import { IconDownload } from '@sberdevices/plasma-icons';
import { CypressTestDecorator, getComponent, PadMe, SpaceMe } from '@sberdevices/plasma-cy-utils';

const Icon = () => <IconDownload />;

describe('plasma-core: Button', () => {
    const Button = getComponent('Button');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Button>Hello Plasma</Button>
            </CypressTestDecorator>,
            { ReactDom },
        );
        cy.matchImageSnapshot();
    });

    it('with Icon', () => {
        mount(
            <CypressTestDecorator>
                <Button text="with Icon" contentLeft={<Icon />} />
                <PadMe />
                <Button text="with Icon" contentRight={<Icon />} />
                <PadMe />
                <Button text="with Icon" contentLeft={<Icon />} contentRight={<Icon />} />
                <PadMe />
                <Button contentLeft={<Icon />} contentRight={<Icon />}>
                    text as children
                </Button>
                <PadMe />
                <Button contentLeft={<Icon />} contentRight={<Icon />}>
                    <Icon />
                </Button>
                <SpaceMe />
                <Button>
                    <Icon />
                </Button>
                <SpaceMe />
                <Button contentLeft={<Icon />} />
                <SpaceMe />
                <Button contentRight={<Icon />} />
            </CypressTestDecorator>,
            { ReactDom },
        );
        cy.matchImageSnapshot();
    });

    it('_view', () => {
        mount(
            <CypressTestDecorator>
                <Button view="secondary" text="Button_view_secondary" contentLeft={<Icon />} />
                <SpaceMe />
                <Button view="secondary" text="_disabled" disabled contentLeft={<Icon />} />
                <PadMe />
                <Button view="primary" text="Button_view_primary" contentLeft={<Icon />} />
                <SpaceMe />
                <Button view="primary" text="_disabled" disabled contentLeft={<Icon />} />
                <PadMe />
                <Button view="success" text="Button_view_success" contentLeft={<Icon />} />
                <SpaceMe />
                <Button view="success" text="_disabled" disabled contentLeft={<Icon />} />
                <PadMe />
                <Button view="warning" text="Button_view_warning" contentLeft={<Icon />} />
                <SpaceMe />
                <Button view="warning" text="_disabled" disabled contentLeft={<Icon />} />
                <PadMe />
                <Button view="critical" text="Button_view_critical" contentLeft={<Icon />} />
                <SpaceMe />
                <Button view="critical" text="_disabled" disabled contentLeft={<Icon />} />
                <PadMe />
                <Button view="checked" text="Button_view_checked" contentLeft={<Icon />} />
                <SpaceMe />
                <Button view="checked" text="_disabled" disabled contentLeft={<Icon />} />
                <PadMe />
                <Button view="overlay" text="Button_view_overlay" contentLeft={<Icon />} />
                <SpaceMe />
                <Button view="overlay" text="_disabled" disabled contentLeft={<Icon />} />
                <PadMe />
                <Button view="clear" text="Button_view_clear" contentLeft={<Icon />} />
                <SpaceMe />
                <Button view="clear" text="_disabled" disabled contentLeft={<Icon />} />
                <PadMe />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('_size', () => {
        mount(
            <CypressTestDecorator>
                <Button text="Button_size_l" size="l" contentLeft={<Icon />} />
                <PadMe />
                <Button text="Button_size_m" size="m" contentLeft={<Icon />} />
                <PadMe />
                <Button text="Button_size_s" size="s" contentLeft={<Icon />} />
                <PadMe />
                <Button text="Button_size_xs" size="xs" contentLeft={<Icon />} />
                <PadMe />
                <Button text="Button_size_xxs" size="xxs" contentLeft={<Icon />} />
                <PadMe />
                <Button text="Button_size_xxxs" size="xxxs" contentLeft={<Icon />} />
                <PadMe />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });
});
