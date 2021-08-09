import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IconSettings } from '@sberdevices/plasma-icons';

import { disableProps } from '../../helpers';

import { Badge, BadgeProps, badgeSizes, badgeViews } from '.';

const propsToDisable = ['contentLeft', 'theme', 'as', 'forwardedAs'];

export default {
    title: 'Content/Badge',
    component: Badge,
    argTypes: {
        size: {
            control: {
                type: 'inline-radio',
                options: Object.keys(badgeSizes),
            },
        },
        view: {
            control: {
                type: 'inline-radio',
                options: Object.keys(badgeViews),
            },
        },
        ...disableProps(propsToDisable),
    },
} as Meta;

export const Default: Story<BadgeProps & { enableIcon: boolean }> = ({ enableIcon, ...rest }) => (
    <Badge contentLeft={enableIcon && <IconSettings color="inherit" size="xs" />} {...rest} />
);

Default.args = {
    text: 'Badge',
    size: 'l',
    view: 'primary',
    enableIcon: false,
};

Default.argTypes = {
    circled: { table: { disable: true } },
};

export const Quantity: Story<BadgeProps> = (args) => <Badge {...args} />;

Quantity.args = {
    text: '11',
    size: 's',
    view: 'secondary',
    circled: true,
};
