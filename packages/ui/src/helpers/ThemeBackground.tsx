import React from 'react';
import styled, { css } from 'styled-components';
import { text, background, gradient } from '@sberdevices/plasma-tokens';

interface Props {
    spaced?: boolean;
}

const StyledRoot = styled.div<Props>`
    display: flex;
    box-sizing: border-box;

    margin: -20px;
    padding: 20px;

    color: ${text};
    background-color: ${background};
    background-image: ${gradient};

    ${({ spaced }) =>
        spaced &&
        css`
            & > * {
                margin-right: 0.5rem;
            }
        `}
`;

export const ThemeBackground: React.FC<Props> = ({ spaced, children }) => {
    return <StyledRoot spaced={spaced}>{children}</StyledRoot>;
};
