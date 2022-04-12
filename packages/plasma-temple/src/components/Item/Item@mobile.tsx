import React from 'react';

import { ItemCommon, ItemComponent } from './Item@common';
import { ItemBackgroundMobile } from './ItemBackground/ItemBackground@mobile';
import { ItemEntitiesMobile } from './ItemEntities/ItemEntities@mobile';

const platformComponents = {
    ItemBackground: ItemBackgroundMobile,
    ItemEntities: ItemEntitiesMobile,
};

export const ItemMobile: ItemComponent = (props) => <ItemCommon {...props} platformComponents={platformComponents} />;
