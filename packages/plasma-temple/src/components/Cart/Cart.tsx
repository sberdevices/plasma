import React from 'react';

import { DeviceComponent } from '../DeviceComponent/DeviceComponent';

import { CartComponent, CartProps } from './Cart@common';
import { CartMobile } from './Cart@mobile';
import { CartSberBox } from './Cart@sberbox';
import { CartSberPortal } from './Cart@sberportal';

/**
 * Компонент корзины товаров.
 * Используется в связке с компонентом `CartProvider` и должен быть ниже `CartProvider` в дереве компонентов
 */
export const Cart: CartComponent = (props) => (
    <DeviceComponent sberbox={CartSberBox} sberportal={CartSberPortal} mobile={CartMobile} props={props as CartProps} />
);
