import React from 'react';

import { useGetMutableValue } from '../../../../hooks/useGetMutableValue';
import {
    CartItem,
    CartState,
    CartStateItem,
    OnAddCartItemFn,
    OnChangeCartItemQuantityFn,
    OnRemoveCartItemFn,
} from '../../types';

import { CartContext, CartContextValue, getInitialState } from './CartContext';

interface CartProviderProps<T extends CartState = CartState> {
    initialState?: T;
    dropItemIfQuantityZero?: boolean;
    onAddItem?: OnAddCartItemFn<T>;
    onChangeItemQuantity?: OnChangeCartItemQuantityFn<T>;
    onRemoveItem?: OnRemoveCartItemFn<T>;
    onClearCart?: () => void;
}

function updateCartItemByIndex<T extends CartItem>(items: T[], cartItem: T, index: number) {
    return items.slice(0, index).concat(cartItem, items.slice(index + 1));
}

function updateCartQuantityAndAmount<T extends CartItem>(items: T[]): { quantity: number; amount: number } {
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

export function CartProvider<T extends CartState = CartState>({
    initialState = getInitialState<T>(),
    children,
    dropItemIfQuantityZero,
    onAddItem,
    onChangeItemQuantity,
    onRemoveItem,
    onClearCart,
}: React.PropsWithChildren<CartProviderProps<T>>): React.ReactElement {
    const [state, setState] = React.useState(initialState);

    const getState = useGetMutableValue(state);

    const isOverQuantityLimit = React.useCallback(
        (plusQuantity: number) => {
            const { quantity: cartQuantity, quantityLimit } = getState();
            return Boolean(quantityLimit && plusQuantity + cartQuantity > quantityLimit);
        },
        [getState],
    );

    const removeItem = React.useCallback(
        (id: CartStateItem<T>['id']) => {
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

    const changeItemQuantity = React.useCallback(
        (id: CartStateItem<T>['id'], newQuantity: number) => {
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

            if (dropItemIfQuantityZero && quantity < 1) {
                removeItem(id);
                return;
            }

            const cartItem = { ...items[itemIndex], quantity };
            const updatedItems = updateCartItemByIndex(items, cartItem, itemIndex);

            const newState = {
                ...currentState,
                items: updatedItems,
                ...updateCartQuantityAndAmount(updatedItems),
            };

            setState(newState);

            onChangeItemQuantity?.({ item: cartItem, state: newState, changeState: setState });
        },
        [dropItemIfQuantityZero, getState, isOverQuantityLimit, onChangeItemQuantity, removeItem],
    );

    const addItem = React.useCallback(
        (newItem: CartStateItem<T>) => {
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
