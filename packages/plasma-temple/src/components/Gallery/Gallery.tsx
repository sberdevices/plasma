import React from 'react';
import styled from 'styled-components';
import { CarouselGridWrapper, Carousel, CarouselItem } from '@sberdevices/plasma-ui';
import { isSberBox, isSberPortal } from '@sberdevices/plasma-ui/utils';

import { GalleryCardContainer } from '../GalleryCard/GalleryCardContainer';
import { AnyObject } from '../../types';
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
    Component,
    children,
    className,
}: GalleryProps<T>): React.ReactElement {
    const currentCardIndex = React.useContext(GalleryIndexContext);
    const initialized = useDelayedActivation();

    const canBeFocused = currentCardIndex > -1;

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
                            <GalleryCardContainer<T>
                                card={card}
                                index={index}
                                component={Component}
                                onClick={onItemClick}
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
