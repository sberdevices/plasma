import React, { useCallback, useState } from 'react';
import type { FC, HTMLAttributes } from 'react';
import { SortableContainerProps, SortableElementProps } from 'react-sortable-hoc';

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
    items?: Array<PreviewGalleryItemProps & Omit<SortableElementProps, 'index'>>;
    /**
     * Тип взаимодействия с галереей - выбор или перетаскивание элементов.
     */
    interactionType?: InteractionType;
    /**
     * Опциональная высота для внутреннего скролла.
     */
    maxHeight?: number;
    /**
     * Компонент иконки в правом верхнем углу.
     */
    actionIcon: JSX.Element;
    /**
     * CSS размер превью элемента.
     */
    itemSize?: string;
    /**
     * Колбэк на завершение перетаскавания элемента.
     */
    onItemsSortEnd?: ({ oldIndex, newIndex }: SortableIndexProps) => void;
    /**
     * Колбэк на клик элемента в правом верхнем углу.
     */
    onItemAction?: (id: string | number) => void;
    /**
     * Колбэк на выделение элемента.
     */
    onItemClick?: (id: string | number) => void;
}

/**
 * Компонент для создания галлереи превью изображений.
 */
export const PreviewGallery: FC<PreviewGalleryProps & HTMLAttributes<HTMLDivElement> & SortableContainerProps> = ({
    interactionType = 'selectable',
    items = [],
    maxHeight = 0,
    onItemClick = noop,
    onItemAction = noop,
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
            onItemAction={onItemAction}
            onItemClick={onItemClick}
            onSortStart={onSortStart}
            onSortEnd={onSortEnd}
            axis={axis}
            distance={distance}
            interactionType={interactionType}
            isGrabbing={isGrabbing}
            maxHeight={maxHeight}
            {...rest}
        />
    );
};
