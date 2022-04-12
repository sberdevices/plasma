import React from 'react';

import { DeviceComponent } from '../../DeviceComponent/DeviceComponent';

import { ItemBackgroundCommon, ItemBackgroundProps } from './ItemBackground@common';
import { ItemBackgroundMobile } from './ItemBackground@mobile';

/** Компонент, используемый для отображения фона на странице сущности */
export const ItemBackground: React.FC<ItemBackgroundProps> = (props) => (
    <DeviceComponent
        sberbox={ItemBackgroundCommon}
        sberportal={ItemBackgroundCommon}
        mobile={ItemBackgroundMobile}
        props={props}
    />
);
