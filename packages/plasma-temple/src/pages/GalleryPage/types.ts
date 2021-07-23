import { GalleryCardParams } from '../../components/GalleryCard/types';
import { AnyObject } from '../../types';

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
