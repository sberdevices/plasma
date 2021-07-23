import { AssistantAppStateItem } from '@sberdevices/plasma-temple';

import { useAssistantState } from '../../../hooks/useAssistantState';
import { ActionType, CatalogGalleryType, PageState } from '../../../types';

export const useCatalogAssistantState = (screen: string, state: PageState['catalog']) => {
    let items: AssistantAppStateItem[] = [];

    if (state && Array.isArray(state.gallery)) {
        const { activeGalleryIndex, gallery } = state;
        const categories = gallery.find(({ id }) => id === CatalogGalleryType.CATEGORIES) ?? { items: [] };
        const popularIndex = gallery.findIndex(({ id }) => id === CatalogGalleryType.POPULAR);

        // В галерее находитятся не только каталог товаров, но и категории,
        // поэтому для 0 индекса активной галереей являются популярные товары
        const activeCategoryIndex = !activeGalleryIndex ? popularIndex : activeGalleryIndex;
        const activeCategory = gallery[activeCategoryIndex];
        const popularGoods = gallery[popularIndex];

        items = [
            ...categories.items,
            { id: popularGoods.id, name: popularGoods.title, position: 0 },
            ...activeCategory.items,
        ].map((item) => ({
            title: item.name,
            number: item.position,
            id: String(item.id),
            action: {
                type: ActionType.OPEN_ITEM,
                payload: { ...item },
            },
        }));
    }

    useAssistantState({ screen, items });
};
