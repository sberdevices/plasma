import React from 'react';

import { DeviceComponent } from '../DeviceComponent/DeviceComponent';

import { ProductCommon, ProductProps } from './Product@common';
import { ProductMobile } from './Product@mobile';

/** Компонент страницы товара (без заголовка) */
export const Product: React.FC<ProductProps> = (props) => (
    <DeviceComponent sberbox={ProductCommon} sberportal={ProductCommon} mobile={ProductMobile} props={props} />
);
