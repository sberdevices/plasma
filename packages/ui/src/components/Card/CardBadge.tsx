import React from 'react';
import styled, { css } from 'styled-components';

import { uiColor } from './Card';

type CardBadgeColor = keyof typeof uiColor;

export interface CardBadgeProps {
    color?: CardBadgeColor;
    className?: string;
}

interface StyledRootProps {
    color: CardBadgeColor;
}
const StyledRoot = styled.div<StyledRootProps>`
    position: absolute;

    display: flex;
    align-items: center;

    box-sizing: border-box;
    height: 48px;
    padding: 8px 16px;

    font-size: 24px;
    font-weight: 500;
    line-height: 32px;

    color: #fff;
    border-radius: 24px;

    ${({ color }) => css`
        background-color: ${uiColor[color]};
    `}
`;

export const CardBadge: React.FC<CardBadgeProps> = ({ className, children, color = 'active' }) => {
    return (
        <StyledRoot color={color} className={className}>
            {children}
        </StyledRoot>
    );
};
