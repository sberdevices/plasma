import { GalleryCardParams } from '@sberdevices/plasma-temple';

import { Product } from '../types';

export function productToGalleryItem(item: Product, index: number): GalleryCardParams<Product> {
    return {
        ...item,
        label: item.name,
        position: index + 1,
        image: {
            src: item.picture,
            ratio: '1 / 1',
        },
    };
}
