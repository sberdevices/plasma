import React from 'react';
import styled from 'styled-components';
import { CarouselGridWrapper, Carousel, CarouselItem } from '@sberdevices/plasma-ui';
import { isSberPortal } from '@sberdevices/plasma-ui/utils';

import { AnyObject } from '../../types';
import { GalleryCard } from '../GalleryCard/GalleryCard';

import { GalleryIndexContext, withNavigation } from './hocs/withNavigation';
import { GalleryProps } from './types';

const StyledCarouselWrapper = styled(CarouselGridWrapper)`
    margin-top: -8px;
`;

const StyledCarousel = styled(Carousel)`
    box-sizing: border-box;
    padding-top: 8px;
    padding-bottom: 8px;
    outline: none;
`;

const StyledCarouselItem = styled(CarouselItem)`
    padding-right: 32px;

    &:last-child {
        padding-right: 0;
    }
`;

export function Gallery<T extends AnyObject>({
    items = [],
    onItemClick,
    onItemFocus,
    Component,
    children,
    className,
}: GalleryProps<T>): React.ReactElement {
    const currentCardIndex = React.useContext(GalleryIndexContext);
    const ComponentToRender = React.useMemo(() => {
        if (children) {
            return () => null;
        }

        return Component ?? GalleryCard;
    }, [Component, children]);

    const galleryItems = React.useMemo(() => {
        const canBeFocused = currentCardIndex > -1;

        if (typeof children !== 'undefined') {
            return null;
        }

        return items.map((card, index) => (
            <StyledCarouselItem key={index} scrollSnapAlign={isSberPortal() ? 'start' : undefined}>
                <ComponentToRender
                    index={index}
                    onClick={() => onItemClick?.(card, index)}
                    onFocus={() => onItemFocus?.()}
                    card={card}
                    focused={canBeFocused && currentCardIndex === index}
                />
            </StyledCarouselItem>
        ));
    }, [ComponentToRender, currentCardIndex, items, onItemClick, onItemFocus, children]);

    return React.useMemo(
        () => (
            <StyledCarouselWrapper data-cy="gallery" className={className}>
                <StyledCarousel
                    index={currentCardIndex}
                    axis="x"
                    tabIndex={-1}
                    scrollSnapType="mandatory"
                    scrollAlign="start"
                    animatedScrollByIndex
                >
                    {!children ? galleryItems : children}
                </StyledCarousel>
            </StyledCarouselWrapper>
        ),
        [currentCardIndex, galleryItems, children, className],
    );
}

export const GalleryWithNavigation = withNavigation(Gallery);
