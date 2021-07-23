import React from 'react';
import { CartPage, EmptyCart, Order, useAssistantOnSmartAppData, useCart } from '@sberdevices/plasma-temple';

import { ActionType, AssistantDataAction, PageComponentProps, ServerAction, ServerActionType } from '../../types';
import { useAssistantState } from '../../hooks/useAssistantState';

export const Cart: React.FC<PageComponentProps<'cart'>> = ({ assistant, name, header, pushScreen, pushHistory }) => {
    const {
        items,
        price,
        quantity,
        currency,
        minDeliveryPrice,
        isOverQuantityLimit,
        quantityLimit,
        addItem,
        removeItem,
        clearCart,
    } = useCart();

    const onMakeOrder = React.useCallback(
        (order: Order) => {
            pushHistory('makeOrder', order);
        },
        [pushHistory],
    );

    useAssistantState({
        screen: name,
        items: items.map((item, index) => ({
            title: item.name,
            number: index + 1,
            id: String(item.id),
            action: {
                type: ActionType.OPEN_ITEM,
                payload: { ...item },
            },
        })),
    });

    useAssistantOnSmartAppData<AssistantDataAction>((action) => {
        if (!action || !items.length) {
            return;
        }

        switch (action.type) {
            case ActionType.ADD_TO_CART: {
                const { quantity: qty } = action.payload;

                if (isOverQuantityLimit(qty)) {
                    assistant?.sendAction<ServerAction>({
                        type: ServerActionType.CART_QUANTITY_LIMIT,
                        payload: { limit: quantityLimit },
                    });
                    return;
                }

                addItem({ ...items[0], quantity: qty });

                assistant?.sendAction<ServerAction>({
                    type: ServerActionType.DONE_ADD_TO_CART,
                    payload: { quantity: action.payload.quantity },
                });
                return;
            }
            case ActionType.REMOVE_FROM_CART: {
                removeItem(items[0].id);

                assistant?.sendAction<ServerAction>({
                    type: ServerActionType.DONE_REMOVE_FROM_CART,
                    payload: {},
                });
                return;
            }
            case ActionType.CLEAR_CART: {
                clearCart();

                assistant?.sendAction<ServerAction>({
                    type: ServerActionType.DONE_CLEAR_CART,
                    payload: {},
                });
                return;
            }
            case ActionType.MAKE_ORDER: {
                onMakeOrder({ items, price, quantity, currency, minDeliveryPrice });
                break;
            }
            default:
        }
    });

    return (
        <CartPage
            header={{ ...header, logo: '', title: 'Корзина', children: null }}
            name={name}
            onMakeOrder={onMakeOrder}
            emptyCart={<EmptyCart imageSrc="/images/cubic.png" onGoToCatalog={() => pushScreen('catalog')} />}
        />
    );
};
