import React from 'react';

import { useGetMutableValue } from '../../../../hooks/useGetMutableValue';
import { Currency } from '../../../../types';
import { CartItem, ChangeItemQuantityFn } from '../../types';

import { CartContext } from './CartContext';

interface CartProviderProps {
    currency?: Currency;
    defaultCartItems?: CartItem[];
}

const updateCartItemByIndex = (items: CartItem[], cartItem: CartItem, index: number) =>
    items.slice(0, index).concat(cartItem, items.slice(index + 1));

export const CartProvider: React.FC<React.PropsWithChildren<CartProviderProps>> = ({
    currency,
    defaultCartItems = [],
    children,
}) => {
    const [cartItems, setCartItems] = React.useState<CartItem[]>(defaultCartItems);
    const getItems = useGetMutableValue(cartItems);

    const addItem = React.useCallback(
        (newItem: CartItem) => {
            const items = getItems();
            const itemIndex = items.findIndex(({ id }) => newItem.id === id);

            const updatedItems =
                itemIndex === -1
                    ? items.concat(newItem)
                    : updateCartItemByIndex(
                          items,
                          { ...newItem, quantity: Math.max(0, newItem.quantity + items[itemIndex].quantity) },
                          itemIndex,
                      );

            setCartItems(updatedItems);
        },
        [getItems],
    );

    const removeItem = React.useCallback(
        (id: CartItem['id']) => setCartItems(getItems().filter((item) => item.id !== id)),
        [getItems],
    );

    const changeItemQuantity = React.useCallback<ChangeItemQuantityFn>(
        (id, newQuantity) => {
            const items = getItems();

            const itemIndex = items.findIndex((cartItem) => cartItem.id === id);

            if (itemIndex === -1) {
                return;
            }

            setCartItems(
                updateCartItemByIndex(items, { ...items[itemIndex], quantity: Math.max(0, newQuantity) }, itemIndex),
            );
        },
        [getItems],
    );

    const clearCart = React.useCallback(() => setCartItems([]), []);

    const value = React.useMemo(
        () => ({
            items: cartItems,
            currency,
            addItem,
            removeItem,
            changeItemQuantity,
            clearCart,
            ...cartItems.reduce(
                (acc, item) => ({
                    quantity: acc.quantity + item.quantity,
                    price: acc.price + item.price * item.quantity,
                }),
                { quantity: 0, price: 0 },
            ),
        }),
        [cartItems, currency, addItem, removeItem, changeItemQuantity, clearCart],
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
