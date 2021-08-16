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

export type ChangeStateFn<T extends CartState> = (state: T) => void;

export type OnAddCartItemFn<T extends CartState> = (args: {
    item: CartStateItem<T>;
    state: T;
    changeState: ChangeStateFn<T>;
}) => void;

export type OnChangeCartItemQuantityFn<T extends CartState> = (args: {
    item: CartStateItem<T>;
    state: T;
    changeState: ChangeStateFn<T>;
}) => void;

export type OnRemoveCartItemFn<T extends CartState> = (args: {
    item: CartStateItem<T>;
    state: T;
    changeState: ChangeStateFn<T>;
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
