import React from 'react';
import { Story, Meta } from '@storybook/react';

import { disableProps } from '../../helpers';
import { InSpacing } from '../../helpers/StoryDecorators';

import { Spinner, SpinnerProps } from './Spinner';

const propsToDisable = ['color', 'theme', 'as', 'forwardedAs'];

const sizes = [8, 16, 32, 64, 96, 128];

export default {
    title: 'Content/Spinner',
    decorators: [InSpacing],
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
