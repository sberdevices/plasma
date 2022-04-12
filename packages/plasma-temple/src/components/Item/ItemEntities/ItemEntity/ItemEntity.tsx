import React from 'react';

import { DeviceComponent } from '../../../DeviceComponent/DeviceComponent';

import { ItemEntityCommon, ItemEntityProps } from './ItemEntity@common';
import { ItemEntityMobile } from './ItemEntity@mobile';

/** Компонент, используемый для отображения карточки */
export const ItemEntity = React.memo<ItemEntityProps>((props) => (
    <DeviceComponent sberbox={ItemEntityCommon} sberportal={ItemEntityCommon} mobile={ItemEntityMobile} props={props} />
)) as typeof ItemEntityCommon;
