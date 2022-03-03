import React, { RefObject } from 'react';
import styled from 'styled-components';
import {
    useVirtualCarousel,
    VirtualCarouselContext,
    VirtualCarousel as BaseCarousel,
    VirtualCarouselTrack as BaseTrack,
    VirtualCarouselProps as BaseProps,
    applyNoSelect,
} from '@sberdevices/plasma-core';
import { useVirtual } from '@sberdevices/use-virtual';

import { useForkRef } from '../../hooks';

export type VirtualCarouselProps = BaseProps & {
    /**
     * Сменить WAI-ARIA Role списка.
     */
    listRole?: string;
    /**
     * Сменить WAI-ARIA Label списка.
     */
    listAriaLabel?: string;
};

const StyledVirtualCarousel = styled(BaseCarousel)``;
const StyledVirtualCarouselTrack = styled(BaseTrack)`
    ${applyNoSelect};
`;

/**
 * Компонент для создания списков с прокруткой.
 */
// eslint-disable-next-line prefer-arrow-callback
export const VirtualCarousel = React.forwardRef<HTMLDivElement, VirtualCarouselProps>(function VirtualCarousel(
    {
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
        listRole,
        listAriaLabel,
        itemCount,
        estimateSize,
        overscan,
        renderItems,
        carouselHeight,
        ...rest
    },
    ref,
) {
    const { scrollRef, trackRef, refs, handleScroll } = useVirtualCarousel({
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
    });
    const handleRef = useForkRef<HTMLDivElement>(scrollRef as RefObject<HTMLDivElement>, ref);
    const { visibleItems, totalSize, currentIndex } = useVirtual({
        itemCount,
        parentRef: scrollRef as RefObject<HTMLDivElement>,
        horizontal: axis === 'x',
        paddingStart: (paddingStart ? parseFloat(paddingStart) : paddingStart) as number | undefined,
        paddingEnd: (paddingEnd ? parseFloat(paddingEnd) : paddingEnd) as number | undefined,
        estimateSize,
        overscan,
        scrollToFn: React.useCallback(
            (offset: number) => {
                console.log('scroll to fn');
                scrollRef.current!.scrollTo({ [axis === 'y' ? 'top' : 'left']: offset, behavior: 'smooth' });
                // animatedScrollToX(scrollRef.current as HTMLDivElement, offset);
            },
            [axis],
        ),
    });
    return (
        <VirtualCarouselContext.Provider value={{ axis, refs }}>
            <StyledVirtualCarousel
                ref={handleRef}
                axis={axis}
                scrollSnapType={scrollSnapType}
                onScroll={handleScroll}
                carouselHeight={carouselHeight}
                {...rest}
            >
                <StyledVirtualCarouselTrack
                    ref={trackRef as React.MutableRefObject<HTMLDivElement | null>}
                    axis={axis}
                    paddingStart={paddingStart}
                    paddingEnd={paddingEnd}
                    role={listRole}
                    aria-label={listAriaLabel}
                    style={{ [axis === 'x' ? 'width' : 'height']: `${totalSize}px` }}
                    carouselHeight={carouselHeight}
                >
                    {renderItems(visibleItems, currentIndex)}
                </StyledVirtualCarouselTrack>
            </StyledVirtualCarousel>
        </VirtualCarouselContext.Provider>
    );
});
