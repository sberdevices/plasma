import React from 'react';
import { detectDevice } from '@sberdevices/plasma-ui/utils';

import { DeviceFamily } from '../../../types';

import { ProductDescriptionSberBox } from './ProductDescription@sbrebox';
import { ProductDescriptionSberPortal } from './ProductDescription@sbrebportal';
import { ProductDescriptionMobile } from './ProductDescription@mobile';
import { ProductDescriptionProps } from './types';

const mapDeviceToProductDescription: Record<DeviceFamily, React.FC<ProductDescriptionProps>> = {
    sberBox: ProductDescriptionSberBox,
    sberPortal: ProductDescriptionSberPortal,
    mobile: ProductDescriptionMobile,
};

/** @deprecated use ProductDetails */
export const ProductDescription = mapDeviceToProductDescription[detectDevice()];
