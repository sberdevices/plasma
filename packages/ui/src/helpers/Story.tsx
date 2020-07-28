import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { getTheme } from './theme';

const StoriesRoot = styled.div`
    box-sizing: border-box;
    overflow: scroll;
    padding: 40px;
`;

const Story: React.FC = ({ children }) => {
    const theme = getTheme();

    return (
        <ThemeProvider theme={theme}>
            <StoriesRoot>{children}</StoriesRoot>
        </ThemeProvider>
    );
};

export default Story;
