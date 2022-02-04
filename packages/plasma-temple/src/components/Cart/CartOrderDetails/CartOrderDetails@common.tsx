import React from 'react';
import styled, { css } from 'styled-components';
import { Body1, Headline1, DeviceKind, Caption, Price, Headline4, mediaQuery, Footnote1 } from '@sberdevices/plasma-ui';
import { accent, critical, primary, warning } from '@sberdevices/plasma-tokens';

import { deviceFamily } from '../../../utils/deviceFamily';
import { Currency } from '../../../types';
import { OrderDetails } from '../types';

export interface CartOrderDetailsProps {
    amount: number;
    currency?: Currency;
    deliveryPrice?: number;
    minDeliveryPrice?: number;
    discount?: number;
    percentDiscount?: number;
    orderDetails?: OrderDetails[];
    className?: string;
}

const mapDeviceToText: Record<DeviceKind, React.FC> = {
    sberBox: Body1,
    sberPortal: Caption,
    mobile: Footnote1,
};

const Text = mapDeviceToText[deviceFamily];

type OrderDetailsType = OrderDetails['type'];

const textColorMap: Record<OrderDetailsType, string> = {
    warning,
    critical,
    accent,
    primary,
};

const StyledDetailValue = styled(Text)<{ type: OrderDetailsType }>`
    color: ${({ type }) => textColorMap[type]};
`;

const StyledCell = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    ${mediaQuery(
        'M',
        2,
    )(css`
        margin-bottom: 0.75rem;
    `)}
`;

const mapDeviceToAmountTitle: Record<DeviceKind, React.FC> = {
    sberBox: Body1,
    sberPortal: Caption,
    mobile: Caption,
};

const AmountTitle = mapDeviceToAmountTitle[deviceFamily];

const mapDeviceToAmount: Record<DeviceKind, React.FC> = {
    sberBox: Headline1,
    sberPortal: Headline4,
    mobile: Headline4,
};

const StyledAmountContainer = styled(mapDeviceToAmount[deviceFamily])`
    margin-top: 0.375rem;
    margin-bottom: 1.25rem;

    ${mediaQuery(
        'M',
        2,
    )(css`
        margin-top: 0.25rem;
        margin-bottom: 1rem;
    `)}
`;

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
    percentDiscount?: number;
    currency?: Currency;
    className?: string;
}> = ({ discount, percentDiscount, className, currency }) => {
    if (!discount) {
        return null;
    }

    const percent = percentDiscount ? ` ${percentDiscount}%` : '';

    return (
        <StyledCell className={className}>
            <Text>{`Скидка ${percent}`}</Text>
            <StyledDetailValue type="accent">
                -<Price currency={currency}>{discount}</Price>
            </StyledDetailValue>
        </StyledCell>
    );
};

export const AdditionalDetails: React.FC<{ orderDetails?: OrderDetails[] }> = ({ orderDetails }) => (
    <>
        {orderDetails?.map(({ type, name, value }, index) => (
            <StyledCell key={index}>
                {name && <Text>{name}</Text>}
                <StyledDetailValue type={type}>{value}</StyledDetailValue>
            </StyledCell>
        ))}
    </>
);

export const CartOrderDetailsCommon: React.FC<CartOrderDetailsProps> = ({
    amount,
    currency,
    deliveryPrice,
    minDeliveryPrice,
    discount,
    percentDiscount,
    orderDetails,
    className,
}) => {
    return (
        <div className={className}>
            <AmountTitle>Сумма</AmountTitle>
            <StyledAmountContainer>
                <Price currency={currency}>{amount}</Price>
            </StyledAmountContainer>
            <DeliveryPrice currency={currency} deliveryPrice={deliveryPrice} minDeliveryPrice={minDeliveryPrice} />
            <Discount currency={currency} discount={discount} percentDiscount={percentDiscount} />
            <AdditionalDetails orderDetails={orderDetails} />
        </div>
    );
};
