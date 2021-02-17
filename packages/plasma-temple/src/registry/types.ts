import React from 'react';

import { ItemMainSectionProps, ItemEntitiesProps } from '../templates/Item/Item';

export type UnifiedComponentProps<T> = T & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    platformComponents: Record<string, React.ComponentType<any>>;
};

export interface Registry {
    ItemMainSection: React.ComponentType<ItemMainSectionProps>;
    ItemEntities: React.ComponentType<ItemEntitiesProps>;
}
