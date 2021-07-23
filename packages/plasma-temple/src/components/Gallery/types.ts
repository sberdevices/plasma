import React from 'react';

import { AnyObject } from '../../types';
import { GalleryCardParams, GalleryCardProps } from '../GalleryCard/types';

export interface WithNavigationProps {
    axis?: 'x' | 'y';
    activeIndex?: number;
}

type GalleryClassNameProps<T> = T & {
    className?: string;
};

export interface GalleryPropsWithChildren {
    children: React.ReactNode;
    items?: never;
    onItemFocus?: never;
    onItemClick?: never;
    Component?: never;
}

export interface GalleryPropsWithComponent<T extends AnyObject = AnyObject> {
    items: GalleryCardParams<T>[];
    onItemFocus?: () => void;
    onItemClick: (val: GalleryCardParams<T>, index: number) => void;
    Component?: React.ComponentType<GalleryCardProps<T>>;
    children?: never;
}

export type GalleryProps<T extends AnyObject = AnyObject> = GalleryClassNameProps<
    GalleryPropsWithChildren | GalleryPropsWithComponent<T>
>;

export type GalleryWithNavigationProps<T extends AnyObject = AnyObject> = WithNavigationProps &
    GalleryProps<T> &
    React.RefAttributes<HTMLDivElement>;
