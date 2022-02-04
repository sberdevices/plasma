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
        /** Количество товара в корзине */
        quantity: number;
        /** Цена товара */
        price: number;
        /** Старая цена товара */
        oldPrice?: number;
        /** Скидка на товар. По умолчанию свойство в компоненте Cart не используется */
        discount?: number;
        /** Скидка на товар в процентах. По умолчанию свойство в компоненте Cart не используется */
        percentDiscount?: number;
        /** Используется как метка над именем товара при отображении в корзине */
        label?: string;
        /**
         * Используется как подпись позиции товара для указания дополнительной информации,
         * например скидки, изменении цены
         */
        caption?: CartItemCaptionType;
        /**
         * Используется как дополнительная информация о товаре, обычно для
         * указания веса, объема, размера
         */
        nameDetails?: string;
        /** Ссылка на изоражение товара */
        imageSrc?: string;
        /** Флаг, указывающий на то, что товар идет в подарок */
        present?: boolean;
        /** Максимальное количество товара, которое возможно добавить в корзину */
        quantityLimit?: number;
        /**
         * Флаг указывающий на недоступность товара для покупки,
         * в данном случае товар можно только удалить из корзины
         */
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
    /** Список товаров в корзине */
    items: CartItemType<ID, T>[];
    /** Валюта корзины */
    currency: Currency;
    /** Количество пощиций в корзине */
    quantity: number;
    /** Сумма корзины */
    amount: number;
    /** Сумма корзины без учета скидки */
    oldAmount?: number;
    /** Максимальное количество товаров, которое возможно добавить в корзину */
    quantityLimit?: number;
    /** Минимальная цена доставки */
    minDeliveryPrice?: number;
    /** Цена доставки */
    deliveryPrice?: number;
    /** Скидка */
    discount?: number;
    /** Скидка в процентах */
    percentDiscount?: number;
    /** Промокод */
    promoCode?: string;
    /** Информация о деталях заказа, например о доставке, скидке, минимальной сумме для оформления заказа */
    orderDetails?: OrderDetails[];
}

export type CartStateItem<T extends CartState> = T['items'][number];
