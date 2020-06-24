import React from 'react';
import styled, { css } from 'styled-components';

type CardBadgePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface CardBadgeProps {
    color: string;
    position: CardBadgePosition;
    className?: string;
}

function resolvePosition(pos: CardBadgePosition) {
    switch (pos) {
        case 'top-left':
            return css`
                left: 16px;
                top: 16px;
            `;
        case 'top-right':
            return css`
                right: 16px;
                top: 16px;
            `;
        case 'bottom-left':
            return css`
                left: 16px;
                bottom: 16px;
            `;
        case 'bottom-right':
            return css`
                right: 16px;
                bottom: 16px;
            `;
        default:
            return null;
    }
}

const StyledRoot = styled.div<CardBadgeProps>`
    background-color: ${({ color }) => color};
    box-sizing: border-box;
    border-radius: 24px;
    color: #fff;
    font-weight: 500;
    font-size: 24px;
    height: 48px;
    display: flex;
    align-items: center;
    line-height: 32px;
    padding: 8px 16px;
    position: absolute;

    ${({ position }) => resolvePosition(position)}
`;

export const CardBadge: React.FC<CardBadgeProps> = ({ color, className, children, position }) => {
    return (
        <StyledRoot color={color} position={position} className={className}>
            {children}
        </StyledRoot>
    );
};

export default CardBadge;
