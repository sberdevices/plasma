import React from 'react';
import type { FC } from 'react';
import styled from 'styled-components';

import { Upload, UploadProps } from '../Upload';

import { UploadGallery, UploadGalleryProps } from './UploadGallery';

export interface UploadVisualProps extends UploadProps, UploadGalleryProps {
    setItems: (callback: (prevItems: any[]) => any[]) => void;
}

export const StyledContent = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
`;

export const StyledText = styled.span`
    margin-left: 0.5rem;
`;

export const UploadVisual: FC<UploadVisualProps> = ({ items, interactionType, setItems, ...rest }) => {
    const acceptExtensions = '.avi,.mp4,.bmg,.png,.jpg,.jpeg';
    const content = 'Загрузите фото или видео';

    return (
        <div>
            <Upload accept={acceptExtensions} content={content} {...rest} />
            <UploadGallery items={items} setItems={setItems} interactionType={interactionType} />
        </div>
    );
};
