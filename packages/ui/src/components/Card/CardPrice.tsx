import React from 'react';
import styled from 'styled-components';
import { formatCurrency } from 'i18n';
import { buttonAccent } from 'plasma-tokens';

export interface CardPriceProps {
    price: number;
    oldPrice?: number;
    currency?: string;
    count?: number;
    className?: string;
}

const StyledRoot = styled.div`
    display: flex;

    margin-top: 12px;
`;

const StyledPrice = styled.div`
    height: 40px;

    font-size: 32px;
    font-weight: 600;
    line-height: 40px;

    color: #fff;
`;

const StyledOldPrice = styled(StyledPrice)`
    margin-left: 8px;

    text-decoration: line-through;

    opacity: 0.24;
`;

const StyledCount = styled.div`
    height: 40px;
    margin-left: 8px;

    font-size: 32px;
    font-weight: 600;
    line-height: 40px;

    color: ${buttonAccent};
`;

export const CardPrice: React.FC<CardPriceProps> = ({ className, count, currency, oldPrice, price }) => {
    return (
        <StyledRoot className={className}>
            <StyledPrice>{formatCurrency(price, currency)}</StyledPrice>
            {oldPrice && <StyledOldPrice>{formatCurrency(oldPrice, currency)}</StyledOldPrice>}
            {count ? <StyledCount>×{count}</StyledCount> : ''}
        </StyledRoot>
    );
};
