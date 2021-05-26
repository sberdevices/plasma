import React from 'react';

import { GalleryCardParams } from '../../pages';
import { AnyObject } from '../../types';
import { GalleryCardProps } from '../GalleryCard/GalleryCard';

export interface GalleryPropsWithChildren {
    children: React.ReactNode;
    items?: never;
    onItemFocus?: never;
    onItemClick?: never;
    Component?: never;
}

export interface GalleryPropsWithComponent<T extends AnyObject = AnyObject> {
    items: GalleryCardParams<T>[];
    onItemFocus: () => void;
    onItemClick: (val: T, index: number) => void;
    Component?: React.ComponentType<GalleryCardProps<T>>;
    children?: never;
}

export type GalleryProps<T extends AnyObject = AnyObject> = GalleryPropsWithChildren | GalleryPropsWithComponent<T>;
