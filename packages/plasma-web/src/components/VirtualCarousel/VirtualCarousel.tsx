import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import {
    VirtualCarouselContext,
    CarouselGridWrapper as BaseWrapper,
    VirtualCarousel as BaseCarousel,
    VirtualCarouselTrack as BaseTrack,
    VirtualCarouselItemRefs,
    animatedScrollToX,
    useVirtualCarousel,
} from '@sberdevices/plasma-core';
import type { VirtualCarouselProps as BaseProps } from '@sberdevices/plasma-core';
import { useVirtual } from '@sberdevices/use-virtual';

export type VirtualCarouselProps = Omit<BaseProps, 'axis' | 'animatedScrollByIndex' | 'throttleMs' | 'debounceMs'> & {
    /**
     * При значении `polite` скринридер будет объявлять переключаемые слайды.
     */
    ariaLive?: 'off' | 'polite';
};

export const VirtualCarouselGridWrapper = styled(BaseWrapper)``;
const VirtualStyledCarousel = styled(BaseCarousel)``;
const VirtualStyledCarouselTrack = styled(BaseTrack)`
    margin: 0;
    padding: 0;

    list-style: none;
`;

/**
 * Компонент для создания списков с прокруткой.
 */
export const VirtualCarousel: React.FC<VirtualCarouselProps> = ({
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
    ariaLive = 'off',
    itemCount,
    estimateSize,
    overscan,
    renderItems,
  carouselHeight,
    ...rest
}) => {
    const axis = 'x';

    const { scrollRef, trackRef, refs, handleScroll } = useVirtualCarousel({
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
    const { visibleItems, totalSize, currentIndex } = useVirtual({
        itemCount,
        parentRef: scrollRef,
        horizontal: true,
        paddingStart: (paddingStart ? parseFloat(paddingStart) : paddingStart) as number | undefined,
        paddingEnd: (paddingEnd ? parseFloat(paddingEnd) : paddingEnd) as number | undefined,
        estimateSize,
        overscan,
        scrollToFn: useCallback((offset: number) => {
            animatedScrollToX(scrollRef.current as HTMLDivElement, offset);
        }, []),
    });

    return (
        <VirtualCarouselContext.Provider value={{ axis, refs }}>
            <VirtualStyledCarousel
                ref={scrollRef}
                onScroll={handleScroll}
                axis={axis}
                scrollSnapType={scrollSnapType}
                {...rest}
            >
                <VirtualStyledCarouselTrack
                    ref={trackRef as React.MutableRefObject<HTMLDivElement | null>}
                    axis={axis}
                    paddingStart={paddingStart}
                    paddingEnd={paddingEnd}
                    aria-live={ariaLive}
                    style={{ width: `${totalSize}px` }}
                    carouselHeight={350}
                >
                    {renderItems(visibleItems, currentIndex)}
                </VirtualStyledCarouselTrack>
            </VirtualStyledCarousel>
        </VirtualCarouselContext.Provider>
    );
};
