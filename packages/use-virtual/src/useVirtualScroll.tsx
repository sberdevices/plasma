import { useRef } from 'react';

import { MeasurementItem, VirtualProps } from './types';
import { defaultKeyExtractor, useIsomorphicLayoutEffect, useMeasurements, useVisibleItems } from './utils';
import { getMeasurementByIndex, useOnScroll, useScrollToIndex } from './utils/use-scroll';
import { useVirualInit } from './utils/use-virtual-init';

export const useVirtualScroll = (props: VirtualProps) => {
    const {
        parentRef,
        itemCount = 0,
        estimateSize,
        paddingStart = 0,
        paddingEnd = 0,
        scrollToFn,
        keyExtractor = defaultKeyExtractor,
        useIsScrolling,
        initialRange,
        debouncedFramesScrollSync,
    } = props;

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
        lastUpdateSource,
        setCurrentIndexAfterScrolling,
        setIsScrollingToIndexTrue,
    } = useVirualInit(props);

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
        itemCount,
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
    const { defaultScrollToFn, scrollToIndex } = useScrollToIndex({
        parentRef,
        scrollKey,
        latestRef,
        itemCount,
        scrollToFn,
        setIsScrollingToIndexTrue,
    });

    /**
     * Если есть initialRange и initialRange.start !== 0,
     * то при монтировании компонента необходимо
     * установить валидный (scrollLeft или scrollTop) у контейнера.
     */
    const initialRangeRef = useRef(initialRange);
    const defaultScrollToFnRef = useRef(defaultScrollToFn);
    useIsomorphicLayoutEffect(() => {
        if (typeof initialRangeRef.current?.start === 'number' && initialRangeRef.current?.start !== 0) {
            const measurement = getMeasurementByIndex(
                measurements,
                initialRangeRef.current.start,
                initialRangeRef.current.end,
            );
            if (!measurement) {
                return;
            }

            defaultScrollToFnRef.current(measurement.start);
        }
    }, []);

    useOnScroll({
        parentRef,
        latestRef,
        setRange,
        scrollKey,
        setRangeAndIsScrollingTrue,
        setIsScrollingFalse,
        setCurrentIndexAfterScrolling,
        debouncedFramesScrollSync,
        itemCount,
    });

    return {
        visibleItems,
        totalSize: (measurements[itemCount - 1]?.end || 0) + paddingEnd,
        scrollToIndex,
        upIndex,
        downIndex,
        currentIndex,
        isScrolling,
        lastUpdateSource,
    };
};
