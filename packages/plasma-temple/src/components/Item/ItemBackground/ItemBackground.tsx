import React from 'react';
import { DeviceKind } from '@sberdevices/plasma-ui';

import { deviceFamily } from '../../../utils/deviceFamily';

import { ItemBackgroundCommon, FullScreenBackgroundProps } from './ItemBackground@common';
import { ItemBackgroundMobile } from './ItemBackground@mobile';

export const mapDeviceToCartItem: Record<DeviceKind, React.FC<FullScreenBackgroundProps>> = {
    sberBox: ItemBackgroundCommon,
    sberPortal: ItemBackgroundCommon,
    mobile: ItemBackgroundMobile,
};

/** Компонент, используемый для отображения фона на странице сущности */
export const ItemBackground = mapDeviceToCartItem[deviceFamily];
