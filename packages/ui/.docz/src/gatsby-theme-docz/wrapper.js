import React from 'react';
import { ThemeProvider } from 'styled-components';

import { defaultTheme } from '../../../src/theme';

export default ({ children }) => {
    return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};
