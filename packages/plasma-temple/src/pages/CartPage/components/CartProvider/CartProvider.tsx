import React from 'react';

import { useGetMutableValue } from '../../../../hooks/useGetMutableValue';
import { Currency } from '../../../../types';
import { CartItem, ChangeItemQuantityFn } from '../../types';

import { CartContext } from './CartContext';

interface CartProviderProps {
    currency?: Currency;
    defaultCartItems?: CartItem[];
    quantityLimit?: number;
}

const updateCartItemByIndex = (items: CartItem[], cartItem: CartItem, index: number) =>
    items.slice(0, index).concat(cartItem, items.slice(index + 1));

export const CartProvider: React.FC<React.PropsWithChildren<CartProviderProps>> = ({
    currency,
    defaultCartItems = [],
    quantityLimit,
    children,
}) => {
    const [cartItems, setCartItems] = React.useState<CartItem[]>(defaultCartItems);

    const { quantity: cartQuantity, price: cartAmount } = React.useMemo(
        () =>
            cartItems.reduce(
                (acc, item) => ({
                    quantity: acc.quantity + item.quantity,
                    price: acc.price + item.price * item.quantity,
                }),
                { quantity: 0, price: 0 },
            ),
        [cartItems],
    );

    const getItems = useGetMutableValue(cartItems);
    const getCartQuantity = useGetMutableValue(cartQuantity);

    const isOverQuantityLimit = React.useCallback(
        (plusQuantity: number) => {
            const allQuantity = getCartQuantity();
            return Boolean(quantityLimit && plusQuantity + allQuantity > quantityLimit);
        },
        [getCartQuantity, quantityLimit],
    );

    const addItem = React.useCallback(
        (newItem: CartItem) => {
            const items = getItems();
            const itemIndex = items.findIndex(({ id }) => newItem.id === id);

            if (isOverQuantityLimit(newItem.quantity)) {
                return;
            }

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
        [getItems, isOverQuantityLimit],
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

            if (isOverQuantityLimit(newQuantity - items[itemIndex].quantity)) {
                return;
            }

            setCartItems(
                updateCartItemByIndex(items, { ...items[itemIndex], quantity: Math.max(0, newQuantity) }, itemIndex),
            );
        },
        [getItems, isOverQuantityLimit],
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
            isOverQuantityLimit,
            quantity: cartQuantity,
            price: cartAmount,
            quantityLimit,
        }),
        [
            cartItems,
            currency,
            addItem,
            removeItem,
            changeItemQuantity,
            clearCart,
            isOverQuantityLimit,
            cartQuantity,
            cartAmount,
            quantityLimit,
        ],
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
