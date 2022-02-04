import React from 'react';

import { Insets, AnyObject } from '../../../types';
import { CartState } from '../types';

export interface CartOrderProps<ID = unknown, T extends AnyObject = AnyObject> {
    order: { amount: number } & Partial<CartState<ID, T>>;
    disabled?: boolean;
    checkoutButtonContent?: React.ReactNode;
    insets?: Partial<Insets>;
    additionalInfo?: React.ReactNode;
    onCheckout: () => void;
}

export const CheckoutButtonContent: React.FC<{ content?: React.ReactNode }> = ({ content }) => (
    <>{content ?? 'Оформить заказ'}</>
);
