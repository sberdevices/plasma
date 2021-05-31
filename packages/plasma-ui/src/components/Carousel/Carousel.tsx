import React from 'react';
import styled from 'styled-components';
import {
    useCarousel,
    CarouselContext,
    CarouselGridWrapper as BaseWrapper,
    Carousel as BaseCarousel,
    CarouselTrack as BaseTrack,
    CarouselProps as BaseProps,
} from '@sberdevices/plasma-core';
import type { AsProps } from '@sberdevices/plasma-core';

import { useForkRef } from '../../hooks';

export type CarouselProps = BaseProps & AsProps & React.HTMLAttributes<HTMLDivElement> & {};

export const CarouselGridWrapper = styled(BaseWrapper)``;
const StyledCarousel = styled(BaseCarousel)``;
const StyledCarouselTrack = styled(BaseTrack)``;

/**
 * Компонент для создания списков с прокруткой.
 */
// eslint-disable-next-line prefer-arrow-callback
export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
    {
        index = 0,
        axis = 'x',
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
        throttleMs,
        debounceMs,
        animatedScrollByIndex,
        children,
        ...rest
    },
    ref,
) {
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
        throttleMs,
        debounceMs,
        animatedScrollByIndex,
    });
    const handleRef = useForkRef(scrollRef, ref);

    return (
        <CarouselContext.Provider value={{ axis, refs }}>
            <StyledCarousel
                ref={handleRef}
                axis={axis}
                scrollSnapType={scrollSnapType}
                onScroll={handleScroll}
                {...rest}
            >
                <StyledCarouselTrack
                    ref={trackRef as React.MutableRefObject<HTMLDivElement | null>}
                    axis={axis}
                    paddingStart={paddingStart}
                    paddingEnd={paddingEnd}
                >
                    {children}
                </StyledCarouselTrack>
            </StyledCarousel>
        </CarouselContext.Provider>
    );
});
