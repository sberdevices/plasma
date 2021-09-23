import React from 'react';
import type { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { whiteSecondary, whiteTertiary, critical } from '@sberdevices/plasma-core';
import { IconTrash } from '@sberdevices/plasma-icons';

import { Image } from '../Image';
import { Footnote2 } from '../Typography';

import { StyledButton } from './UploadButton';

export interface UploadGalleryProps {
    /**
     *
     */
    items?: Array<{ id: string | number; image: string; caption?: string; status?: 'success' | 'error' }>;
    /**
     *
     */
    onItemRemove?: (id: string | number) => void;
}

const StyledRoot = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;

    /* stylelint-disable-next-line declaration-block-semicolon-newline-after, rule-empty-line-before */
    ${StyledButton} ~ & {
        margin-top: 1rem;
    }
`;
const StyledItem = styled.div`
    position: relative;
    border-radius: 0.75rem;

    &:hover {
        transform: scale(1.04);
    }
`;
const StyledCaption = styled(Footnote2)`
    position: absolute;
    left: 0.625rem;
    bottom: 0.5rem;
    color: ${whiteTertiary};
`;
const StyledTrashButton = styled.button`
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.25rem;
    height: 1.25rem;
    padding: 0;

    appearance: none;
    background-color: ${critical};
    border: 0 none;
    border-radius: 100%;
    color: ${whiteSecondary};
    cursor: pointer;
`;

export const UploadGallery: FC<UploadGalleryProps & HTMLAttributes<HTMLDivElement>> = ({
    items = [],
    onItemRemove,
    ...rest
}) => {
    return (
        <StyledRoot {...rest}>
            {items.map((item) => (
                <StyledItem key={item.id}>
                    <Image src={item.image} customRatio="66.6667" />
                    <StyledTrashButton onClick={() => onItemRemove?.(item.id)}>
                        <IconTrash size="xs" color="inherit" />
                    </StyledTrashButton>
                    {item.caption && <StyledCaption>{item.caption}</StyledCaption>}
                </StyledItem>
            ))}
        </StyledRoot>
    );
};
