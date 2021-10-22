import React, { useMemo } from 'react';
import type { FC } from 'react';
import styled from 'styled-components';
import { IconTrashFilled } from '@sberdevices/plasma-icons';

import { Upload, UploadProps } from '../Upload';
import { PreviewGallery } from '../PreviewGallery';
import { StyledRoot as StyledPreviewGallery } from '../PreviewGallery/PreviewGalleryItems';
import type { PreviewGalleryProps } from '../PreviewGallery/PreviewGallery';

export interface UploadVisualProps extends UploadProps, PreviewGalleryProps {
    /**
     * Максимальное количество превью в галерее.
     */
    maxCount?: number;
}

export const StyledRoot = styled.div`
    ${StyledPreviewGallery} {
        margin-top: 0.5rem;
    }
`;

/**
 * Комплексный компонент для загрузки изображений/видео с превью галереей.
 */
export const UploadVisual: FC<UploadVisualProps> = ({
    items = [],
    status,
    message,
    interactionType,
    actionIcon,
    itemSize,
    maxCount,
    disabled,
    onItemsSortEnd,
    onItemAction,
    onItemSelect,
    onValidation,
    ...rest
}) => {
    const acceptExtensions = '.avi,.mp4,.bmg,.png,.jpg,.jpeg';
    const content = 'Загрузите фото или видео';
    const isDisabled = useMemo(
        () => (disabled !== undefined ? disabled : Boolean(maxCount !== undefined && maxCount <= items.length)),
        [disabled, maxCount, items],
    );

    return (
        <StyledRoot>
            <Upload
                disabled={isDisabled}
                accept={acceptExtensions}
                content={content}
                message={message}
                status={status}
                onValidation={onValidation}
                {...rest}
            />
            <PreviewGallery
                items={items}
                itemSize={itemSize}
                actionIcon={actionIcon || <IconTrashFilled size="xs" color="inherit" />}
                interactionType={interactionType}
                onItemAction={onItemAction}
                onItemSelect={onItemSelect}
                onItemsSortEnd={onItemsSortEnd}
            />
        </StyledRoot>
    );
};
