import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Story, Meta } from '@storybook/react';
import { InSpacingDecorator } from '@sberdevices/plasma-sb-utils';
import { IconTrashFilled, IconTrash } from '@sberdevices/plasma-icons';

import { arrayItemRemoving, arrayItemSelecting, arrayItemSwapping } from './utils';

import { PreviewGallery } from '.';
import type { PreviewGalleryProps, PreviewGalleryItemProps } from '.';

export default {
    title: 'Controls/PreviewGallery',
    component: PreviewGallery,
    argTypes: {},
    decorators: [InSpacingDecorator],
} as Meta;

const StyledWrapper = styled.div`
    width: 23.75rem;
`;

interface StoryProps extends PreviewGalleryProps {}

const images: Array<PreviewGalleryItemProps> = [
    { id: 1 * Math.random(), image: './images/320_320_0.jpg', caption: '3:24' },
    { id: 2 * Math.random(), image: './images/320_320_1.jpg', isSelected: true },
    { id: 3 * Math.random(), image: './images/320_320_2.jpg' },
    { id: 4 * Math.random(), image: './images/320_320_3.jpg' },
    { id: 5 * Math.random(), image: './images/320_320_4.jpg' },
    { id: 6 * Math.random(), image: './images/320_320_4.jpg', status: 'error' },
];

export const Selectable: Story<StoryProps> = ({ ...rest }) => {
    const [items, setItems] = useState(images);

    const onItemRemove = useCallback((id) => {
        setItems((oldItems) => {
            const newItems = arrayItemRemoving(oldItems, id);
            return newItems;
        });
    }, []);

    const onItemSelect = useCallback((id) => {
        setItems((oldItems) => {
            const newItems = arrayItemSelecting(oldItems, id);
            return newItems;
        });
    }, []);

    return (
        <StyledWrapper>
            <PreviewGallery
                items={items}
                onItemRemove={onItemRemove}
                deleteIcon={<IconTrashFilled size="xs" color="inherit" />}
                onItemSelect={onItemSelect}
                {...rest}
            />
        </StyledWrapper>
    );
};

export const Draggable: Story<StoryProps> = ({ ...rest }) => {
    const [items, setItems] = useState(images);

    const onItemRemove = useCallback((id) => {
        setItems((oldItems) => {
            const newItems = arrayItemRemoving(oldItems, id);
            return newItems;
        });
    }, []);

    const onItemsSortEnd = useCallback(({ oldIndex, newIndex }) => {
        setItems((oldItems) => {
            const newItems = arrayItemSwapping(oldItems, oldIndex, newIndex);
            return newItems;
        });
    }, []);

    return (
        <StyledWrapper>
            <PreviewGallery
                interactionType="draggable"
                items={items}
                deleteIcon={<IconTrash size="xs" color="inherit" />}
                onItemRemove={onItemRemove}
                onItemsSortEnd={onItemsSortEnd}
                {...rest}
            />
        </StyledWrapper>
    );
};
