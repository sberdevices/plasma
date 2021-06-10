import React from 'react';
import styled from 'styled-components';
import { CarouselItem } from '@sberdevices/plasma-ui';

import { AnyObject } from '../../../../types';
import { GalleryCardProps } from '../../../../components/GalleryCard';

const StyledCarouselItem = styled(CarouselItem)`
    margin-right: 1rem;
`;

export function ShopLandingCard<T extends AnyObject = AnyObject>({
    card,
    index,
    focused,
    component: Component,
    onClick,
}: GalleryCardProps<T> & { component: React.ComponentType<GalleryCardProps<T>> }): React.ReactElement {
    const handleClick = React.useCallback((item: T) => onClick(item), [onClick]);

    return (
        <StyledCarouselItem key={card.id} scrollSnapAlign="start">
            <Component card={card} focused={focused} index={index} onClick={handleClick} />
        </StyledCarouselItem>
    );
}
