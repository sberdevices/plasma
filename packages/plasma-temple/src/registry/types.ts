import React from 'react';

import type { ItemMainSectionProps } from '../pages/ItemPage/components/ItemMainSection/ItemMainSection';
import type { ItemEntitiesProps } from '../pages/ItemPage/components/ItemEntities/ItemEntities';
import type { NavColProps } from '../pages/ShopLandingPage/components/NavCol/NavCol';

export type UnifiedComponentProps<T, K extends string> = T & {
    platformComponents: Record<K, React.ComponentType<any>>;
};

export interface Registry {
    ItemMainSection: React.ComponentType<ItemMainSectionProps>;
    ItemEntities: React.ComponentType<ItemEntitiesProps>;
    NavCol: React.ComponentType<NavColProps>;
}
