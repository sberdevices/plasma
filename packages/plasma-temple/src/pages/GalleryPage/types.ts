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

export interface GalleryData<T extends AnyObject = AnyObject> {
    id?: string;
    title: string;
    items: GalleryCardParams<T>[];
    activeCardIndex: number;
}

export interface GalleryPageState<T extends AnyObject = AnyObject> {
    activeGalleryIndex: number;
    gallery: GalleryData<T> | Required<GalleryData<T>>[];
}
