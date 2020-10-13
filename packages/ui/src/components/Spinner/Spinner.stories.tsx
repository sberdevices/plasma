import React from 'react';
import { number } from '@storybook/addon-knobs';

import { Spinner } from './Spinner';

export default {
    title: 'Spinner',
};

export const Default = () => <Spinner />;

export const CustomSize = () => {
    const size = number('size', 32);
    return <Spinner size={size || undefined} />;
};
