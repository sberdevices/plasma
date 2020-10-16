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

    ${({ $size }) => css`
        width: ${$size}px;
        height: ${$size}px;
    `}

    animation: ${rotateAnimation} 1s linear infinite;
`;

interface SpinnerProps {
    size?: number;
    className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 56, className }) => {
    return (
        <StyledRoot className={className} $size={size}>
            <SpinnerSvg width={size} height={size} />
        </StyledRoot>
    );
};
