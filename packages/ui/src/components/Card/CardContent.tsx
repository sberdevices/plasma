import React from 'react';
import styled, { css } from 'styled-components';

export interface CardContentProps {
    disabled?: boolean;
    className?: string;
}

const StyledRoot = styled.div<CardContentProps>`
    box-sizing: border-box;
    position: relative;
    padding: 32px 32px 36px;

    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0.5;
        `}
`;

export const CardContent: React.FC<CardContentProps> = ({ className, children, disabled }) => {
    return (
        <StyledRoot disabled={disabled} className={className}>
            {children}
        </StyledRoot>
    );
};

export default CardContent;
