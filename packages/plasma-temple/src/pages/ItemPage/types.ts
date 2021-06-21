import React from 'react';

import { MediaObject, MetaPayload } from '../../types';

export interface ItemEntity extends MetaPayload {
    label: string;
    image: MediaObject;
    position: number;
    [key: string]: any;
}

export interface ItemDescription {
    title: string | React.ReactElement;
    content: string | React.ReactElement;
}

export interface ItemPageState extends MetaPayload {
    id: string;
    title: string;
    subtitle?: string;
    entities: Array<ItemEntity>;
    entitiesTitle: string;
    description: ItemDescription[];
    actionButtonText: string;
    background?: MediaObject;
}
