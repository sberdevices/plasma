import React from 'react';

import { useGetMutableValue } from '../../../../hooks/useGetMutableValue';
import { AnyObject, Currency } from '../../../../types';
import { CartItem, CartState, ChangeItemQuantityFn, ChangeStateFn } from '../../types';

import { CartContext, CartContextValue, getInitialState } from './CartContext';

interface CartProviderProps<ID = string, T extends AnyObject = AnyObject> {
    currency?: Currency;
    initialState?: CartState<ID, T>;
    quantityLimit?: number;
    onAddItem?: (args: { item: CartItem<ID, T>; state: CartState<ID, T>; changeState: ChangeStateFn<ID, T> }) => void;
    onChangeQuantity?: (args: {
        item: CartItem<ID, T>;
        state: CartState<ID, T>;
        changeState: ChangeStateFn<ID, T>;
    }) => void;
    onRemoveItem?: (args: {
        item: CartItem<ID, T>;
        state: CartState<ID, T>;
        changeState: ChangeStateFn<ID, T>;
    }) => void;
    onClearCart?: () => void;
}

function updateCartItemByIndex<ID = string, T extends AnyObject = AnyObject>(
    items: CartItem<ID, T>[],
    cartItem: CartItem<ID, T>,
    index: number,
) {
    return items.slice(0, index).concat(cartItem, items.slice(index + 1));
}

function updateCartQuantityAndAmount<ID = string, T extends AnyObject = AnyObject>(
    items: CartItem<ID, T>[],
): { quantity: number; amount: number } {
    const { quantity, amount } = items.reduce(
        (acc, item) => ({
            quantity: acc.quantity + item.quantity,
            amount: acc.amount + (item.present ? 0 : item.price * item.quantity),
        }),
        { quantity: 0, amount: 0 },
    );

    return {
        quantity,
        amount,
    };
}

export function CartProvider<ID = string, T extends AnyObject = AnyObject>({
    initialState = getInitialState<ID, T>(),
    children,
    onAddItem,
    onChangeQuantity,
    onRemoveItem,
    onClearCart,
}: React.PropsWithChildren<CartProviderProps<ID, T>>): React.ReactElement {
    const [state, setState] = React.useState(initialState);

    const getState = useGetMutableValue(state);

    const isOverQuantityLimit = React.useCallback(
        (plusQuantity: number) => {
            const { quantity: cartQuantity, quantityLimit } = getState();
            return Boolean(quantityLimit && plusQuantity + cartQuantity > quantityLimit);
        },
        [getState],
    );

    const changeItemQuantity = React.useCallback<ChangeItemQuantityFn<ID>>(
        (id, newQuantity) => {
            const currentState = getState();
            const { items } = currentState;

            const itemIndex = items.findIndex((cartItem) => cartItem.id === id);

            if (itemIndex === -1) {
                return;
            }

            if (isOverQuantityLimit(newQuantity - items[itemIndex].quantity)) {
                return;
            }

            const quantity = Math.min(Math.max(0, newQuantity), items[itemIndex].quantityLimit ?? Infinity);
            const cartItem = { ...items[itemIndex], quantity };
            const updatedItems = updateCartItemByIndex(items, cartItem, itemIndex);

            const newState = {
                ...currentState,
                items: updatedItems,
                ...updateCartQuantityAndAmount(updatedItems),
            };

            setState(newState);

            onChangeQuantity?.({ item: cartItem, state: newState, changeState: setState });
        },
        [getState, isOverQuantityLimit, onChangeQuantity, setState],
    );

    const addItem = React.useCallback(
        (newItem: CartItem<ID, T>) => {
            const currentState = getState();
            const { items } = currentState;

            const itemIndex = items.findIndex(({ id }) => newItem.id === id);

            if (isOverQuantityLimit(newItem.quantity)) {
                return;
            }

            if (itemIndex > -1) {
                changeItemQuantity(newItem.id, newItem.quantity);
                return;
            }

            const updatedItems = items.concat(newItem);
            const newState = {
                ...currentState,
                items: updatedItems,
                ...updateCartQuantityAndAmount(updatedItems),
            };

            setState(newState);
            onAddItem?.({ item: newItem, state: newState, changeState: setState });
        },
        [changeItemQuantity, getState, isOverQuantityLimit, onAddItem, setState],
    );

    const removeItem = React.useCallback(
        (id: ID) => {
            const currentState = getState();
            const cartItem = currentState.items.find((item) => item.id === id);
            const updatedItems = currentState.items.filter((item) => item.id !== id);
            const newState = { ...currentState, items: updatedItems };

            setState(newState);

            if (cartItem) {
                onRemoveItem?.({ item: cartItem, state: newState, changeState: setState });
            }
        },
        [getState, onRemoveItem, setState],
    );

    const clearCart = React.useCallback(() => {
        setState({ ...getState(), items: [], amount: 0, quantity: 0 });
        onClearCart?.();
    }, [getState, onClearCart, setState]);

    const value = React.useMemo(
        () => ({
            state,
            changeState: setState,
            addItem,
            removeItem,
            changeItemQuantity,
            clearCart,
            isOverQuantityLimit,
        }),
        [addItem, changeItemQuantity, clearCart, isOverQuantityLimit, removeItem, state],
    );

    return <CartContext.Provider value={(value as unknown) as CartContextValue}>{children}</CartContext.Provider>;
}
