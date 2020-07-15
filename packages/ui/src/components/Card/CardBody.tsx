import React from 'react';
import styled, { css } from 'styled-components';

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    borderRadius?: number;
    className?: string;
}

interface StyledRootProps {
    borderRadius: number;
}

const StyledRoot = styled.div<StyledRootProps>`
    ${({ borderRadius }) => css`
        border-radius: ${borderRadius}px;
        box-sizing: content-box;
        display: flex;
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        position: relative;
        width: 100%;
    `}
`;

export const CardBody: React.FC<CardBodyProps> = ({ children, className, borderRadius = 28, ...attributes }) => {
    return (
        <StyledRoot {...attributes} className={className} borderRadius={borderRadius}>
            {children}
        </StyledRoot>
    );
};
