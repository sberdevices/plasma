import React from 'react';
import styled from 'styled-components';
import { Price, Button, Footnote1, Headline1, Body1 } from '@sberdevices/plasma-ui';

import { useFocusOnMount } from '../../../../hooks/useFocusOnMount';

import {
    Agreement,
    deliveryDescriptionText,
    deliveryDescriptionMixin,
    DeliveryPrice,
    CartOrderProps,
    amountText,
} from './CartOrder@common';

const StyledPriceContainer = styled(Headline1)`
    margin-top: 0.375rem;
`;

const StyledDeliveryPrice = styled(DeliveryPrice)`
    margin-top: 1.25rem;
    margin-bottom: 1.875rem;
`;

const StyledDeliveryDescription = styled(Footnote1)`
    ${deliveryDescriptionMixin}

    margin-top: 1.25rem;
    margin-bottom: 4.25rem;
`;

export const CartOrderSberBox: React.FC<CartOrderProps> = ({
    price,
    currency,
    disabled,
    minDeliveryPrice = 0,
    onMakeOrder,
}) => {
    const buttonRef = React.useRef(null);
    useFocusOnMount(buttonRef);

    return (
        <>
            <Footnote1>{amountText}</Footnote1>
            <StyledPriceContainer>
                <Price>{price}</Price>
            </StyledPriceContainer>
            <Body1>
                <StyledDeliveryPrice currency={currency} minDeliveryPrice={minDeliveryPrice} />
            </Body1>
            <Button view="primary" stretch onClick={onMakeOrder} size="m" disabled={disabled} ref={buttonRef}>
                Оформить заказ
            </Button>
            <StyledDeliveryDescription>{deliveryDescriptionText}</StyledDeliveryDescription>
            <Agreement />
        </>
    );
};
