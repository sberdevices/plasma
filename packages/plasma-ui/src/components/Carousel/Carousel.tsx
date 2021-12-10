import React from 'react';
import styled from 'styled-components';
import {
    useCarousel,
    CarouselContext,
    Carousel as BaseCarousel,
    CarouselTrack as BaseTrack,
    CarouselProps,
    applyNoSelect,
} from '@sberdevices/plasma-core';

import { useForkRef } from '../../hooks';

const StyledCarousel = styled(BaseCarousel)``;
const StyledCarouselTrack = styled(BaseTrack)`
    ${applyNoSelect};
`;

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
