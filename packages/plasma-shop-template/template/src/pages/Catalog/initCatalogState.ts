import { GalleryCardParams, GalleryData } from '@sberdevices/plasma-temple';

import { getCategories, getPopularProducts, getProducts } from '../../api/products';
import { CatalogData, CatalogGalleryType, Category, Product } from '../../types';
import { productToGalleryItem } from '../../utils/mappers';

const createGalleryData = <T extends CatalogData>(
    data: T[],
    title: string,
    id: string,
    mapper: (item: T, i: number) => GalleryCardParams<T>,
): Required<GalleryData<T>> => {
    return {
        activeCardIndex: 0,
        id,
        title,
        items: data.map(mapper),
    };
};

export const initCatalogState = async (): Promise<{
    activeGalleryIndex: number;
    gallery: Required<GalleryData<Category>>[];
}> => {
    const categories = await getCategories();
    const popularProducts = await getPopularProducts();
    const products = await getProducts();

    const productByCategories = products.reduce<Record<string, Product[]>>((acc, product) => {
        const { id } = product.category;
        if (acc[id]) {
            acc[id].push(product);
        } else {
            acc[id] = [product];
        }

        return acc;
    }, {});

    return {
        activeGalleryIndex: 0,
        gallery: [
            createGalleryData(categories, 'Каталог', CatalogGalleryType.CATEGORIES, (item) => ({
                ...item,
                label: item.name,
                position: 0,
                image: {
                    src: '',
                },
            })),
            createGalleryData(popularProducts, 'Популярные товары', CatalogGalleryType.POPULAR, productToGalleryItem),
            ...categories.map((category) => {
                return createGalleryData(
                    productByCategories[category.id] ?? [],
                    category.name,
                    category.id,
                    productToGalleryItem,
                );
            }),
        ],
    };
};
