import { PreviewGalleryItemProps } from './PreviewGalleryItemBase';

/**
 * Метод-заглушка
 */
export const noop = () => {};

/**
 * Метод для смены элементов в массиве по индексам
 * @param {Array<PreviewGalleryItemProps>} oldItems массив в предыдущем состоянии
 * @param {number} oldIndex старое значение индекса
 * @param {number} newIndex новое значение индекса
 * @returns {Array<PreviewGalleryItemProps>} новый массив с новым порядком элементов
 */
export const arrayItemSwapping = (oldItems: Array<PreviewGalleryItemProps>, oldIndex: number, newIndex: number) => {
    if (!oldItems?.length) {
        return [];
    }

    const newItems = [...oldItems];
    newItems.splice(newIndex < 0 ? newItems.length + newIndex : newIndex, 0, newItems.splice(oldIndex, 1)[0]);

    return newItems;
};

/**
 * Метод для удаления элемента из массива по индексу
 * @param {Array<PreviewGalleryItemProps>} oldItems массив в предыдущем состоянии
 * @param {number | string} id старое значение индекса
 * @returns {Array<PreviewGalleryItemProps>} новый массив без удалённого элемента
 */
export const arrayItemRemoving = (oldItems: Array<PreviewGalleryItemProps>, id: number | string) => {
    if (!oldItems?.length) {
        return [];
    }

    const newItems = [...oldItems];
    const idIndex = newItems.findIndex((item) => item.id === id);

    if (idIndex === -1) {
        return newItems;
    }

    newItems.splice(idIndex, 1);

    return newItems;
};

/**
 * Метод для выделения элемента из массива по индексу
 * @param {Array<PreviewGalleryItemProps>} oldItems массив в предыдущем состоянии
 * @param {number | string} id старое значение индекса
 * @param {boolean | undefined} multipleSelect флаг множественного выбора
 * @returns {Array<PreviewGalleryItemProps>} новый массив с выделенными элементами
 */
export const arrayItemSelecting = (
    oldItems: Array<PreviewGalleryItemProps>,
    id: number | string,
    multipleSelect = false,
) => {
    if (!oldItems?.length) {
        return [];
    }

    // Метод для предотвращения лишних ререндеров
    const getRemovedSelectionItems = (items: Array<PreviewGalleryItemProps>) =>
        items.map((item) => ({
            ...item,
            isSelected: item.isSelected === undefined ? undefined : false,
        }));

    const newItems = multipleSelect ? [...oldItems] : getRemovedSelectionItems(oldItems);

    const idIndex = newItems.findIndex((item) => item.id === id);

    if (idIndex === -1) {
        return newItems;
    }

    newItems[idIndex].isSelected = Boolean(!newItems[idIndex].isSelected);

    return newItems;
};
