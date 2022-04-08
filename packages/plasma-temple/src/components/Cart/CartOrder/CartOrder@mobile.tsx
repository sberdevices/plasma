import React from 'react';
import styled from 'styled-components';
import { Button, Footnote1, Price } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { CartOrderDetailsMobile } from '../CartOrderDetails/CartOrderDetails@mobile';
import { AnyObject } from '../../../types';

import { CartOrderProps, CheckoutButtonContent } from './CartOrder@common';

const StyledAdditionalInfo = styled(Footnote1)`
    margin-top: 1rem;
    color: ${secondary};
    text-align: center;
`;

const StyledButton = styled(Button)<{ bottom?: number }>`
    display: flex;
    justify-content: space-between;

    ${({ bottom }) =>
        bottom &&
        `
            position: fixed;
            bottom: ${bottom}px;
            left: var(--plasma-grid-margin);
            width: calc(100% - 2 * var(--plasma-grid-margin));
        `}
`;

const StyledContainer = styled.div<{ bottom?: number }>`
    ${({ bottom }) =>
        bottom &&
        `
            padding-bottom: ${bottom + 64}px;
        `}
`;

export function CartOrderMobile<ID = unknown, T extends AnyObject = AnyObject>({
    order,
    disabled,
    insets,
    checkoutButtonContent,
    additionalInfo,
    onCheckout,
}: CartOrderProps<ID, T>) {
    const { amount, deliveryPrice, minDeliveryPrice, discount, percentDiscount, currency, orderDetails } = order;

    const content = checkoutButtonContent ?? (
        <>
            <span>Оформить заказ</span>
            <Price>{amount}</Price>
        </>
    );

    return (
        <StyledContainer bottom={insets?.bottom}>
            <CartOrderDetailsMobile
                amount={amount}
                currency={currency}
                deliveryPrice={deliveryPrice}
                minDeliveryPrice={minDeliveryPrice}
                discount={discount}
                percentDiscount={percentDiscount}
                orderDetails={orderDetails}
            />
            <StyledButton
                view="primary"
                stretch
                onClick={onCheckout}
                disabled={disabled}
                size="m"
                bottom={insets?.bottom}
                data-cy="CartOrder-button"
            >
                <CheckoutButtonContent content={content} />
            </StyledButton>
            <StyledAdditionalInfo color={secondary}>{additionalInfo}</StyledAdditionalInfo>
        </StyledContainer>
    );
}
