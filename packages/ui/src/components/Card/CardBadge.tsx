import React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';

type CardBadgePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

type CardBadgePositionColor = keyof DefaultTheme['color'];

export interface CardBadgeProps {
    position?: CardBadgePosition;
    color?: CardBadgePositionColor;
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

interface StyledRootProps {
    color: CardBadgePositionColor;
    position: CardBadgePosition;
}

const StyledRoot = styled.div<StyledRootProps>`
    ${({ theme, color, position }) => css`
        background-color: ${theme.color[color]};
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

        ${resolvePosition(position)}
    `}
`;

export const CardBadge: React.FC<CardBadgeProps> = ({
    className,
    children,
    color = 'active',
    position = 'top-right',
}) => {
    return (
        <StyledRoot color={color} position={position} className={className}>
            {children}
        </StyledRoot>
    );
};
