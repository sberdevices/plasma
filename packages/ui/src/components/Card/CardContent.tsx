import React from 'react';
import styled, { css } from 'styled-components';

interface CardContentProps {
    disabled?: boolean;
    className?: string;
}

const StyledRoot = styled.div<CardContentProps>`
    position: relative;
    padding: 32px 32px 36px;
    box-sizing: border-box;

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
