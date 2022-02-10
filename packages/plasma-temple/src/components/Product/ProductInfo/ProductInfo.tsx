import React from 'react';
import { detectDevice, DeviceKind } from '@sberdevices/plasma-ui/utils';

import { ProductInfoCommon, ProductInfoProps } from './ProductInfo@common';
import { ProductInfoMobile } from './ProductInfo@mobile';

const mapDeviceToProductInfo: Record<DeviceKind, React.FC<ProductInfoProps>> = {
    sberBox: ProductInfoCommon,
    sberPortal: ProductInfoCommon,
    mobile: ProductInfoMobile,
};

export const ProductInfo = mapDeviceToProductInfo[detectDevice()];
