import React from 'react';
import styled from 'styled-components';
import { Price, Button, Headline4, Caption } from '@sberdevices/plasma-ui';

import {
    Agreement,
    amountText,
    deliveryDescriptionText,
    deliveryDescriptionMixin,
    DeliveryPrice,
    CartOrderProps,
} from './CartOrder@common';

const StyledPriceContainer = styled(Headline4)`
    margin-top: 0.25rem;
`;

const StyledDeliveryPrice = styled(DeliveryPrice)`
    margin-top: 1rem;
    margin-bottom: 1.125rem;
`;

const StyledDeliveryDescription = styled(Caption)`
    ${deliveryDescriptionMixin}

    margin-top: 0.75rem;
    margin-bottom: 0.25rem;
`;

export const CartOrderSberPortal: React.FC<CartOrderProps> = ({
    price,
    currency,
    disabled,
    minDeliveryPrice = 0,
    onMakeOrder,
}) => {
    return (
        <>
            <Caption>{amountText}</Caption>
            <StyledPriceContainer>
                <Price>{price}</Price>
            </StyledPriceContainer>
            <Caption>
                <StyledDeliveryPrice currency={currency} minDeliveryPrice={minDeliveryPrice} />
            </Caption>
            <Button view="primary" stretch onClick={onMakeOrder} size="s" disabled={disabled}>
                Оформить
            </Button>
            <StyledDeliveryDescription>{deliveryDescriptionText}</StyledDeliveryDescription>
            <Agreement />
        </>
    );
};
