import React, { useCallback, memo } from 'react';
import type { FC, HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { whiteSecondary, whiteTertiary, critical, buttonAccent } from '@sberdevices/plasma-core';
import { IconTrash, IconDone } from '@sberdevices/plasma-icons';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import { Image } from '../Image';
import { Footnote2 } from '../Typography';
import { UploadRoot } from '../Upload/UploadRoot';

import { arrayItemRemoving, arrayItemSelecting, arrayItemSwapping, noop } from './utils';

export type InteractionType = 'selectable' | 'draggable';

export interface UploadGalleryItemProps {
    id: string | number;
    image: string;
    caption?: string;
    isSelected?: boolean;
    status?: 'success' | 'error';
}

export interface ItemHandlers {
    onItemRemove?: (id: string | number) => void;
    onItemSelect: (id: string | number) => void;
}

export interface UploadGalleryProps {
    /**
     *
     */
    items?: Array<UploadGalleryItemProps>;
    /**
     *
     */
    setItems: (callback: (prevItems: UploadGalleryItemProps[]) => UploadGalleryItemProps[]) => void;
    /**
     *
     */
    interactionType?: InteractionType;
}

export interface SortableListProps {
    items?: Array<UploadGalleryItemProps>;
}

const buttonMixin = (vPosition: 'left' | 'right', bgColor: string, color: string) => css`
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

const StyledSelectButton = styled.button`
    ${buttonMixin('left', buttonAccent, whiteSecondary)};
`;

const StyledTrashButton = styled.button`
    ${buttonMixin('right', critical, whiteSecondary)};
`;

const StyledCaption = styled(Footnote2)`
    position: absolute;
    left: 0.625rem;
    bottom: 0.5rem;
    color: ${whiteTertiary};
`;

const StyledRoot = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;

    /* stylelint-disable-next-line declaration-block-semicolon-newline-after, rule-empty-line-before */
    ${UploadRoot} ~ & {
        margin-top: 1rem;
    }
`;

const StyledItem = styled.div`
    position: relative;
    border-radius: 0.75rem;

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

// Добавить:
// кастомный размер карточек;
// кастомные иконки удаления (или для других углов тоже?);
// добавить тип взаимодействия: selectable | draggable;
// добавить валидацию если картинка не прогрузилась;

const SortableItem = memo(
    SortableElement(
        ({
            id,
            image,
            isSelected,
            caption,
            interactionType,
            onItemRemove,
            onItemSelect,
        }: UploadGalleryItemProps & ItemHandlers & { interactionType: InteractionType }) => {
            return (
                <StyledItem key={id} onClick={() => onItemSelect(id)}>
                    <Image src={image} customRatio="66.6667" />

                    <StyledTrashButton onClick={() => onItemRemove?.(id)}>
                        <IconTrash size="xs" color="black" />
                    </StyledTrashButton>

                    {interactionType === 'selectable' ? (
                        isSelected && (
                            <StyledSelectButton>
                                <IconDone size="xs" color="white" />
                            </StyledSelectButton>
                        )
                    ) : (
                        <StyledSelectButton>
                            <div>::</div>
                        </StyledSelectButton>
                    )}

                    {caption && <StyledCaption>{caption}</StyledCaption>}
                </StyledItem>
            );
        },
    ),
);

const SortableList = SortableContainer(
    ({
        items = [],
        onItemRemove,
        onItemSelect,
        interactionType,
    }: SortableListProps & ItemHandlers & { interactionType: InteractionType }) => {
        return (
            <StyledRoot>
                {items.map((item, index) => (
                    <SortableItem
                        disabled={interactionType === 'selectable'}
                        key={item.id}
                        index={index}
                        onItemSelect={onItemSelect}
                        onItemRemove={onItemRemove}
                        interactionType={interactionType}
                        {...item}
                    />
                ))}
            </StyledRoot>
        );
    },
);

export const UploadGallery: FC<UploadGalleryProps & HTMLAttributes<HTMLDivElement>> = ({
    interactionType = 'selectable',
    items = [],
    setItems,
    ...rest
}) => {
    const onSortEnd = useCallback(({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
        setItems((oldItems) => arrayItemSwapping(oldItems, oldIndex, newIndex));
    }, []);

    const onItemRemove = useCallback((id) => {
        setItems((oldItems) => arrayItemRemoving(oldItems, id));
    }, []);

    const onItemSelect = useCallback(
        interactionType === 'selectable'
            ? (id) => {
                  setItems((oldItems) => arrayItemSelecting(oldItems, id));
              }
            : noop,
        [],
    );

    return (
        <SortableList
            pressDelay={150}
            items={items}
            onItemRemove={onItemRemove}
            onItemSelect={onItemSelect}
            onSortEnd={onSortEnd}
            axis="xy"
            interactionType={interactionType}
            {...rest}
        />
    );
};
