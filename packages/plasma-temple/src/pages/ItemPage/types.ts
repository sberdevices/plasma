import { Description, MediaObject, MetaPayload } from '../../types';

export interface ItemEntity extends MetaPayload {
    label: string;
    image: MediaObject;
    position: number;
    [key: string]: any;
}

export interface ItemPageState extends MetaPayload {
    id: string;
    title: string;
    subtitle?: string;
    entities: Array<ItemEntity>;
    entitiesTitle: string;
    description: Description[];
    actionButtonText: string;
    background?: MediaObject;
}
