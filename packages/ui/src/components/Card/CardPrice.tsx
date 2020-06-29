import React from 'react';
import styled, { css } from 'styled-components';

export interface CardPriceProps {
    price: number | string;
    oldPrice?: number | string;
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

export const CardPrice: React.FC<CardPriceProps> = ({ className, count, oldPrice, price, currency = '₽' }) => {
    return (
        <StyledRoot className={className}>
            <StyledPrice>
                {price}&nbsp;{currency}
            </StyledPrice>
            {oldPrice && (
                <StyledOldPrice>
                    {oldPrice}&nbsp;{currency}
                </StyledOldPrice>
            )}
            {count ? <StyledCount>×{count}</StyledCount> : ''}
        </StyledRoot>
    );
};

export default CardPrice;
