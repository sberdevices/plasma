import React from 'react';
import styled from 'styled-components';
import { Body1, Caption, DeviceKind, Footnote1, Price } from '@sberdevices/plasma-ui';
import { accent } from '@sberdevices/plasma-tokens';

import { Currency } from '../../../../types';
import { CartState } from '../../types';
import { deviceFamily } from '../../../../utils/deviceFamily';

export interface CartOrderProps
    extends Pick<CartState, 'amount' | 'deliveryPrice' | 'minDeliveryPrice' | 'currency' | 'discount'> {
    disabled: boolean;
    orderButtonText?: string;
    onMakeOrder: () => void;
}

export const amountText = 'Сумма';

const StyledCell = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledDiscountAmount = styled(Price)`
    color: ${accent};
`;

const mapDeviceToText: Record<DeviceKind, React.FC> = {
    sberBox: Body1,
    sberPortal: Caption,
    mobile: Footnote1,
};

const Text = mapDeviceToText[deviceFamily];

export const DeliveryPrice: React.FC<{
    currency?: Currency;
    minDeliveryPrice?: number;
    deliveryPrice?: number;
    className?: string;
}> = ({ currency, minDeliveryPrice, deliveryPrice, className }) => {
    if (!minDeliveryPrice && !deliveryPrice) {
        return null;
    }

    return (
        <StyledCell className={className}>
            <Text>Доставка</Text>
            <Text>
                {deliveryPrice ? '' : 'от '}
                <Price currency={currency}>{deliveryPrice ?? minDeliveryPrice ?? 0}</Price>
            </Text>
        </StyledCell>
    );
};

export const Discount: React.FC<{
    discount?: number;
    currency?: Currency;
    className?: string;
}> = ({ discount, className, currency }) =>
    discount ? (
        <StyledCell className={className}>
            <Text>Скидка</Text>
            <Text>
                <StyledDiscountAmount currency={currency}>{discount}</StyledDiscountAmount>
            </Text>
        </StyledCell>
    ) : null;

export const CartAmount: React.FC<{ amount: number; discount?: number }> = ({ amount, discount = 0 }) => (
    <Price>{amount - discount}</Price>
);
