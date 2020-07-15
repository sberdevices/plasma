import React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';

type CardIndexPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

type CardIndexColor = keyof DefaultTheme['color'];

export interface CardIndexProps {
    index: number;
    position: CardIndexPosition;
    color?: CardIndexColor;
    className?: string;
}

function resolvePosition(pos: CardIndexPosition) {
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
    color: CardIndexColor;
    position: CardIndexPosition;
}

const StyledRoot = styled.div<StyledRootProps>`
    ${({ theme, position, color }) => css`
        align-items: center;
        background-color: ${theme.color[color]};
        border-radius: 50%;
        color: rgba(255, 255, 255, 0.56);
        display: flex;
        height: 64px;
        font-size: 28px;
        font-weight: 600;
        justify-content: center;
        position: absolute;
        text-align: center;
        width: 64px;

        ${resolvePosition(position)}
    `}
`;

export const CardIndex: React.FC<CardIndexProps> = ({ index, className, position, color = 'index' }) => {
    return (
        <StyledRoot color={color} position={position} className={className}>
            {index}
        </StyledRoot>
    );
};
