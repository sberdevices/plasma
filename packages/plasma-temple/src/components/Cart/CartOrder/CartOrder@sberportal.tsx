import React from 'react';
import styled from 'styled-components';
import { Button, Footnote1 } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { CartOrderDetailsCommon } from '../CartOrderDetails/CartOrderDetails@common';
import { AnyObject } from '../../../types';

import { CartOrderProps, CheckoutButtonContent } from './CartOrder@common';

const StyledContainer = styled.div`
    width: 8.188rem;
    margin-left: auto;
    margin-top: 0.375rem;
`;

const StyledCartOrderDetails = styled(CartOrderDetailsCommon)`
    margin-bottom: 1.5rem;
`;

const StyledAdditionalInfo = styled(Footnote1)`
    margin-top: 1rem;
    color: ${secondary};
    text-align: center;
    font-size: 0.625rem;
    line-height: 0.75rem;
`;

export function CartOrderSberPortal<ID = unknown, T extends AnyObject = AnyObject>({
    order,
    disabled,
    checkoutButtonContent,
    additionalInfo,
    onCheckout,
}: CartOrderProps<ID, T>) {
    const { amount, deliveryPrice, minDeliveryPrice, discount, percentDiscount, currency, orderDetails } = order;

    return (
        <StyledContainer>
            <StyledCartOrderDetails
                amount={amount}
                currency={currency}
                deliveryPrice={deliveryPrice}
                minDeliveryPrice={minDeliveryPrice}
                discount={discount}
                percentDiscount={percentDiscount}
                orderDetails={orderDetails}
            />
            <Button view="primary" stretch onClick={onCheckout} size="s" disabled={disabled} data-cy="CartOrder-button">
                <CheckoutButtonContent content={checkoutButtonContent ?? 'Оформить'} />
            </Button>
            <StyledAdditionalInfo>{additionalInfo}</StyledAdditionalInfo>
        </StyledContainer>
    );
}
