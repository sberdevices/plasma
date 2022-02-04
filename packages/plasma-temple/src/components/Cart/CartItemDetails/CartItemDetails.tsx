import React from 'react';
import styled, { css } from 'styled-components';
import { Body1, Caption, DeviceKind, Footnote1, Price } from '@sberdevices/plasma-ui';
import { primary, secondary } from '@sberdevices/plasma-tokens';

import { deviceFamily } from '../../../utils/deviceFamily';
import { CartItemType } from '../types';
import { AnyObject, Currency } from '../../../types';
import { CartItemCaption } from '../CartItemCaption/CartItemCaption';

export interface CartItemDetailsProps<ID = unknown, T extends AnyObject = AnyObject> {
    item: CartItemType<ID, T>;
    currency?: Currency;
    className?: string;
}

const StyledLabel = styled(Caption)`
    color: ${secondary};
`;

const mapDeviceToTitle: Record<DeviceKind, React.FC> = {
    sberBox: Body1,
    sberPortal: Caption,
    mobile: Footnote1,
};

export const StyledName = styled(mapDeviceToTitle[deviceFamily])<{ lines: number }>`
    overflow: hidden;
    text-overflow: ellipsis;

    ${({ lines }) =>
        lines > 1
            ? css`
                  display: -webkit-box;
                  -webkit-line-clamp: ${lines};
                  -webkit-box-orient: vertical;
              `
            : css`
                  white-space: nowrap;
              `}
`;

const StyledNameDetails = styled(mapDeviceToTitle[deviceFamily])`
    color: ${secondary};
`;

const mapDeviceToPrice: Record<DeviceKind, React.FC> = {
    sberBox: Footnote1,
    sberPortal: Caption,
    mobile: Footnote1,
};

const StyledPriceContainer = styled(mapDeviceToPrice[deviceFamily])`
    color: ${secondary};
`;

const StyledOldPrice = styled(Price)`
    color: ${primary};
    opacity: 0.28;
    text-decoration: line-through;
    margin-left: 0.25rem;
`;

export function CartItemDetails<ID = unknown, T extends AnyObject = AnyObject>({
    item,
    currency,
    className,
}: CartItemDetailsProps<ID, T>) {
    const { label, name, nameDetails, caption, price, oldPrice = 0, present } = item;

    return (
        <div className={className}>
            <StyledLabel>{label}</StyledLabel>
            <StyledName lines={nameDetails ? 1 : 2}>{name}</StyledName>
            <StyledNameDetails>{nameDetails}</StyledNameDetails>
            <StyledPriceContainer>
                {!present && (
                    <>
                        <Price currency={currency}>{price}</Price>
                        {oldPrice > 0 && price < oldPrice && (
                            <StyledOldPrice currency={currency}>{oldPrice}</StyledOldPrice>
                        )}
                    </>
                )}
            </StyledPriceContainer>
            {caption?.type && <CartItemCaption {...caption} />}
        </div>
    );
}
