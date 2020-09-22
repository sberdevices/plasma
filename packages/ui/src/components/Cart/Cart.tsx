import React from 'react';
import styled, { css } from 'styled-components';
import { buttonAccent, accent, buttonWarning, whitePrimary, blackSecondary } from 'plasma-tokens';

import { Icon, IconName } from '../Icon/Icon';

// TODO: refactor Cart
const uiColor = {
    active: buttonAccent,
    highlight: accent,
    blank: whitePrimary,
    accent: buttonWarning,
    index: blackSecondary,
};
type CartColor = keyof typeof uiColor;

export interface CartProps extends React.HTMLAttributes<HTMLDivElement> {
    amount: number;
    icon?: IconName;
    color?: CartColor;
}

interface StyledRootProps {
    color: CartColor;
}

const StyledRoot = styled.div<StyledRootProps>`
    ${({ color }) => css`
        display: inline-flex;
        align-items: center;
        margin-left: 8px;
        border-radius: 40px;
        padding: 20px 40px;
        height: 80px;
        box-sizing: border-box;
        transition: 0.2s ease-in-out;
        will-change: background-color;

        &:focus {
            outline: 0;
            background-color: ${uiColor[color]};
        }
    `}
`;

const StyledIcon = styled.div`
    position: relative;
    width: 40px;
    height: 36px;
`;

interface StyledBadgeProps {
    color: CartColor;
}

const StyledBadge = styled.span<StyledBadgeProps>`
    ${({ color }) => css`
        position: absolute;
        top: 0;
        right: 0;
        transform: scale(1) translate(50%, -50%);
        transform-origin: 100% 0%;

        display: flex;
        justify-content: center;
        align-items: center;

        height: 32px;
        min-width: 32px;
        padding: 0 8px;

        font-size: 20px;

        box-sizing: border-box;

        color: #fff;
        border-radius: 16px;
        background: ${uiColor[color]};

        transition: 0.2s ease-in-out;
        will-change: background-color;
        border: 2px solid transparent;

        ${StyledRoot}:focus & {
            color: ${uiColor[color]};
            background: #fff;
            border: 2px solid ${uiColor[color]};
        }
    `}
`;

const StyledLabel = styled.div`
    height: 48px;
    margin-left: 16px;
    font-size: 32px;
    font-weight: 600;
    line-height: 50px;
    color: #fff;
`;

export const Cart: React.FC<CartProps> = ({ amount, children, icon = 'cart', color = 'active', ...restProps }) => (
    <StyledRoot {...restProps} color={color}>
        <StyledIcon>
            <Icon icon={icon} />
            {amount > 0 && <StyledBadge color={color}>{amount}</StyledBadge>}
        </StyledIcon>
        {children && <StyledLabel>{children}</StyledLabel>}
    </StyledRoot>
);
