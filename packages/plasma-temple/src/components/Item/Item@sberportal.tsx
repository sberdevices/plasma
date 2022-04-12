import React from 'react';

import { ItemCommon, ItemComponent } from './Item@common';
import { ItemBackgroundCommon } from './ItemBackground/ItemBackground@common';
import { ItemEntitiesCommon } from './ItemEntities/ItemEntities@common';

const platformComponents = {
    ItemBackground: ItemBackgroundCommon,
    ItemEntities: ItemEntitiesCommon,
};

export const ItemSberPortal: ItemComponent = (props) => (
    <ItemCommon {...props} platformComponents={platformComponents} />
);
