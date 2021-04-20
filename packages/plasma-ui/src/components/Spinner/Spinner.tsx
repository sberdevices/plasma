import React from 'react';
import styled, { keyframes, css } from 'styled-components';

import { SpinnerSvg } from './SpinnerSvg';
import { WhiteSpinnerSvg } from './WhiteSpinnerSvg';

const rotateAnimation = keyframes`
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
`;

const StyledRoot = styled.div<{ $size: number }>`
    display: flex;
    box-sizing: border-box;

    ${({ $size }) => css`
        width: ${$size}px;
        height: ${$size}px;
    `}

    animation: ${rotateAnimation} 1s linear infinite;
`;

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number;
    color?: 'white';
}

/**
 * Компонент для отображения индикатора загрузки.
 */
export const Spinner: React.FC<SpinnerProps> = ({ size = 56, color, ...rest }) => {
    return (
        <StyledRoot $size={size} {...rest}>
            {color ? <WhiteSpinnerSvg width={size} height={size} /> : <SpinnerSvg width={size} height={size} />}
        </StyledRoot>
    );
};
