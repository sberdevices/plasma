import React from 'react';
import styled, { css } from 'styled-components';
import { Price, Underline } from '@sberdevices/plasma-ui';
import { secondary, tertiary } from '@sberdevices/plasma-tokens';

import { Currency } from '../../../../types';

export interface CartOrderProps {
    price: number;
    disabled: boolean;
    minDeliveryPrice?: number;
    currency?: Currency;
    onMakeOrder: () => void;
}

export const deliveryDescriptionText = 'Стоимость доставки будет рассчитана после ввода адреса';
export const amountText = 'Сумма';

export const deliveryDescriptionMixin = css`
    color: ${secondary};
    text-align: center;
`;

export const StyledUnderline = styled(Underline)`
    color: ${tertiary};
    text-align: center;
`;

const StyledDeliveryPriceContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
export const DeliveryPrice: React.FC<{
    currency?: Currency;
    minDeliveryPrice?: number;
    className?: string;
}> = ({ currency, minDeliveryPrice = 0, className }) => (
    <StyledDeliveryPriceContainer className={className}>
        <span>Доставка</span>
        <div>
            <span>{'от '}</span>
            <Price currency={currency}>{minDeliveryPrice}</Price>
        </div>
    </StyledDeliveryPriceContainer>
);

export const Agreement: React.FC = () => (
    <StyledUnderline>
        Заполняя данную форму, я соглашаюсь с условиями продажи и политикой обработки персональных данных
    </StyledUnderline>
);
