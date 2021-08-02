import React from 'react';
import styled from 'styled-components';
import {
    useCarousel,
    CarouselContext,
    CarouselGridWrapper as BaseWrapper,
    Carousel as BaseCarousel,
    CarouselTrack as BaseTrack,
} from '@sberdevices/plasma-core';
import type { CarouselProps as BaseProps, AsProps } from '@sberdevices/plasma-core';

export type CarouselProps = Omit<BaseProps, 'axis' | 'animatedScrollByIndex' | 'throttleMs' | 'debounceMs'> &
    AsProps &
    React.HTMLAttributes<HTMLDivElement> & {};

export const CarouselGridWrapper = styled(BaseWrapper)``;
const StyledCarousel = styled(BaseCarousel)``;
const StyledCarouselTrack = styled(BaseTrack)`
    margin: 0;
    padding: 0;

    list-style: none;
`;

/**
 * Компонент для создания списков с прокруткой.
 */
export const Carousel: React.FC<CarouselProps> = ({
    index,
    scrollSnapType = 'mandatory',
    scrollAlign,
    detectActive,
    detectThreshold,
    scaleCallback,
    scaleResetCallback,
    onScroll,
    onIndexChange,
    paddingStart,
    paddingEnd,
    children,
    ...rest
}) => {
    const axis = 'x';
    const { scrollRef, trackRef, refs, handleScroll } = useCarousel({
        index,
        axis,
        scrollAlign,
        detectActive,
        detectThreshold,
        scaleCallback,
        scaleResetCallback,
        onScroll,
        onIndexChange,
    });

    return (
        <CarouselContext.Provider value={{ axis, refs }}>
            <StyledCarousel
                ref={scrollRef}
                axis={axis}
                scrollSnapType={scrollSnapType}
                onScroll={handleScroll}
                {...rest}
            >
                <StyledCarouselTrack
                    as="ul"
                    ref={trackRef as React.MutableRefObject<HTMLUListElement | null>}
                    axis={axis}
                    paddingStart={paddingStart}
                    paddingEnd={paddingEnd}
                >
                    {children}
                </StyledCarouselTrack>
            </StyledCarousel>
        </CarouselContext.Provider>
    );
};
