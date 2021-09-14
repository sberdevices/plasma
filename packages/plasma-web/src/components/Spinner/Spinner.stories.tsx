import React from 'react';
import { Story, Meta } from '@storybook/react';

import { InSpacingDecorator, disableProps } from '../../helpers';

import { Spinner, SpinnerProps } from './Spinner';

const propsToDisable = ['color', 'theme', 'as', 'forwardedAs'];

const sizes = [8, 16, 32, 64, 96, 128];

export default {
    title: 'Content/Spinner',
    decorators: [InSpacingDecorator],
    argTypes: {
        size: {
            control: {
                type: 'select',
                options: sizes,
            },
        },
        ...disableProps(propsToDisable),
    },
} as Meta;

export const Default: Story<SpinnerProps> = (args) => <Spinner {...args} />;

Default.args = {
    size: 32,
};
