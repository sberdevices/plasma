import React from 'react';
import { number, select, boolean } from '@storybook/addon-knobs';

import { InSpacingDecorator } from '../../helpers';

import { Progress } from './Progress';

export default {
    title: 'Controls/Progress',
    component: Progress,
    decorators: [InSpacingDecorator],
};

export const Default = () => (
    <Progress
        value={number('value', 25)}
        status={select('status', ['success', 'warning', 'error'], 'error')}
        displayValue={boolean('displayValue', true)}
    />
);
