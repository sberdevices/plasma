import React from 'react';
import { detectDevice, DeviceKind } from '@sberdevices/plasma-ui/utils';

import { ProductInfoCommon, ProductInfoProps } from './ProductInfo@common';
import { ProductInfoMobile } from './ProductInfo@mobile';

const mapDeviceToProductInfo: Record<DeviceKind, React.FC<ProductInfoProps>> = {
    sberBox: ProductInfoCommon,
    sberPortal: ProductInfoCommon,
    mobile: ProductInfoMobile,
};

/**
 * Компонент для отображения информации (описания) о товаре
 * Актуален для устройств с пультом и SberPortal
 */
export const ProductInfo = mapDeviceToProductInfo[detectDevice()];
