import { Currency, Entity } from '../../types';

export interface CartItem<ID = string | number> extends Entity<ID> {
    quantity: number;
    price: number;
    nameDetails?: string;
    imageSrc?: string;
}

export type ChangeItemQuantityFn<ID = string | number> = (id: ID, quantity: number) => void;

export interface Order<ID = string | number> {
    items: CartItem<ID>[];
    price: number;
    quantity: number;
    currency?: Currency;
    minDeliveryPrice?: number;
}

export interface Cart<ID = string | number> extends Order<ID> {
    addItem: (item: CartItem) => void;
    removeItem: (id: ID) => void;
    changeItemQuantity: ChangeItemQuantityFn<ID>;
    clearCart: () => void;
}
