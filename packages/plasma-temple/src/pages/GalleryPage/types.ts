import { MediaObject } from '../../types';

export interface GalleryCard {
    id: string;
    label: string;
    position: number;
    image: MediaObject;
    description?: string;
    tag?: string;
    time?: string;
}

export interface Gallery {
    id?: string;
    title: string;
    items: GalleryCard[];
    activeCardIndex: number;
}

export interface GalleryPageState {
    activeGalleryIndex: number;
    gallery: Gallery | Required<Gallery>[];
}
