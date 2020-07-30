import React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';

type CardIndexColor = keyof DefaultTheme['uiColor'];

export interface CardIndexProps {
    color?: CardIndexColor;
    className?: string;
}

interface StyledRootProps {
    color: CardIndexColor;
}

const StyledRoot = styled.div<StyledRootProps>`
    ${({ theme, color }) => css`
        align-items: center;
        background-color: ${theme.uiColor[color]};
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
    `}
`;

export const CardIndex: React.FC<CardIndexProps> = ({ children, className, color = 'index' }) => {
    return (
        <StyledRoot color={color} className={className}>
            {children}
        </StyledRoot>
    );
};
