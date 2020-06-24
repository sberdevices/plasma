import React from 'react';
import { ThemeProvider } from 'styled-components';

import { getTheme } from '../../theme/storiesTheme';

import ActionButton from './ActionButton';

export default {
    title: 'ActionButton',
};

export const Default = () => (
    <ThemeProvider theme={getTheme()}>
        <ActionButton />
    </ThemeProvider>
);

export const SizeSmall = () => (
    <ThemeProvider theme={getTheme()}>
        <ActionButton size="s" />
    </ThemeProvider>
);

export const SizeLarge = () => (
    <ThemeProvider theme={getTheme()}>
        <ActionButton size="l" />
    </ThemeProvider>
);
