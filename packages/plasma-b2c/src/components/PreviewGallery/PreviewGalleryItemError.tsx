import React, { memo } from 'react';
import styled from 'styled-components';
import { surfaceSolid02, backgroundPrimary } from '@sberdevices/plasma-core';
import { IconPictureFilled } from '@sberdevices/plasma-icons';

import { AddionalItemProps } from './types';
import { StyledIconDrag, StyledItem, StyledTrashButton, PreviewGalleryItemProps } from './PreviewGalleryItemBase';

const StyledErrorImage = styled.div`
    position: relative;
    border-radius: 0.75rem;
    padding-bottom: 66.67%;

    background-color: ${surfaceSolid02};
    color: ${backgroundPrimary};
`;

const StyledIconPictureFilled = styled(IconPictureFilled)`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
`;

/**
 * Базовый компонент с ошибкой.
 */
export const PreviewGalleryItemError = memo(
    ({ id, itemSize, interactionType, deleteIcon, onItemRemove }: PreviewGalleryItemProps & AddionalItemProps) => {
        const itemRemoveHandle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.stopPropagation();
            onItemRemove?.(id);
        };

        return (
            <StyledItem width={itemSize} key={id}>
                <StyledErrorImage>
                    <StyledIconPictureFilled size="s" color="inherit" />
                </StyledErrorImage>

                <StyledTrashButton onClick={itemRemoveHandle}>{deleteIcon}</StyledTrashButton>

                {interactionType !== 'selectable' && <StyledIconDrag size="xs" color="inherit" />}
            </StyledItem>
        );
    },
);
