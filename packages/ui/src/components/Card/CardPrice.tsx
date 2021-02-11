import React from 'react'; // eslint-disable-line
import styled from 'styled-components';
import { buttonAccent, primary, tertiary } from '@sberdevices/plasma-tokens';

import { Price, PriceProps } from '../Price';
import { Body2 } from '../Typography';

export interface CardPriceProps extends React.HTMLAttributes<HTMLDivElement> {
    price: number;
    oldPrice?: number;
    currency?: PriceProps['currency'];
    count?: number;
}

const StyledRoot = styled(Body2)`
    display: flex;
    box-sizing: border-box;

    margin-top: 0.75rem;
`;

const StyledPrice = styled(Price)`
    height: 2.5rem;
    color: ${primary};
`;

const StyledOldPrice = styled(Price)`
    height: 2.5rem;
    margin-left: 0.5rem;
    color: ${tertiary};
`;

const StyledCount = styled(Body2)`
    box-sizing: border-box;
    height: 2.5rem;
    margin-left: 0.5rem;

    color: ${buttonAccent};
`;

export const CardPrice: React.FC<CardPriceProps> = ({ count, currency, oldPrice, price, ...rest }) => {
    return (
        <StyledRoot {...rest}>
            <StyledPrice currency={currency}>{price}</StyledPrice>
            {oldPrice && (
                <StyledOldPrice currency={currency} stroke>
                    {oldPrice}
                </StyledOldPrice>
            )}
            {count ? <StyledCount>×{count}</StyledCount> : ''}
        </StyledRoot>
    );
};
