import styled, { css } from 'styled-components';

interface IconPlaceholderProps {
    size?: number;
    color?: 'black' | 'white';
}

export const IconPlaceholder = styled.div<IconPlaceholderProps>`
    border-radius: 50%;

    ${({ size = 1 }) => css`
        width: ${size}rem;
        height: ${size}rem;
    `}

    ${({ color = 'black' }) => css`
        background-color: ${color === 'black' ? 'rgba(0, 0, 0, 0.32)' : 'rgba(255, 255, 255, 0.32)'};
    `}
`;
