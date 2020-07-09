import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { getTheme } from './theme';

const StoriesRoot = styled.div`
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    padding: 32px;
    background: linear-gradient(180deg, #00132b 0%, #002e2f 100%);
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
