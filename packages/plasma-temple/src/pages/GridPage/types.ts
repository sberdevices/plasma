import { MediaObject, MetaPayload } from '../../types';

interface EasyMediaObject extends Omit<MediaObject, 'src'> {
    src: string;
}

export interface GridEntity extends MetaPayload {
    id: string;
    text: string;
    image: EasyMediaObject;
    position: number;
    [key: string]: unknown;
}

export interface GridPageState extends MetaPayload {
    items: Array<GridEntity>;
    background?: EasyMediaObject;
}
