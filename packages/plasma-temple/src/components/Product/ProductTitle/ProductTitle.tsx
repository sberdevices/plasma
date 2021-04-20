import React from 'react';
import { detectDevice } from '@sberdevices/plasma-ui/utils';

import { DeviceFamily } from '../../../types';

import { ProductTitleSberBox } from './ProductTitle@sberbox';
import { ProductTitleSberPortal } from './ProductTitle@sberportal';
import { ProductTitleProps } from './types';

const mapDeviceToProductTitle: Record<DeviceFamily, React.FC<ProductTitleProps>> = {
    sberBox: ProductTitleSberBox,
    sberPortal: ProductTitleSberPortal,
    mobile: ProductTitleSberPortal,
};

export const ProductTitle = mapDeviceToProductTitle[detectDevice()];
