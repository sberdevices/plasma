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

export type ChangeItemQuantityFn<ID = string> = (id: ID, quantity: number) => void;
export type ChangeStateFn<ID = string, T extends AnyObject = AnyObject> = (state: CartState<ID, T>) => void;

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
