import React from 'react';
import styled from 'styled-components';

import Icon from '../Icon/Icon';

interface CartProps {
    amount: number;
    total: number;
    currency?: React.ReactNode;
}

const StyledRoot = styled.div`
    display: flex;
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
        background: ${({ theme }) => theme.activeColor};
    }
`;

const StyledIcon = styled.div`
    position: relative;
    width: 40px;
    height: 36px;
`;

const StyledBadge = styled.span`
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
    background: #08a652;

    transition: 0.2s ease-in-out;
    will-change: background-color;

    ${StyledRoot}:focus & {
        color: #08a652;

        background: #fff;
        border: 2px solid #08a652;
    }
`;

const StyledPrice = styled.div`
    height: 48px;
    margin-left: 16px;
    font-size: 32px;
    font-weight: 600;
    line-height: 50px;
    color: #fff;
`;

export const Cart: React.FC<CartProps> = ({ amount, total, currency = '₽' }) => (
    <StyledRoot tabIndex={0}>
        <StyledIcon>
            <Icon icon="cart" size="l" />
            {amount > 0 && <StyledBadge>{amount}</StyledBadge>}
        </StyledIcon>
        <StyledPrice>
            {total}&nbsp;{currency}
        </StyledPrice>
    </StyledRoot>
);

export default Cart;
