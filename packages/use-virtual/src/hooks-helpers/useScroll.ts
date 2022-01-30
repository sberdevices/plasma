import { useCallback, useMemo } from 'react';

import { LatestRefData, VirtualProps, VisibleRange, MeasurementItem } from '../types';
import { calculateRange, debounceByFrames, findNearestBinarySearch } from '../utils';

import { UseVirualInit } from './useVirtualInit';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { useMetricsMeasureScroll } from './useMetricsMeasureScroll';

const FRAMES_TO_DEBOUNCE_IS_SCROLLING_FALSE = 5;

export const useOnScroll = ({
    parentRef,
    latestRef,
    setRange,
    setRangeAndIsScrollingTrue,
    setIsScrollingFalse,
    scrollKey,
    setCurrentIndexAfterScrolling,
    debouncedFramesScrollSync = 1,
    itemCount,
}: {
    parentRef: VirtualProps['parentRef'];
    latestRef: React.RefObject<LatestRefData>;
    setRange: UseVirualInit['setRange'];
    setRangeAndIsScrollingTrue: UseVirualInit['setRangeAndIsScrollingTrue'];
    setIsScrollingFalse: UseVirualInit['setIsScrollingFalse'];
    scrollKey: UseVirualInit['scrollKey'];
    setCurrentIndexAfterScrolling: UseVirualInit['setCurrentIndexAfterScrolling'];
    debouncedFramesScrollSync?: number;
    itemCount: number;
}) => {
    const metricsMeasureScroll = useMetricsMeasureScroll();

    const onScroll = useMemo(() => {
        const debouncedSetIsScrollingFalse = debounceByFrames(
            setIsScrollingFalse,
            FRAMES_TO_DEBOUNCE_IS_SCROLLING_FALSE,
        );
        const debouncedSetCurrentIndex = debounceByFrames(
            (isScrolling: boolean, align: 'center' | 'start' | 'end' = 'center') => {
                if (!latestRef.current || !isScrolling) {
                    return;
                }

                const { scrollOffset, scrollableSize, measurements } = latestRef.current;
                let offset = 0;
                if (align === 'start') {
                    offset = scrollOffset;
                } else if (align === 'end') {
                    offset = scrollOffset + scrollableSize;
                } else if (align === 'center') {
                    offset = scrollOffset + scrollableSize / 2;
                }

                const getOffset = (index: number) => measurements[index].start;

                const newCurrentIndex = findNearestBinarySearch(0, measurements.length - 1, getOffset, offset);

                setCurrentIndexAfterScrolling(newCurrentIndex);
            },
            debouncedFramesScrollSync,
        );

        return (event?: Event) => {
            if (!parentRef.current) return;

            const isScrolling = Boolean(event);

            if (isScrolling) {
                metricsMeasureScroll();
            }
            const latestData = latestRef.current;

            if (!latestData) {
                return;
            }
            const scrollOffset = parentRef.current[scrollKey];
            latestData.scrollOffset = scrollOffset;

            if (latestRef.current?.useIsScrolling && isScrolling) {
                setRangeAndIsScrollingTrue((prevRange: VisibleRange) =>
                    calculateRange(latestData, prevRange, itemCount),
                );
                debouncedSetIsScrollingFalse();
            } else {
                setRange((prevRange: VisibleRange) => calculateRange(latestData, prevRange, itemCount));
            }
            debouncedSetCurrentIndex(isScrolling);

            // TODO: additionalOnScroll
            // if (additionalOnScroll) {
            //     additionalOnScroll({
            //         ...latestRef.current,
            //         listSize: latestRef.current.totalSize,
            //         manual: !programmaticallyScrollWeakFlag.current,
            //     });
            // }

            // setNeedRestoreScrollWeakFlag(false);
            // setProgrammaticallyScrollWeakFlag(false);
        };
    }, [
        scrollKey,
        metricsMeasureScroll,
        debouncedFramesScrollSync,
        parentRef,
        latestRef,
        setIsScrollingFalse,
        setRangeAndIsScrollingTrue,
        setCurrentIndexAfterScrolling,
        setRange,
        itemCount,
    ]);

    useIsomorphicLayoutEffect(() => {
        if (!parentRef.current) return;
        const scrollableParent = parentRef.current;

        onScroll();
        scrollableParent.addEventListener('scroll', onScroll, {
            capture: false,
            passive: true,
        });

        return () => scrollableParent.removeEventListener('scroll', onScroll);
    }, [parentRef, onScroll]);
};

