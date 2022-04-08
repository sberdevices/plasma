import React from 'react';
import styled from 'styled-components';
import { Button, Footnote1 } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { useFocusOnMount } from '../../../hooks/useFocusOnMount';
import { CartOrderDetailsCommon } from '../CartOrderDetails/CartOrderDetails@common';
import { AnyObject } from '../../../types';

import { CartOrderProps, CheckoutButtonContent } from './CartOrder@common';

const StyledContainer = styled.div`
    width: 14.188rem;
    margin-left: auto;
    margin-top: 0.5rem;
`;

const StyledCartOrderDetails = styled(CartOrderDetailsCommon)`
    margin-bottom: 1.875rem;
`;

const StyledAdditionalInfo = styled(Footnote1)`
    margin-top: 0.875rem;
    color: ${secondary};
    text-align: center;
`;

export function CartOrderSberBox<ID = unknown, T extends AnyObject = AnyObject>({
    order,
    disabled,
    checkoutButtonContent,
    additionalInfo,
    onCheckout,
}: CartOrderProps<ID, T>) {
    const { amount, deliveryPrice, minDeliveryPrice, discount, percentDiscount, currency, orderDetails } = order;

    const buttonRef = React.useRef(null);
    useFocusOnMount(buttonRef);

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
            <Button
                view="primary"
                stretch
                onClick={onCheckout}
                size="m"
                disabled={disabled}
                ref={buttonRef}
                data-cy="CartOrder-button"
                data-focusable
                tabIndex={0}
            >
                <CheckoutButtonContent content={checkoutButtonContent} />
            </Button>
            <StyledAdditionalInfo color={secondary}>{additionalInfo}</StyledAdditionalInfo>
        </StyledContainer>
    );
}
