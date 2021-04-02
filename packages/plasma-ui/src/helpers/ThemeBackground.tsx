import React from 'react';
import styled, { css } from 'styled-components';
import { text, background, gradient } from '@sberdevices/plasma-tokens';

interface Props {
    showcase?: boolean;
    spaced?: boolean;
    vertical?: boolean;
}

const StyledRoot = styled.div<Props>`
    display: flex;
    box-sizing: border-box;
    overflow-x: auto;

    margin: -20px;
    padding: 20px;

    color: ${text};
    background-color: ${background};
    background-image: ${gradient};

    ${({ showcase }) =>
        showcase &&
        css`
            margin: 0;
        `}

    ${({ spaced }) =>
        spaced &&
        css`
            & > * {
                margin-right: 0.5rem;
            }
        `}

    ${({ vertical }) =>
        vertical &&
        css`
            align-items: flex-start;
            flex-direction: column;
        `}

    ${({ spaced, vertical }) =>
        spaced &&
        vertical &&
        css`
            & > * {
                margin-bottom: 0.5rem !important;
            }
        `}
`;

export const ThemeBackground: React.FC<Props> = ({ children, ...rest }) => {
    return <StyledRoot {...rest}>{children}</StyledRoot>;
};
