import React from 'react';

import { GalleryCardParams } from '../../components/GalleryCard/types';
import { AnyObject } from '../../types';

export interface SingleGallery<T> {
    title?: React.ReactNode;
    items: GalleryCardParams<T>[];
    activeCardIndex: number;
}

export interface MultipleGallery<T> {
    id: string;
    title: React.ReactNode;
    items: GalleryCardParams<T>[];
    activeCardIndex: number;
}

export interface GalleryPageState<T extends AnyObject = AnyObject> {
    activeGalleryIndex: number;
    gallery: SingleGallery<T> | Array<MultipleGallery<T>>;
}
