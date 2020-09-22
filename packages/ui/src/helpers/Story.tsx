import React from 'react';
import styled from 'styled-components';

import { background } from 'plasma-tokens';
import ThemeSber from 'plasma-styles/components/Theme/_dark/Theme_dark_sber';

const StoriesRoot = styled.div`
    overflow: scroll;

    box-sizing: border-box;
    padding: 40px;
    background-color: ${background};
`;

const Story: React.FC = ({ children }) => {
    return (
        <>
            <ThemeSber />
            <StoriesRoot>{children}</StoriesRoot>
        </>
    );
};

export default Story;
