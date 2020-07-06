import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import UIContext, { useUIContext } from '../contexts/UIContext';

import { getTheme } from './theme';

const StoriesRoot = styled.div`
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    padding: 32px;
`;

const Story: React.FC = ({ children }) => {
    const uiContext = useUIContext();
    const theme = getTheme();

    return (
        <ThemeProvider theme={theme}>
            <UIContext.Provider value={uiContext}>
                <StoriesRoot>{children}</StoriesRoot>
            </UIContext.Provider>
        </ThemeProvider>
    );
};

export default Story;
