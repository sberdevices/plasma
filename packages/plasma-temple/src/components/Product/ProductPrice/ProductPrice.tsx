import React from 'react';
import { detectDevice } from '@sberdevices/plasma-ui/utils';

import { DeviceFamily } from '../../../types';

import { ProductPriceSberBox } from './ProductPrice@sberbox';
import { ProductPriceSberPortal } from './ProductPrice@sberportal';
import { ProductPriceProps } from './types';

const mapDeviceToProductPrice: Record<DeviceFamily, React.FC<ProductPriceProps>> = {
    sberBox: ProductPriceSberBox,
    sberPortal: ProductPriceSberPortal,
    mobile: ProductPriceSberPortal,
};

export const ProductPrice = mapDeviceToProductPrice[detectDevice()];
