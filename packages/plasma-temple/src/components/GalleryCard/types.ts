import { AnyObject, MediaObject } from '../../types';

export type GalleryCardParams<T extends AnyObject = AnyObject> = T & {
    id: string | number;
    label: string;
    position: number;
    image: MediaObject;
    description?: string;
    tag?: string;
    time?: string;
};

export interface GalleryCardProps<T extends AnyObject = AnyObject> {
    card: GalleryCardParams<T>;
    index: number;
    focused?: boolean;
}
