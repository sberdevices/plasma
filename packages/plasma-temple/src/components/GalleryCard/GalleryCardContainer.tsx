import React from 'react';
import { isSberPortal } from '@sberdevices/plasma-ui/utils';

import { GalleryCard as DefaultGalleryCard } from '../GalleryCard/GalleryCard';
import { AnyObject } from '../../types';
import { isSberBoxLike } from '../../utils/deviceFamily';

import { GalleryCardParams, GalleryCardProps } from './types';

export interface GalleryCardContainerProps<T extends AnyObject> extends Omit<GalleryCardProps<T>, 'onClick'> {
    component?: React.ComponentType<GalleryCardProps<T>>;
    onClick: (cardProps: GalleryCardParams<T>, index: number) => void;
}

const Root: React.FC<{ onClick: () => void }> = ({ onClick, children }) => {
    const tabIndex = isSberPortal() ? undefined : -1;

    return (
        <div onClick={onClick} tabIndex={tabIndex}>
            {children}
        </div>
    );
};

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
        <Root onClick={handleClick}>
            <GalleryCard card={card} focused={isSberBoxLike() && focused} index={index} />
        </Root>
    );
};
