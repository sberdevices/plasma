import { useRef } from 'react';

import { MeasurementItem, VirtualProps } from './types';
import { defaultKeyExtractor, useIsomorphicLayoutEffect, useMeasurements, useVisibleItems } from './utils';
import { useOnScroll, useScrollToIndex } from './utils/use-scroll';
import { useVirualInit } from './utils/use-virtual-init';

export const useVirtualScroll = ({
    parentRef,
    horizontal = false,
    itemsLength = 0,
    estimateSize,
    paddingStart = 0,
    paddingEnd = 0,
    scrollToFn,
    keyExtractor = defaultKeyExtractor,
    useIsScrolling,
}: VirtualProps) => {
    const {
        sizeKey,
        scrollKey,
        range,
        setRange,
        setRangeAndIsScrollingTrue,
        setIsScrollingFalse,
        upIndex,
        downIndex,
        currentIndex,
        isScrolling,
    } = useVirualInit({
        horizontal,
    });
    const latestRef = useRef<{
        scrollOffset: number;
        measurements: MeasurementItem[];
        scrollableSize: number;
        useIsScrolling?: boolean;
    }>({
        scrollOffset: 0,
        measurements: [],
        scrollableSize: 0,
        useIsScrolling,
    });
    const measurements = useMeasurements({
        estimateSize,
        itemsLength,
        paddingStart,
        keyExtractor,
    });

    useIsomorphicLayoutEffect(() => {
        if (!parentRef.current) {
            return;
        }
        latestRef.current.scrollableSize = parentRef.current[sizeKey];
        latestRef.current.measurements = measurements;
        latestRef.current.useIsScrolling = useIsScrolling;
    }, [useIsScrolling, measurements, parentRef, sizeKey]);

    const visibleItems = useVisibleItems(range, measurements);
    const scrollToIndex = useScrollToIndex({
        parentRef,
        scrollKey,
        latestRef,
        itemsLength,
        scrollToFn,
    });

    useOnScroll({
        parentRef,
        latestRef,
        setRange,
        scrollKey,
        setRangeAndIsScrollingTrue,
        setIsScrollingFalse,
    });

    return {
        visibleItems,
        totalSize: (measurements[itemsLength - 1]?.end || 0) + paddingEnd,
        scrollToIndex,
        upIndex,
        downIndex,
        currentIndex,
        isScrolling,
    };
};
