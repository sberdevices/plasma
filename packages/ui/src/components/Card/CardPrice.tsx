import React from 'react'; // eslint-disable-line
import styled from 'styled-components';
import { buttonAccent } from '@sberdevices/plasma-tokens';

import { Body2 } from '../Typography';
import { formatCurrency } from '../../helpers/formatCurrency';

export interface CardPriceProps {
    price: number;
    oldPrice?: number;
    currency?: string;
    count?: number;
    className?: string;
}

const StyledRoot = styled.div`
    display: flex;
    box-sizing: border-box;

    margin-top: 12px;
`;

const StyledPrice = styled(Body2)`
    box-sizing: border-box;
    height: 40px;

    color: #fff;
`;

const StyledOldPrice = styled(StyledPrice)`
    box-sizing: border-box;
    margin-left: 8px;

    text-decoration: line-through;

    opacity: 0.24;
`;

const StyledCount = styled(Body2)`
    box-sizing: border-box;
    height: 40px;
    margin-left: 8px;

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
