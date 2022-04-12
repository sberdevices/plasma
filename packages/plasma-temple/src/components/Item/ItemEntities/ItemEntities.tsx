import React from 'react';

import { DeviceComponent } from '../../DeviceComponent/DeviceComponent';

import { ItemEntitiesCommon, ItemEntitiesProps } from './ItemEntities@common';
import { ItemEntitiesMobile } from './ItemEntities@mobile';

/** Компонент, используемы для отображения списка карточек */
export const ItemEntities = React.memo<ItemEntitiesProps>((props) => (
    <DeviceComponent
        sberbox={ItemEntitiesCommon}
        sberportal={ItemEntitiesCommon}
        mobile={ItemEntitiesMobile}
        props={props}
    />
)) as typeof ItemEntitiesCommon;
