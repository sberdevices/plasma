import React from 'react';
import styled from 'styled-components';
import { Price, Button, Headline4, Caption } from '@sberdevices/plasma-ui';

import { amountText, DeliveryPrice, CartOrderProps, Discount } from './CartOrder@common';

const StyledPriceContainer = styled(Headline4)`
    margin-top: 0.25rem;
`;

const StyledDeliveryPrice = styled(DeliveryPrice)`
    margin-top: 1rem;
    margin-bottom: 0.75rem;
`;

const StyledContainer = styled.div`
    margin-bottom: 1.125rem;
`;

export const CartOrderSberPortal: React.FC<CartOrderProps> = ({
    amount,
    deliveryPrice,
    minDeliveryPrice,
    discount,
    currency,
    disabled,
    orderButtonText,
    children,
    onMakeOrder,
}) => {
    return (
        <>
            <Caption>{amountText}</Caption>
            <StyledPriceContainer>
                <Price>{amount}</Price>
            </StyledPriceContainer>
            <StyledContainer>
                <StyledDeliveryPrice
                    currency={currency}
                    deliveryPrice={deliveryPrice}
                    minDeliveryPrice={minDeliveryPrice}
                />
                <Discount currency={currency} discount={discount} />
            </StyledContainer>
            <Button view="primary" stretch onClick={onMakeOrder} size="s" disabled={disabled}>
                {orderButtonText}
            </Button>
            {children}
        </>
    );
};
