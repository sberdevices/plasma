import React from 'react';
import styled from 'styled-components';

interface CardBadgeProps {
    color: string;
    className?: string;
}

const StyledRoot = styled.div<CardBadgeProps>`
    padding: 8px 16px;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    color: #fff;
    border-radius: 16px;
    background-color: ${({ color }) => color};
`;

export const CardBadge: React.FC<CardBadgeProps> = ({ color, className, children }) => {
    return (
        <StyledRoot color={color} className={className}>
            {children}
        </StyledRoot>
    );
};

export default CardBadge;
