import React from 'react';
import { detectDevice, DeviceKind } from '@sberdevices/plasma-ui/utils';

import { ProductCommon, ProductProps } from './Product@common';
import { ProductMobile } from './Product@mobile';

const mapDeviceToProduct: Record<DeviceKind, React.FC<ProductProps>> = {
    sberBox: ProductCommon,
    sberPortal: ProductCommon,
    mobile: ProductMobile,
};

export const Product = mapDeviceToProduct[detectDevice()];
