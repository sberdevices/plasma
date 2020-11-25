import React from 'react';
import styled, { keyframes, css } from 'styled-components';

import { SpinnerSvg } from './SpinnerSvg';

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
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 56, ...rest }) => {
    return (
        <StyledRoot $size={size} {...rest}>
            <SpinnerSvg width={size} height={size} />
        </StyledRoot>
    );
};
