import React from 'react';
import { Col, Row } from '@sberdevices/plasma-ui';

import { Header } from '../../components';
import { ComponentPropsWithHeader } from '../../components/Header/types';

import { CartOrder } from './components/CartOrder/CartOrder';
import { useCart } from './hooks/useCart';
import { useCartAssistantState } from './hooks/useCartAssistantState';
import { CartItemList } from './components/CartItemList/CartItemList';
import { CartState } from './types';

interface CartPageProps<T extends CartState> extends ComponentPropsWithHeader {
    name?: string;
    emptyCart?: React.ReactElement;
    orderButtonText?: string;
    itemImageBackgroundColor?: string;
    onMakeOrder: (cartState: T) => void;
    onItemClick?: (item: T['items'][number]) => void;
}

export function CartPage<T extends CartState = CartState>({
    header,
    name,
    emptyCart,
    orderButtonText = 'Оформить заказ',
    itemImageBackgroundColor = 'unset',
    onMakeOrder,
    onItemClick,
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
                    <Col sizeXL={6} sizeL={6} sizeM={4} sizeS={4} data-cy="CartPage-items">
                        <CartItemList
                            items={items}
                            currency={currency}
                            onItemClick={onItemClick}
                            itemImageBackgroundColor={itemImageBackgroundColor}
                        />
                    </Col>
                    <Col sizeXL={3.5} offsetXL={2.5} sizeM={2} sizeS={4} data-cy="CartPage-order">
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
