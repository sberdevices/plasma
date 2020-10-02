import React from 'react';
import styled, { css } from 'styled-components';

import { uiColor } from './Card';

type CardIndexColor = keyof typeof uiColor;

export interface CardIndexProps {
    color?: CardIndexColor;
    className?: string;
}

interface StyledRootProps {
    color: CardIndexColor;
}

const StyledRoot = styled.div<StyledRootProps>`
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 64px;
    height: 64px;

    font-size: 28px;
    font-weight: 600;
    text-align: center;

    color: rgba(255, 255, 255, 0.56);
    border-radius: 50%;

    ${({ color }) => css`
        background-color: ${uiColor[color]};
    `}
`;

export const CardIndex: React.FC<CardIndexProps> = ({ children, className, color = 'index' }) => {
    return (
        <StyledRoot color={color} className={className}>
            {children}
        </StyledRoot>
    );
};
