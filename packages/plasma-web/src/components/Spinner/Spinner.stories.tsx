import React from 'react';
import { text } from '@storybook/addon-knobs';

import { InSpacing } from '../../helpers/StoryDecorators';

import { Spinner } from './Spinner';

export default {
    title: 'Content/Spinner',
    component: Spinner,
    decorators: [InSpacing],
};

export const Default = () => <Spinner />;

export const CustomSize = () => {
    return <Spinner size={text('size', '32px') || undefined} />;
};
