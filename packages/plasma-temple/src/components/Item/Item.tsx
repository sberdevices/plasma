import React from 'react';

import { DeviceComponent } from '../DeviceComponent/DeviceComponent';

import { ItemComponent } from './Item@common';
import { ItemMobile } from './Item@mobile';
import { ItemSberBox } from './Item@sberbox';
import { ItemSberPortal } from './Item@sberportal';

export const Item: ItemComponent = (props) => (
    <DeviceComponent sberbox={ItemSberBox} sberportal={ItemSberPortal} mobile={ItemMobile} props={props} />
);
