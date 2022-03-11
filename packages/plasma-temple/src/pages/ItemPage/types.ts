import React from 'react';

import { MediaObject, MetaPayload } from '../../types';

interface ItemEntity extends MetaPayload {
    id: string | number;
    label: string;
    image: MediaObject;
    /** @deprecated не используется */
    position: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface ItemDescription {
    title: React.ReactNode;
    content: React.ReactNode;
}

export interface ItemPageState extends MetaPayload {
    id: string;
    title: string;
    subtitle?: string;
    entities: Array<ItemEntity>;
    entitiesTitle: string;
    description?: ItemDescription[];
    actionButtonText: string;
    background?: MediaObject;
}
