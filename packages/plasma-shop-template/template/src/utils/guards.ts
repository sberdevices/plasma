import type { GalleryCardParams } from '@sberdevices/plasma-temple';

import type { Product, Category } from '../types';

export const isProductItem = (val: unknown): val is GalleryCardParams<Product> =>
    typeof val === 'object' && val != null && 'category' in val;

export const isCategory = (val: unknown): val is GalleryCardParams<Category> =>
    typeof val === 'object' && val != null && !('category' in val);
