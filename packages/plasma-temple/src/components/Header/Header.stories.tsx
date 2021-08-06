import React from 'react';
import { action } from '@storybook/addon-actions';

import { withAppState, defaultValue } from '../../../.storybook/decorators/withAppState';

import { Header } from './Header';

export default {
    title: 'Header',
};

export const Default = () => {
    return <Header logo="./images/320_320_2.jpg" title="Hello" subtitle="plasma-temple" />;
};

Default.decorators = [withAppState({ ...defaultValue, popScreen: action('popScreen click') })];

export const WithOneScreenInHistory = () => {
    return <Header logo="./images/320_320_2.jpg" title="Hello" subtitle="plasma-temple" />;
};

WithOneScreenInHistory.decorators = [
    withAppState({
        ...defaultValue,
        state: { ...defaultValue.state, history: [{ name: 'name', data: null }] },
        popScreen: action('popScreen click'),
    }),
];
