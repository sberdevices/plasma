import React from 'react';
import styled from 'styled-components';
import { CarouselGridWrapper, Carousel, CarouselItem } from '@sberdevices/plasma-ui';
import { isSberBox, isSberPortal } from '@sberdevices/plasma-ui/utils';

import { AnyObject } from '../../types';
import { GalleryCard as DefaultGalleryCard } from '../GalleryCard/GalleryCard';
import { useDelayedActivation } from '../../hooks/useDelayedActivation';

import { GalleryIndexContext, withNavigation } from './hocs/withNavigation';
import { GalleryProps, GalleryWithNavigationProps } from './types';

const StyledCarouselWrapper = styled(CarouselGridWrapper)`
    margin-top: -8px;
`;

const StyledCarousel = styled(Carousel)<{ initialized: boolean }>`
    box-sizing: border-box;
    padding-top: 8px;
    padding-bottom: 8px;
    outline: none;
    scroll-snap-type: none;
    scroll-behavior: ${({ initialized }) => (initialized && isSberBox() ? 'smooth' : 'unset')};
`;

const StyledCarouselItem = styled(CarouselItem)`
    padding-right: 32px;

    &:last-child {
        padding-right: 0;
    }
`;

export function Gallery<T extends AnyObject>({
    items = [],
    onItemClick = () => {},
    onItemFocus = () => {},
    Component,
    children,
    className,
}: GalleryProps<T>): React.ReactElement {
    const currentCardIndex = React.useContext(GalleryIndexContext);
    const initialized = useDelayedActivation();

    const canBeFocused = isSberBox() && currentCardIndex > -1;

    const GalleryCard = Component ?? DefaultGalleryCard;

    return (
        <StyledCarouselWrapper data-cy="gallery">
            <StyledCarousel
                className={className}
                index={currentCardIndex}
                axis="x"
                tabIndex={-1}
                scrollSnapType="mandatory"
                scrollAlign="start"
                initialized={initialized}
            >
                {children ??
                    items.map((card, index) => (
                        <StyledCarouselItem key={index} scrollSnapAlign={isSberPortal() ? 'start' : undefined}>
                            <GalleryCard
                                card={card}
                                index={index}
                                onClick={onItemClick}
                                onFocus={onItemFocus}
                                focused={canBeFocused && currentCardIndex === index}
                            />
                        </StyledCarouselItem>
                    ))}
            </StyledCarousel>
        </StyledCarouselWrapper>
    );
}

export const GalleryWithNavigation = React.memo(withNavigation(Gallery)) as <T extends AnyObject = AnyObject>(
    props: GalleryWithNavigationProps<T>,
) => React.ReactElement;
