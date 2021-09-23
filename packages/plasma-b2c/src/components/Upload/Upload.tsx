import React from 'react';
import type { FC, HTMLAttributes } from 'react';

import { UploadRoot } from './UploadRoot';
import { UploadButton, UploadButtonProps } from './UploadButton';
import { UploadGallery, UploadGalleryProps } from './UploadGallery';
import { UploadHelperText } from './UploadHelperText';

export interface UploadProps extends UploadButtonProps, UploadGalleryProps {
    /**
     * Текст-подсказка.
     */
    helperText?: string;
}

export const Upload: FC<UploadProps & HTMLAttributes<HTMLDivElement>> = ({
    text,
    contentLeft,
    contentRight,
    type = 'image',
    status,
    disabled,
    progress,
    helperText,
    items,
    onItemRemove,
    ...rest
}) => {
    return (
        <UploadRoot {...rest}>
            <UploadButton
                text={text}
                contentLeft={contentLeft}
                contentRight={contentRight}
                type={type}
                status={status}
                disabled={disabled}
                progress={progress}
            />
            {helperText && <UploadHelperText status={status}>{helperText}</UploadHelperText>}
            {type === 'image' && <UploadGallery items={items} onItemRemove={onItemRemove} />}
        </UploadRoot>
    );
};
