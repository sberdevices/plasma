import React from 'react';
import { detectDevice, DeviceKind } from '@sberdevices/plasma-ui/utils';

import { ExpandableProductDetailsCommon, ExpandableProductDetailsProps } from './ExpandableProductDetails@common';
import { ExpandableProductDetailsMobile } from './ExpandableProductDetails@mobile';

const mapDeviceToExpandableProductDetails: Record<DeviceKind, React.FC<ExpandableProductDetailsProps>> = {
    sberBox: ExpandableProductDetailsCommon,
    sberPortal: ExpandableProductDetailsCommon,
    mobile: ExpandableProductDetailsMobile,
};

/**
 * Компонент для отображения деталей (характеристик) товара
 * с возможность по умолчанию скрывать часть характеристик
 * Актуален для устройств с пультом и SberPortal
 */
export const ExpandableProductDetails = mapDeviceToExpandableProductDetails[detectDevice()];
