import React from 'react';
import styled from 'styled-components';
import {
    colorTextPrimary,
    colorBackgroundColor,
    colorBackgroundDefault,
} from 'plasma-styles/components/Color/tokens';

const StyledRoot = styled.div`
    display: flex;
    box-sizing: border-box;

    margin: -20px;
    padding: 20px;

    color: ${colorTextPrimary};
    background: ${colorBackgroundDefault};
    background-color: ${colorBackgroundColor};

    & * {
        box-sizing: border-box;
    }
`;

export const ThemeBackground: React.FC = ({ children }) => {
    return <StyledRoot>{children}</StyledRoot>;
};
