import React from 'react';
import styled from 'styled-components';
import { Button, Body1, Headline1 } from '@sberdevices/plasma-ui';

import { useFocusOnMount } from '../../../../hooks/useFocusOnMount';

import { DeliveryPrice, CartOrderProps, amountText, Discount, CartAmount } from './CartOrder@common';

const StyledPriceContainer = styled(Headline1)`
    margin-top: 0.375rem;
`;

const StyledDeliveryPrice = styled(DeliveryPrice)`
    margin-top: 1.25rem;
    margin-bottom: 0.75rem;
`;

const StyledContainer = styled.div`
    margin-bottom: 1.875rem;
`;

export const CartOrderSberBox: React.FC<CartOrderProps> = ({
    amount,
    currency,
    disabled,
    deliveryPrice,
    minDeliveryPrice,
    discount,
    orderButtonText,
    children,
    onMakeOrder,
}) => {
    const buttonRef = React.useRef(null);
    useFocusOnMount(buttonRef);

    return (
        <>
            <Body1>{amountText}</Body1>
            <StyledPriceContainer>
                <CartAmount amount={amount} discount={discount} />
            </StyledPriceContainer>
            <StyledContainer>
                <StyledDeliveryPrice
                    currency={currency}
                    deliveryPrice={deliveryPrice}
                    minDeliveryPrice={minDeliveryPrice}
                />
                <Discount currency={currency} discount={discount} />
            </StyledContainer>
            <Button
                view="primary"
                stretch
                onClick={onMakeOrder}
                size="m"
                disabled={disabled}
                ref={buttonRef}
                data-cy="CartOrder-button"
            >
                {orderButtonText}
            </Button>
            {children}
        </>
    );
};
