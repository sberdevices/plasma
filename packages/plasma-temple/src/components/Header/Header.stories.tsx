import React from 'react';
import { boolean, text, array, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Header } from './Header';

export default {
    title: 'Header',
};

export const Default = () => {
    return <Header logo="./images/320_320_2.jpg" title="Hello" subtitle="plasma-temple" />;
};
