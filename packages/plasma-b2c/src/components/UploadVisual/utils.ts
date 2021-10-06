import { UploadGalleryItemProps } from './UploadGallery';

export const noop = () => {};

export const arrayItemSwapping = (oldItems: Array<UploadGalleryItemProps>, oldIndex: number, newIndex: number) => {
    const newItems = [...oldItems];
    newItems.splice(newIndex < 0 ? newItems.length + newIndex : newIndex, 0, newItems.splice(oldIndex, 1)[0]);

    return newItems;
};

export const arrayItemRemoving = (oldItems: Array<UploadGalleryItemProps>, id: number | string) => {
    if (!oldItems?.length) {
        return [];
    }

    const newItems = [...oldItems];
    const idIndex = newItems.findIndex((item) => item.id === id);
    newItems.splice(idIndex, 1);
    return newItems;
};

export const arrayItemSelecting = (oldItems: Array<UploadGalleryItemProps>, id: number | string) => {
    const newItems = [...oldItems];
    const idIndex = newItems.findIndex((item) => item.id === id);

    if (idIndex === -1) {
        return newItems;
    }

    newItems[idIndex].isSelected = Boolean(!newItems[idIndex].isSelected);

    return newItems;
};
