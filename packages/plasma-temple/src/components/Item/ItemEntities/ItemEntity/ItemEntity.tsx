import React from 'react';
import { detectDevice, DeviceKind } from '@sberdevices/plasma-ui/utils';

import { ItemEntityCommon, ItemEntityProps } from './ItemEntity@common';
import { ItemEntityMobile } from './ItemEntity@mobile';

const mapDeviceToItemEntity: Record<DeviceKind, React.FC<ItemEntityProps>> = {
    sberBox: ItemEntityCommon,
    sberPortal: ItemEntityCommon,
    mobile: ItemEntityMobile,
};

/** Компонент, используемый для отображения карточки */
export const ItemEntity = mapDeviceToItemEntity[detectDevice()] as typeof ItemEntityCommon;
