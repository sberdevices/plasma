import React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';

import Icon from '../Icon/Icon';

type CartColor = keyof DefaultTheme['colors'];

export interface CartProps {
    amount: number;
    total: number;
    currency?: React.ReactNode;
    color?: CartColor;
}

interface StyledRootProps {
    color: CartColor;
}

const StyledRoot = styled.div<StyledRootProps>`
    ${({ theme, color }) => css`
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
            background-color: ${theme.colors[color]};
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
    ${({ theme, color }) => css`
        position: absolute;
        top: -14px;
        right: -12px;

        display: flex;
        justify-content: center;
        align-items: center;

        width: 32px;
        height: 32px;
        line-height: 28px;

        font-size: 20px;

        box-sizing: border-box;

        color: #fff;
        border-radius: 50%;
        background: ${theme.colors[color]};

        transition: 0.2s ease-in-out;
        will-change: background-color;

        ${StyledRoot}:focus & {
            color: ${theme.colors[color]};

            background: #fff;
            border: 2px solid ${theme.colors[color]};
        }
    `}
`;

const StyledPrice = styled.div`
    height: 48px;
    margin-left: 16px;
    font-size: 32px;
    font-weight: 600;
    line-height: 50px;
    color: #fff;
`;

export const Cart: React.FC<CartProps> = ({ amount, total, currency = '₽', color = 'active' }) => (
    <StyledRoot color={color} tabIndex={0}>
        <StyledIcon>
            <Icon icon="cart" />
            {amount > 0 && <StyledBadge color={color}>{amount}</StyledBadge>}
        </StyledIcon>
        <StyledPrice>
            {total}&nbsp;{currency}
        </StyledPrice>
    </StyledRoot>
);

export default Cart;
