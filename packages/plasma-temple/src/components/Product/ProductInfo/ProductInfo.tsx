import React from 'react';

import { DeviceComponent } from '../../DeviceComponent/DeviceComponent';

import { ProductInfoCommon, ProductInfoProps } from './ProductInfo@common';
import { ProductInfoMobile } from './ProductInfo@mobile';

/**
 * Компонент для отображения информации (описания) о товаре
 */
export const ProductInfo: React.FC<ProductInfoProps> = (props) => (
    <DeviceComponent
        sberbox={ProductInfoCommon}
        sberportal={ProductInfoCommon}
        mobile={ProductInfoMobile}
        props={props}
    />
);
