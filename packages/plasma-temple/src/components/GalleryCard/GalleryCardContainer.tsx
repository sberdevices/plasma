import React from 'react';
import { isSberBox } from '@sberdevices/plasma-ui/utils';

import { GalleryCard as DefaultGalleryCard } from '../GalleryCard/GalleryCard';
import { AnyObject } from '../../types';

import { GalleryCardParams, GalleryCardProps } from './types';

export interface GalleryCardContainerProps<T extends AnyObject> extends Omit<GalleryCardProps<T>, 'onClick'> {
    component?: React.ComponentType<GalleryCardProps<T>>;
    onClick: (cardProps: GalleryCardParams<T>, index: number) => void;
}

export const GalleryCardContainer = <T extends AnyObject = AnyObject>({
    card,
    focused,
    index,
    component,
    onClick,
}: GalleryCardContainerProps<T>): React.ReactElement => {
    const GalleryCard = component ?? DefaultGalleryCard;

    const handleClick = React.useCallback(() => onClick(card, index), [card, index, onClick]);

    return (
        <div onClick={handleClick} tabIndex={-1}>
            <GalleryCard card={card} focused={isSberBox() && focused} index={index} />
        </div>
    );
};
