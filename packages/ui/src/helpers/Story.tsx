import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { getTheme } from './theme';

const StoriesRoot = styled.div`
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    padding: 32px;
`;

const Story: React.FC = ({ children }) => {
    return (
        <ThemeProvider theme={getTheme()}>
            <StoriesRoot>{children}</StoriesRoot>
        </ThemeProvider>
    );
};

export default Story;
