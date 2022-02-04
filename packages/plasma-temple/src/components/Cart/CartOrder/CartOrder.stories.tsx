import React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import { Row, Col, Spinner } from '@sberdevices/plasma-ui';
import { white } from '@sberdevices/plasma-tokens';

import { OrderDetails } from '../types';

import { CartOrder } from './CartOrder';
import { CartOrderProps } from './CartOrder@common';

export default {
    title: 'Cart/CartOrder',
    parameters: {
        ignoreInsets: true,
    },
    excludeStories: /CustomCheckoutButtonContent/,
};

const CartContainer: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
    <Row>
        <Col sizeXL={6} sizeM={2} sizeS={4}>
            {children}
        </Col>
    </Row>
);

const order: CartOrderProps['order'] = {
    amount: 1750,
    deliveryPrice: 250,
    discount: 100,
    percentDiscount: 5,
    currency: 'rub',
};

export const Default = (): React.ReactElement => {
    return (
        <CartContainer>
            <CartOrder
                order={order}
                disabled={false}
                additionalInfo="Текст про стоимость доставки, которая зависит от адреса или “заполняя эту форму...”"
                insets={{ bottom: 144 }}
                onCheckout={action('onCheckout')}
            />
        </CartContainer>
    );
};

const StyledButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const CustomCheckoutButtonContent = (
    <StyledButtonContainer>
        <span>Оформить заказ</span>
        <Spinner size={32} color={white} />
    </StyledButtonContainer>
);

const orderDetails: OrderDetails[] = [
    {
        type: 'warning',
        name: '',
        value: '100 ₽ до минимальной суммы заказа',
    },
    {
        type: 'accent',
        name: 'Стоимость доставки',
        value: 'Бесплатно',
    },
    {
        type: 'accent',
        name: 'Скидка 3%',
        value: '-10 ₽',
    },
];

export const WithCustomization = (): React.ReactElement => {
    return (
        <CartContainer>
            <CartOrder
                order={{ ...order, deliveryPrice: undefined, discount: undefined, orderDetails }}
                disabled={false}
                additionalInfo="Текст про стоимость доставки, которая зависит от адреса или “заполняя эту форму...”"
                insets={{ bottom: 144 }}
                checkoutButtonContent={CustomCheckoutButtonContent}
                onCheckout={action('onCheckout')}
            />
        </CartContainer>
    );
};
