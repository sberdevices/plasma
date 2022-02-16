import { useMemo, useRef, useState } from 'react';

import { MeasurementItem, VirtualProps } from './types';
import { defaultKeyExtractor } from './utils';
import { useKeyboard } from './hooks-helpers/useKeyboard';
import { getMeasurementByIndex, useOnScroll, useScrollToIndex } from './hooks-helpers/useScroll';
import { useVirtualInit } from './hooks-helpers/useVirtualInit';
import { useIsomorphicLayoutEffect } from './hooks-helpers/useIsomorphicLayoutEffect';
import { useMeasurements } from './hooks-helpers/useMeasurements';
import { useVisibleItems } from './hooks-helpers/useVisibleItems';

export const useVirtual = (props: VirtualProps) => {
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
        align,
        horizontal = false,
        framesToThrottle,
        overscan = 0,
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
    } = useVirtualInit(props);

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
        overscan,
    });

    const { up, down } = useMemo(() => {
        const params = { align, itemCount };

        return {
            up: () => {
                upIndex(params);
            },
            down: () => {
                downIndex(params);
            },
        };
    }, [upIndex, downIndex, align, itemCount]);

    useKeyboard({
        up,
        down,
        horizontal,
        framesToThrottle,
        parentRef,
    });

    const [prevCurrentIndex, setPrevCurrentIndex] = useState(currentIndex);
    if (prevCurrentIndex !== currentIndex) {
        if (lastUpdateSource === 'keyboard') {
            scrollToIndex(currentIndex);
        }
        setPrevCurrentIndex(currentIndex);
    }

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
