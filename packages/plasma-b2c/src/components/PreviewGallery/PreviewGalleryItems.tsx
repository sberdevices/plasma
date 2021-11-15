import React, { memo, useMemo } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import styled, { css } from 'styled-components';

import { AddionalItemProps } from './types';
import { PreviewGalleryItemError } from './PreviewGalleryItemError';
import { PreviewGalleryItemBase, PreviewGalleryItemProps } from './PreviewGalleryItemBase';

export const StyledRoot = styled.div<{ isGrabbing: boolean; maxHeight?: number }>`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;

    cursor: pointer;

    ${({ isGrabbing }) =>
        isGrabbing &&
        css`
            cursor: grabbing;
        `}

    ${({ maxHeight }) =>
        maxHeight &&
        css`
            max-height: ${maxHeight}px;
            overflow: auto;
        `}
`;

export interface PreviewGalleryListItemsProps {
    items?: Array<PreviewGalleryItemProps>;
    /**
     * Перетаскивается ли элемент.
     */
    isGrabbing: boolean;
    /**
     * Опциональная высота для внутреннего скролла.
     */
    maxHeight?: number;
}

/**
 * Компонент со списком превью изображений.
 */
export const PreviewGalleryListItems = SortableContainer(
    ({
        items = [],
        interactionType,
        actionIcon,
        itemSize,
        isGrabbing,
        maxHeight,
        onItemAction,
        onItemClick,
    }: PreviewGalleryListItemsProps & AddionalItemProps) => {
        const isDragDisabled = interactionType === 'selectable';

        // deleteIcon не указан в зависимости, т.к. предполагается,
        // что данный пропс не будет меняться динамически
        const iconMemo = useMemo(() => actionIcon, []);

        const PreviewGalleryItem = memo(
            SortableElement(({ status, ...rest }: PreviewGalleryItemProps & AddionalItemProps) => {
                return status === 'error' ? (
                    <PreviewGalleryItemError {...rest} />
                ) : (
                    <PreviewGalleryItemBase {...rest} />
                );
            }),
        );

        return (
            <StyledRoot isGrabbing={isGrabbing} maxHeight={maxHeight}>
                {items.map((item, index) => (
                    <PreviewGalleryItem
                        disabled={isDragDisabled}
                        key={item.id}
                        index={index}
                        actionIcon={iconMemo}
                        {...item}
                        interactionType={interactionType}
                        itemSize={itemSize}
                        onItemAction={onItemAction}
                        onItemClick={onItemClick}
                    />
                ))}
            </StyledRoot>
        );
    },
);
