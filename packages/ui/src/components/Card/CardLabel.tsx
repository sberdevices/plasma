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
    ${({ lines }) => css`
        color: #fff;
        font-weight: 500;
        line-height: 40px;
        font-size: 32px;

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: ${lines};
        overflow: hidden;
        white-space: normal;
    `}
`;

export const CardLabel: React.FC<CardLabelProps> = ({ children, className, lines = 2 }) => {
    return (
        <StyledRoot lines={lines} className={className}>
            {children}
        </StyledRoot>
    );
};
