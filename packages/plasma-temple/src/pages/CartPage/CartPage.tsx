import React from 'react';
import { Col, Row } from '@sberdevices/plasma-ui';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';

import { Header } from '../../components';

import { CartOrder } from './components/CartOrder/CartOrder';
import { useCart } from './hooks/useCart';
import { useCartAssistantState } from './hooks/useCartAssistantState';
import { CartItemList } from './components/CartItemList/CartItemList';
import { CartItem, CartState } from './types';

interface CartPageProps<T extends CartState> {
    header?: HeaderProps;
    name?: string;
    emptyCart?: React.ReactElement;
    orderButtonText?: string;
    onMakeOrder: (cartState: T) => void;
}

export function CartPage<T extends CartState = CartState>({
    header,
    name,
    emptyCart,
    orderButtonText = 'Оформить заказ',
    onMakeOrder,
    children,
}: React.PropsWithChildren<CartPageProps<T>>): React.ReactElement {
    const { state } = useCart<T>();
    const { items, amount, currency, deliveryPrice, minDeliveryPrice = 0, discount } = state;

    const handleMakeOrder = React.useCallback(() => onMakeOrder(state), [onMakeOrder, state]);

    useCartAssistantState(items, name);

    return (
        <>
            {header && <Header title="Корзина" {...header} />}
            {!items.length && emptyCart ? (
                emptyCart
            ) : (
                <Row>
                    <Col sizeXL={6} sizeM={4} sizeS={4}>
                        <CartItemList items={(items as unknown) as CartItem[]} currency={currency} />
                    </Col>
                    <Col sizeXL={3.5} offsetXL={2.5} sizeM={2} sizeS={4}>
                        <CartOrder
                            amount={amount}
                            deliveryPrice={deliveryPrice}
                            minDeliveryPrice={minDeliveryPrice}
                            currency={currency}
                            discount={discount}
                            disabled={!items.length}
                            orderButtonText={orderButtonText}
                            onMakeOrder={handleMakeOrder}
                        >
                            {children}
                        </CartOrder>
                    </Col>
                </Row>
            )}
        </>
    );
}
