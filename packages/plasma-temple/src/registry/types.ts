import React from 'react';

import { ItemMainSectionProps } from '../pages/ItemPage/components/ItemMainSection/ItemMainSection';
import { ItemEntitiesProps } from '../pages/ItemPage/components/ItemEntities/ItemEntities';

export type UnifiedComponentProps<T> = T & {
    platformComponents: Record<string, React.ComponentType<any>>;
};

export interface Registry {
    ItemMainSection: React.ComponentType<ItemMainSectionProps>;
    ItemEntities: React.ComponentType<ItemEntitiesProps>;
}
