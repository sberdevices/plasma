import React from 'react';
import { detectDevice, DeviceKind } from '@sberdevices/plasma-ui/utils';

import { ItemEntitiesCommon, ItemEntitiesProps } from './ItemEntities@common';
import { ItemEntitiesMobile } from './ItemEntities@mobile';

const mapDeviceToItemEntities: Record<DeviceKind, React.FC<ItemEntitiesProps>> = {
    sberBox: ItemEntitiesCommon,
    sberPortal: ItemEntitiesCommon,
    mobile: ItemEntitiesMobile,
};

/** Компонент, используемы для отображения списка карточек */
export const ItemEntities = React.memo(mapDeviceToItemEntities[detectDevice()]) as typeof ItemEntitiesCommon;
