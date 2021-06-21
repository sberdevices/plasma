import { GalleryCardParams } from '../GalleryPage';
import { AnyObject } from '../../types';

export interface ShopLandingPageState<T extends AnyObject = AnyObject> {
    catalogImage: string;
    items: GalleryCardParams<T>[];
    activeCardIndex: number;
}
