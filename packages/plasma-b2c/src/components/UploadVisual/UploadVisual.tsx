import React from 'react';
import type { FC } from 'react';
import styled from 'styled-components';
import { IconTrashFilled } from '@sberdevices/plasma-icons';

import { Upload, UploadProps } from '../Upload';
import { PreviewGallery, PreviewGalleryProps } from '../PreviewGallery';
import { StyledRoot as StyledPreviewGallery } from '../PreviewGallery/PreviewGalleryItems';

export interface UploadVisualProps extends UploadProps, PreviewGalleryProps {}

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
    deleteIcon,
    itemSize,
    onItemsSortEnd,
    onItemRemove,
    onItemSelect,
    onValidation,
    ...rest
}) => {
    const acceptExtensions = '.avi,.mp4,.bmg,.png,.jpg,.jpeg';
    const content = 'Загрузите фото или видео';

    return (
        <StyledRoot>
            <Upload
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
                deleteIcon={deleteIcon || <IconTrashFilled size="xs" color="inherit" />}
                interactionType={interactionType}
                onItemRemove={onItemRemove}
                onItemSelect={onItemSelect}
                onItemsSortEnd={onItemsSortEnd}
            />
        </StyledRoot>
    );
};
