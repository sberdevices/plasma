import React from 'react';
import { PriceProps } from '@sberdevices/plasma-ui';
import { detectDevice } from '@sberdevices/plasma-ui/utils';

import { DeviceFamily } from '../../../types';

import { ProductPriceSberBox } from './ProductPrice@sberbox';
import { ProductPriceSberPortal } from './ProductPrice@sberportal';

export interface ProductPriceProps extends Omit<PriceProps, 'children'> {
    price: number;
    oldPrice?: number;
    currency?: PriceProps['currency'];
    className?: string;
}

const mapDeviceToProductPrice: Record<DeviceFamily, React.FC<ProductPriceProps>> = {
    sberBox: ProductPriceSberBox,
    sberPortal: ProductPriceSberPortal,
    mobile: ProductPriceSberPortal,
};

export const ProductPrice = mapDeviceToProductPrice[detectDevice()];
