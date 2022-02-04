import React from 'react';
import { action } from '@storybook/addon-actions';

import { Cart } from './Cart';
import { CartProvider } from './CartProvider/CartProvider';
import { CartState, OrderDetails } from './types';
import { CustomCartItem, items } from './CartItemList/CartItemList.stories';
import { CustomCheckoutButtonContent } from './CartOrder/CartOrder.stories';

export default {
    title: 'Cart/Cart',
    parameters: {
        ignoreInsets: true,
    },
};

const initialState: CartState = {
    items,
    currency: 'rub',
    quantity: 109,
    amount: 7412,
};

const CartContainer: React.FC<React.PropsWithChildren<{ initialCartState?: CartState }>> = ({
    initialCartState = initialState,
    children,
}) => (
    <CartProvider initialState={initialCartState} onChangeCart={action('onChangeCart')}>
        <div style={{ height: '100vh' }}>{children}</div>
    </CartProvider>
);

export const Default = (): React.ReactElement => {
    return (
        <CartContainer>
            <Cart
                onCheckout={action('onCheckout')}
                insets={{ bottom: 72 }}
                defaultItemImage="images/placeholder.png"
                additionalInfo="Текст про стоимость доставки, которая зависит от адреса или “заполняя эту форму...”"
            />
        </CartContainer>
    );
};

export const WithDiscountAndDelivery = (): React.ReactElement => {
    return (
        <CartContainer initialCartState={{ ...initialState, discount: 107, deliveryPrice: 500 }}>
            <div style={{ height: '100vh' }}>
                <Cart
                    onCheckout={action('onCheckout')}
                    insets={{ bottom: 72 }}
                    defaultItemImage="images/placeholder.png"
                    additionalInfo="Текст про стоимость доставки, которая зависит от адреса или “заполняя эту форму...”"
                />
            </div>
        </CartContainer>
    );
};

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
        <CartContainer initialCartState={{ ...initialState, orderDetails }}>
            <Cart
                onCheckout={action('onCheckout')}
                insets={{ bottom: 72 }}
                defaultItemImage="images/placeholder.png"
                additionalInfo="Текст про стоимость доставки, которая зависит от адреса или “заполняя эту форму...”"
                cartItemComponent={CustomCartItem}
                checkoutButtonContent={CustomCheckoutButtonContent}
            />
        </CartContainer>
    );
};
