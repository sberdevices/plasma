import React from 'react';

import { useGetMutableValue } from '../../../../hooks/useGetMutableValue';
import {
    CartItem,
    CartState,
    CartStateItem,
    OnAddCartItemFn,
    OnChangeCartItemQuantityFn,
    OnRemoveCartItemFn,
    OnChangeCartFn,
} from '../../types';

import { CartContext, CartContextValue, getInitialState } from './CartContext';

interface CartProviderProps<T extends CartState = CartState> {
    initialState?: T;
    dropItemIfQuantityZero?: boolean;
    /**
     * @deprecated instead use onChangeCart
     */
    onAddItem?: OnAddCartItemFn<T>;
    /**
     * @deprecated instead use onChangeCart
     */
    onChangeItemQuantity?: OnChangeCartItemQuantityFn<T>;
    /**
     * @deprecated instead use onChangeCart
     */
    onRemoveItem?: OnRemoveCartItemFn<T>;
    /**
     * @deprecated instead use onChangeCart
     */
    onClearCart?: () => void;
    onChangeCart?: OnChangeCartFn<T>;
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
    onChangeCart,
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

    const handleChangeCart = React.useCallback(
        async (params: Omit<Parameters<OnChangeCartFn<T>>[0], 'changeState'>) => {
            const { state: newState, event } = params;

            setState(newState);
            onChangeCart?.({ ...params, changeState: setState });

            switch (event.type) {
                case 'addItem':
                    onAddItem?.({ state: newState, item: event.item, changeState: setState });
                    break;
                case 'changeItemQuantity':
                    onChangeItemQuantity?.({ state: newState, item: event.item, changeState: setState });
                    break;
                case 'removeItem':
                    onRemoveItem?.({ state: newState, item: event.item, changeState: setState });
                    break;
                case 'clearCart':
                    onClearCart?.();
                    break;
                default:
            }
        },
        [],
    );

    const removeItem = React.useCallback(
        (id: CartStateItem<T>['id']) => {
            const currentState = getState();
            const cartItem = currentState.items.find((item) => item.id === id);
            const updatedItems = currentState.items.filter((item) => item.id !== id);
            const newState = { ...currentState, items: updatedItems, ...updateCartQuantityAndAmount(updatedItems) };

            if (cartItem) {
                handleChangeCart({
                    state: newState,
                    event: { type: 'removeItem', item: cartItem },
                });
            }
        },
        [getState, handleChangeCart],
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

            handleChangeCart({
                state: newState,
                event: { type: 'changeItemQuantity', item: cartItem },
            });
        },
        [dropItemIfQuantityZero, getState, isOverQuantityLimit, handleChangeCart, removeItem],
    );

    const addItem = React.useCallback(
        (newItem: CartStateItem<T>) => {
            const currentState = getState();
            const { items } = currentState;

            const itemIndex = items.findIndex(({ id }) => newItem.id === id);

            if (itemIndex > -1) {
                changeItemQuantity(newItem.id, newItem.quantity);
                return;
            }

            if (isOverQuantityLimit(newItem.quantity)) {
                return;
            }

            const updatedItems = items.concat(newItem);
            const newState = {
                ...currentState,
                items: updatedItems,
                ...updateCartQuantityAndAmount(updatedItems),
            };

            handleChangeCart({
                state: newState,
                event: { type: 'addItem', item: newItem },
            });
        },
        [changeItemQuantity, getState, isOverQuantityLimit, handleChangeCart],
    );

    const clearCart = React.useCallback(() => {
        const newState = { ...getState(), items: [], amount: 0, quantity: 0 };

        handleChangeCart({
            state: newState,
            event: { type: 'clearCart' },
        });
    }, [getState, handleChangeCart]);

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
