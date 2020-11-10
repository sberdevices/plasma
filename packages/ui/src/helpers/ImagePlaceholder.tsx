import styled, { css } from 'styled-components';

interface IconPlaceholderProps {
    width: string;
    height: string;
    color?: 'black' | 'white';
    rotation?: number;
}

export const ImagePlaceholder = styled.div<IconPlaceholderProps>`
    position: relative;
    overflow: hidden;

    ${({ width, height }) => css`
        width: ${width};
        height: ${height};
    `}

    ${({ color = 'black' }) => css`
        background-color: ${color === 'black' ? 'rgba(0, 0, 0, 0.32)' : 'rgba(255, 255, 255, 0.32)'};
    `}

    &::before, &::after {
        position: absolute;
        top: 50%;

        width: 100%;
        height: 1px;

        content: '';

        ${({ color = 'black' }) => css`
            background-color: ${color === 'white' ? 'rgba(0, 0, 0, 0.16)' : 'rgba(255, 255, 255, 0.16)'};
        `}
    }

    ${({ rotation = 45 }) => css`
        &::before {
            left: 0;
            transform: rotate(${rotation}deg);
        }

        &::after {
            right: 0;
            transform: rotate(-${rotation}deg);
        }
    `}
`;
