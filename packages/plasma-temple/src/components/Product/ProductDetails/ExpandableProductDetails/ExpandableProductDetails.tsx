import React from 'react';

import { DeviceComponent } from '../../../DeviceComponent/DeviceComponent';

import { ExpandableProductDetailsCommon, ExpandableProductDetailsProps } from './ExpandableProductDetails@common';
import { ExpandableProductDetailsMobile } from './ExpandableProductDetails@mobile';

/**
 * Компонент для отображения деталей (характеристик) товара
 * с возможность по умолчанию скрывать часть характеристик
 */
export const ExpandableProductDetails: React.FC<ExpandableProductDetailsProps> = (props) => (
    <DeviceComponent
        sberbox={ExpandableProductDetailsCommon}
        sberportal={ExpandableProductDetailsCommon}
        mobile={ExpandableProductDetailsMobile}
        props={props}
    />
);
