import React from 'react';
import styled from 'styled-components';
import { text, background, gradient } from '@sberdevices/plasma-tokens';

const StyledRoot = styled.div`
    display: flex;
    box-sizing: border-box;

    margin: -20px;
    padding: 20px;

    color: ${text};
    background-color: ${background};
    background-image: ${gradient};
`;

export const ThemeBackground: React.FC = ({ children }) => {
    return <StyledRoot>{children}</StyledRoot>;
};