export const getMeasurementByIndex = (measurements: MeasurementItem[], index: number, itemCount: number) => {
    return measurements[Math.max(0, Math.min(index, itemCount - 1))];
};

type ScrollParams = {
    align?: 'auto' | 'center' | 'start' | 'end';
    setCurrentIndex?: boolean;
};
export const useScrollToIndex = ({
    parentRef,
    scrollKey,
    latestRef,
    scrollToFn,
    itemCount,
    setIsScrollingToIndexTrue,
}: {
    parentRef: React.RefObject<HTMLDivElement>;
    scrollKey: 'scrollLeft' | 'scrollTop';
    latestRef: React.RefObject<LatestRefData>;
    itemCount: number;
    scrollToFn?: (offset: number) => void;
    setIsScrollingToIndexTrue: UseVirualInit['setIsScrollingToIndexTrue'];
}) => {
    const defaultScrollToFn = useCallback(
        (offset) => {
            if (parentRef.current) {
                parentRef.current[scrollKey] = offset;
            }
        },
        [parentRef, scrollKey],
    );
    const scrollToFnOverride = useCallback(
        (offset) => {
            const goTo = scrollToFn || defaultScrollToFn;
            goTo(offset);
        },
        [defaultScrollToFn, scrollToFn],
    );

    const scrollToOffset = useCallback(
        (toOffset, { align = 'start' } = {}) => {
            if (!latestRef.current) {
                return;
            }
            const { scrollOffset, scrollableSize } = latestRef.current;

            if (align === 'auto') {
                if (toOffset <= scrollOffset) {
                    align = 'start';
                } else if (toOffset >= scrollOffset + scrollableSize) {
                    align = 'end';
                } else {
                    align = 'start';
                }
            }

            if (align === 'start') {
                scrollToFnOverride(toOffset);
            } else if (align === 'end') {
                scrollToFnOverride(toOffset - scrollableSize);
            } else if (align === 'center') {
                scrollToFnOverride(toOffset - scrollableSize / 2);
            }
        },
        [scrollToFnOverride, latestRef],
    );

    const scrollToIndexNoRAF = useCallback(
        (index: number, params: ScrollParams) => {
            if (!latestRef.current) {
                return;
            }
            setIsScrollingToIndexTrue(params.setCurrentIndex ? index : undefined);

            const { measurements, scrollOffset, scrollableSize } = latestRef.current;

            const measurement = getMeasurementByIndex(measurements, index, itemCount);

            if (!measurement) {
                return;
            }

            let { align } = params;
            if (align === 'auto') {
                if (measurement.end >= scrollOffset + scrollableSize) {
                    align = 'end';
                } else if (measurement.start <= scrollOffset) {
                    align = 'start';
                } else {
                    return;
                }
            }

            const toOffset =
                // eslint-disable-next-line no-nested-ternary
                align === 'center'
                    ? measurement.start + measurement.size / 2
                    : align === 'end'
                    ? measurement.end
                    : measurement.start;

            scrollToOffset(toOffset, { align });
        },
        [scrollToOffset, itemCount, latestRef, setIsScrollingToIndexTrue],
    );

    const scrollToIndex = useCallback(
        (index: number, params: ScrollParams = { align: 'center', setCurrentIndex: false }) => {
            requestAnimationFrame(() => {
                scrollToIndexNoRAF(index, params);
            });
        },
        [scrollToIndexNoRAF],
    );

    return {
        defaultScrollToFn,
        scrollToIndex,
    };
};
