import React from 'react';
import { Story, Meta } from '@storybook/react';
import { InSpacingDecorator } from '@sberdevices/plasma-sb-utils';

import { Progress, ProgressProps } from '.';

export default {
    title: 'Controls/Progress',
    component: Progress,
    decorators: [InSpacingDecorator],
} as Meta;

export const Default: Story<ProgressProps> = (args) => <Progress {...args} />;

Default.args = {
    value: 25,
    status: 'error',
    displayValue: true,
};
