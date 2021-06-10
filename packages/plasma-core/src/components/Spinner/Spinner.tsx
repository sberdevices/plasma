import React from 'react';
import styled, { keyframes, css } from 'styled-components';

import { accent } from '../../tokens';

import { SpinnerSvg } from './SpinnerSvg';

const rotateAnimation = keyframes`
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
`;

const StyledRoot = styled.div<{ $size: string }>`
    display: flex;
    box-sizing: border-box;

    ${({ $size }) => css`
        width: ${$size};
        height: ${$size};
    `}

    animation: ${rotateAnimation} 1s linear infinite;
`;

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number | string;
    color?: string;
}

/**
 * Компонент для отображения индикатора загрузки.
 */
export const Spinner: React.FC<SpinnerProps> = ({ id, size = 56, color = accent, ...rest }) => {
    return (
        <StyledRoot id={id} $size={typeof size === 'number' ? `${size}px` : size} {...rest}>
            <SpinnerSvg id={id} width={size} height={size} color={color} />
        </StyledRoot>
    );
};
