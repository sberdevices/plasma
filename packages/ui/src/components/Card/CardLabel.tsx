import React from 'react';
import styled, { css } from 'styled-components';

export interface CardLabelProps {
    className?: string;
    lines?: number;
}

interface StyledRootProps {
    lines: number;
}
const StyledRoot = styled.div<StyledRootProps>`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;

    font-size: 32px;
    font-weight: 500;
    line-height: 40px;
    white-space: normal;

    color: #fff;

    ${({ lines }) => css`
        -webkit-line-clamp: ${lines};
    `}
`;

export const CardLabel: React.FC<CardLabelProps> = ({ children, className, lines = 2 }) => {
    return (
        <StyledRoot lines={lines} className={className}>
            {children}
        </StyledRoot>
    );
};
