import React from 'react';
import { number } from '@storybook/addon-knobs';

import { InSpacing } from '../../helpers/StoryDecorators';

import { Spinner } from './Spinner';

export default {
    title: 'Content/Spinner',
    component: Spinner,
    decorators: [InSpacing],
};

export const Default = () => <Spinner />;

export const CustomSize = () => {
    const size = number('size', 32);
    return <Spinner size={size || undefined} />;
};
