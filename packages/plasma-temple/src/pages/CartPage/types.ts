import { AnyObject, Currency, Entity } from '../../types';

export type CartItem<ID = string, T extends AnyObject = AnyObject> = Entity<ID> &
    T & {
        quantity: number;
        price: number;
        nameDetails?: string;
        imageSrc?: string;
        present?: boolean;
        quantityLimit?: number;
    };

export interface OnAddCartItemEvent<T extends CartState> {
    type: 'addItem';
    item: CartStateItem<T>;
}

export interface OnChangeCartItemQuantityEvent<T extends CartState> {
    type: 'changeItemQuantity';
    item: CartStateItem<T>;
}

export interface OnRemoveCartItemEvent<T extends CartState> {
    type: 'removeItem';
    item: CartStateItem<T>;
}

export interface ClearCartEvent {
    type: 'clearCart';
}

export type ChangeStateFn<T extends CartState> = (state: T) => void;

export type OnChangeCartFn<T extends CartState> = (args: {
    state: T;
    changeState: ChangeStateFn<T>;
    event: OnAddCartItemEvent<T> | OnChangeCartItemQuantityEvent<T> | OnRemoveCartItemEvent<T> | ClearCartEvent;
}) => void;

export interface CartState<ID = string, T extends AnyObject = AnyObject> {
    items: CartItem<ID, T>[];
    currency: Currency;
    quantity: number;
    amount: number;
    quantityLimit?: number;
    minDeliveryPrice?: number;
    deliveryPrice?: number;
    discount?: number;
}

export type CartStateItem<T extends CartState> = T['items'][0];
