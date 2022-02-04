import { AnyObject, Currency, Entity } from '../../types';

export type CaptionType =
    | 'sold-out'
    | 'few-left'
    | 'sale'
    | 'price-changed'
    | 'you-want'
    | 'warning'
    | 'critical'
    | 'accent'
    | 'present';

export interface CartItemCaptionType {
    type: CaptionType;
    content?: string;
}

export type CartItemType<ID = unknown, T extends AnyObject = AnyObject> = Entity<ID> &
    T & {
        quantity: number;
        price: number;
        oldPrice?: number;
        discount?: number;
        percentDiscount?: number;
        label?: string;
        caption?: CartItemCaptionType;
        nameDetails?: string;
        imageSrc?: string;
        present?: boolean;
        quantityLimit?: number;
        disabled?: boolean;
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
    changeState: (state: T) => void;
    event: OnAddCartItemEvent<T> | OnChangeCartItemQuantityEvent<T> | OnRemoveCartItemEvent<T> | ClearCartEvent;
}) => void;

/**
 * @deprecated
 */
export type OnAddCartItemFn<T extends CartState> = (args: {
    item: CartStateItem<T>;
    state: T;
    changeState: ChangeStateFn<T>;
}) => void;

/**
 * @deprecated
 */
export type OnChangeCartItemQuantityFn<T extends CartState> = (args: {
    item: CartStateItem<T>;
    state: T;
    changeState: ChangeStateFn<T>;
}) => void;

/**
 * @deprecated
 */
export type OnRemoveCartItemFn<T extends CartState> = (args: {
    item: CartStateItem<T>;
    state: T;
    changeState: ChangeStateFn<T>;
}) => void;

export interface OrderDetails {
    type: 'accent' | 'warning' | 'critical' | 'primary';
    name: string;
    value?: string;
}
export interface CartState<ID = unknown, T extends AnyObject = AnyObject> {
    items: CartItemType<ID, T>[];
    currency: Currency;
    quantity: number;
    amount: number;
    oldAmount?: number;
    quantityLimit?: number;
    minDeliveryPrice?: number;
    deliveryPrice?: number;
    discount?: number;
    percentDiscount?: number;
    promoCode?: string;
    orderDetails?: OrderDetails[];
}

export type CartStateItem<T extends CartState> = T['items'][number];
