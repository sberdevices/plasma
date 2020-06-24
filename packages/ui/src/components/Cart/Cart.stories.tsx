import React from 'react';
import { ThemeProvider } from 'styled-components';
import { number } from '@storybook/addon-knobs';

import { getTheme } from '../../theme/storiesTheme';

import Cart from './Cart';

export default {
    title: 'Cart',
};

export const Default = () => (
    <ThemeProvider theme={getTheme()}>
        <Cart amount={number('Amount', 5)} total={number('Total', 2350)} />
    </ThemeProvider>
);
