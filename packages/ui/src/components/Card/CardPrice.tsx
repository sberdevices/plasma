import React from 'react';
import styled, { css } from 'styled-components';

import UIContext from '../../contexts/UIContext';

export interface CardPriceProps {
    price: number;
    oldPrice?: number;
    currency?: string;
    count?: number;
    className?: string;
}

const StyledRoot = styled.div`
    margin-top: 12px;
    display: flex;
`;

const StyledPrice = styled.div`
    height: 40px;
    line-height: 40px;
    font-size: 32px;
    font-weight: 600;
    color: #fff;
`;

const StyledOldPrice = styled(StyledPrice)`
    opacity: 0.24;
    margin-left: 8px;
    text-decoration: line-through;
`;

const StyledCount = styled.div`
    ${({ theme }) => css`
        height: 40px;
        line-height: 40px;
        margin-left: 8px;
        font-size: 32px;
        font-weight: 600;
        color: ${theme.color.active};
    `}
`;

export const CardPrice: React.FC<CardPriceProps> = ({ className, count, currency, oldPrice, price }) => {
    const ctx = React.useContext(UIContext);

    return (
        <StyledRoot className={className}>
            <StyledPrice>{ctx.currencyFormat(price, currency)}</StyledPrice>
            {oldPrice && <StyledOldPrice>{ctx.currencyFormat(oldPrice, currency)}</StyledOldPrice>}
            {count ? <StyledCount>×{count}</StyledCount> : ''}
        </StyledRoot>
    );
};

export default CardPrice;
