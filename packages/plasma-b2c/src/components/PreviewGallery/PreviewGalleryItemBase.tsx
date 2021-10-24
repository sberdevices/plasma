import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import { whiteSecondary, whiteTertiary, buttonAccent, critical, whitePrimary } from '@sberdevices/plasma-core';
import { IconDone, IconDrag } from '@sberdevices/plasma-icons';

import { Image } from '../Image';
import { Footnote2 } from '../Typography';

import { AddionalItemProps, StatusType } from './types';

export const buttonMixin = (vPosition: 'left' | 'right', bgColor: string, color: string) => css`
    position: absolute;
    top: 0.25rem;
    ${vPosition}: 0.25rem;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.25rem;
    height: 1.25rem;
    padding: 0;

    appearance: none;
    background-color: ${bgColor};
    border: 0 none;
    border-radius: 100%;
    color: ${color};
    cursor: pointer;
`;

export const StyledSelectButton = styled.button`
    ${buttonMixin('left', buttonAccent, whitePrimary)};
`;

export const StyledTrashButton = styled.button`
    ${buttonMixin('right', critical, whiteSecondary)};

    &:hover {
        color: ${whitePrimary};
    }
`;

export const StyledIconDrag = styled(IconDrag)`
    ${buttonMixin('left', 'tranpsarent', whitePrimary)};

    svg {
        opacity: 0.24;
    }
`;

export const StyledCaption = styled(Footnote2)`
    position: absolute;
    left: 0.625rem;
    bottom: 0.5rem;
    color: ${whiteTertiary};
`;

export const StyledItem = styled.div<{ width?: string }>`
    position: relative;
    border-radius: 0.75rem;

    height: 100%;

    ${({ width }) =>
        width &&
        css`
            width: ${width};
        `}

    ${StyledTrashButton} {
        display: none;
    }

    &:hover {
        transform: scale(1.04);

        ${StyledTrashButton} {
            display: flex;
        }
    }
`;

export interface PreviewGalleryItemProps {
    /**
     * Идентификатор элемента.
     */
    id: string | number;
    /**
     * Конечный путь до превью элемента.
     */
    image?: string;
    /**
     * Дополнительное описание элемента.
     */
    caption?: string;
    /**
     * Состояние элемента.
     */
    status?: StatusType;
    /**
     * Выделен ли элемент.
     */
    isSelected?: boolean;
}

/**
 * Базовый компонент с превью.
 */
export const PreviewGalleryItemBase = memo(
    ({
        id,
        itemSize,
        image = '',
        isSelected,
        caption,
        interactionType,
        actionIcon,
        status,
        onItemAction,
        onItemClick,
    }: PreviewGalleryItemProps & AddionalItemProps) => {
        const itemActionHandle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.stopPropagation();
            onItemAction?.(id);
        };

        return (
            <StyledItem width={itemSize} key={id} onClick={() => onItemClick?.(id)}>
                <Image src={image} ratio="16 / 9" />

                <StyledTrashButton onClick={itemActionHandle}>{actionIcon}</StyledTrashButton>

                {interactionType === 'selectable' && status !== 'error' ? (
                    isSelected && (
                        <StyledSelectButton>
                            <IconDone size="xs" color="inherit" />
                        </StyledSelectButton>
                    )
                ) : (
                    <StyledIconDrag size="xs" color="inherit" />
                )}

                {caption && <StyledCaption>{caption}</StyledCaption>}
            </StyledItem>
        );
    },
);
