import { GalleryCardParams } from '../../components/GalleryCard/types';
import { AnyObject } from '../../types';

export interface SingleGallery<T> {
    title?: string;
    items: GalleryCardParams<T>[];
    activeCardIndex: number;
}

export interface MultipleGallery<T> {
    id: string;
    title: string;
    items: GalleryCardParams<T>[];
    activeCardIndex: number;
}

export interface GalleryPageState<T extends AnyObject = AnyObject> {
    activeGalleryIndex: number;
    gallery: SingleGallery<T> | Array<MultipleGallery<T>>;
}
