import React from 'react';

import { Insets, AnyObject } from '../../../types';
import { CartState } from '../types';

export interface CartOrderProps<ID = unknown, T extends AnyObject = AnyObject> {
    /* Информация о заказе */
    order: { amount: number } & Partial<CartState<ID, T>>;
    /** Флаг определяющий возможность перейти к оформлению заказа */
    disabled?: boolean;
    /** Кастомный контент для кнопки оформления заказа */
    checkoutButtonContent?: React.ReactNode;
    /**
     * Отступы вокруг корзины, на текущий момент используется только отступ снизу, для позиционирования
     * кнопки `Оформить заказ`. Если отступ не передан, то кнопка не фиксируется
     */
    insets?: Partial<Insets>;
    /** Дополнительная информация к заказу */
    additionalInfo?: React.ReactNode;
    /** Колбэк вызываемый при клике по кнопке `Оформить заказ` */
    onCheckout: () => void;
}

export const CheckoutButtonContent: React.FC<{ content?: React.ReactNode }> = ({ content }) => (
    <>{content ?? 'Оформить заказ'}</>
);
