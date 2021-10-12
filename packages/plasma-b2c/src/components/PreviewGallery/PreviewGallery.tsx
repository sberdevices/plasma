import React, { useCallback, useState } from 'react';
import type { FC, HTMLAttributes } from 'react';

import { noop } from './utils';
import { PreviewGalleryListItems } from './PreviewGalleryItems';
import { PreviewGalleryItemProps } from './PreviewGalleryItemBase';
import { InteractionType } from './types';

export interface SortableIndexProps {
    oldIndex: number;
    newIndex: number;
}

export interface PreviewGalleryProps {
    /**
     * Массив элементов.
     */
    items?: Array<PreviewGalleryItemProps>;
    /**
     * Тип взаимодействия с галереей - выбор или перетаскивание элементов.
     */
    interactionType?: InteractionType;
    /**
     * Компонент иконки удаления элемента.
     */
    deleteIcon: JSX.Element;
    /**
     * CSS размер превью элемента.
     */
    itemSize?: string;
    /**
     * Колбэк на завершение перетаскавания элемента.
     */
    onItemsSortEnd?: ({ oldIndex, newIndex }: SortableIndexProps) => void;
    /**
     * Колбэк на удаление элемента.
     */
    onItemRemove?: (id: string | number) => void;
    /**
     * Колбэк на выделение элемента.
     */
    onItemSelect?: (id: string | number) => void;
}

/**
 * Компонент для создания галлереи превью изображений.
 */
export const PreviewGallery: FC<PreviewGalleryProps & HTMLAttributes<HTMLDivElement>> = ({
    interactionType = 'selectable',
    items = [],
    onItemSelect = noop,
    onItemRemove = noop,
    onItemsSortEnd = noop,
    ...rest
}) => {
    const distance = 1;
    const axis = 'xy';
    const [isGrabbing, setGrabbing] = useState<boolean>(false);

    const onSortStart = useCallback(() => setGrabbing(true), []);

    const onSortEnd = useCallback((indexes: SortableIndexProps) => {
        setGrabbing(false);
        onItemsSortEnd(indexes);
    }, []);

    return (
        <PreviewGalleryListItems
            items={items}
            onItemRemove={onItemRemove}
            onItemSelect={onItemSelect}
            onSortStart={onSortStart}
            onSortEnd={onSortEnd}
            axis={axis}
            distance={distance}
            interactionType={interactionType}
            isGrabbing={isGrabbing}
            {...rest}
        />
    );
};
