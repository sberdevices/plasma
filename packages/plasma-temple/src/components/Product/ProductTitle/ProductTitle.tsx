import React from 'react';
import { detectDevice, DeviceKind } from '@sberdevices/plasma-ui/utils';

import { ProductTitleSberBox } from './ProductTitle@sberbox';
import { ProductTitleSberPortal } from './ProductTitle@sberportal';
import { ProductTitleMobile } from './ProductTitle@mobile';
import { ProductTitleProps } from './types';

const mapDeviceToProductTitle: Record<DeviceKind, React.FC<ProductTitleProps>> = {
    sberBox: ProductTitleSberBox,
    sberPortal: ProductTitleSberPortal,
    mobile: ProductTitleMobile,
};

/** Заголовок товара на странице товара */
export const ProductTitle = mapDeviceToProductTitle[detectDevice()];
