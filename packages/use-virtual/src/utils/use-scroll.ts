import { useCallback } from 'react';

import { LatestRefData, VirtualProps, Range, MeasurementItem } from '../types';
import { calculateRange, useIsomorphicLayoutEffect, useMetricsMeasureScroll } from '../utils';

import { debounceByFrames } from './helpers';
import { UseVirualInit } from './use-virtual-init';

const FRAMES_TO_DEBOUNCE_IS_SCROLLING_FALSE = 5;

export const useOnScroll = ({
    parentRef,
    latestRef,
    setRange,
    setRangeAndIsScrollingTrue,
    setIsScrollingFalse,
    scrollKey,
}: {
    parentRef: VirtualProps['parentRef'];
    latestRef: React.RefObject<LatestRefData>;
    setRange: UseVirualInit['setRange'];
    setRangeAndIsScrollingTrue: UseVirualInit['setRangeAndIsScrollingTrue'];
    setIsScrollingFalse: UseVirualInit['setIsScrollingFalse'];
    scrollKey: UseVirualInit['scrollKey'];
}) => {
    const metricsMeasureScroll = useMetricsMeasureScroll();

    useIsomorphicLayoutEffect(() => {
        if (!parentRef.current) return;
        const scrollableParent = parentRef.current;

        const debouncedSetIsScrollingFalse = debounceByFrames(
            setIsScrollingFalse,
            FRAMES_TO_DEBOUNCE_IS_SCROLLING_FALSE,
        );
        const onScroll = (event?: Event) => {
            const isScrolling = Boolean(event);

            if (isScrolling) {
                metricsMeasureScroll();
            }
            const latestData = latestRef.current;

            if (!latestData) {
                return;
            }
            const scrollOffset = scrollableParent[scrollKey];
            latestData.scrollOffset = scrollOffset;

            if (latestRef.current?.useIsScrolling && isScrolling) {
                setRangeAndIsScrollingTrue((prevRange: Range) => calculateRange(latestData, prevRange));
                debouncedSetIsScrollingFalse();
            } else {
                setRange((prevRange: Range) => calculateRange(latestData, prevRange));
            }

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

        onScroll();
        scrollableParent.addEventListener('scroll', onScroll, {
            capture: false,
            passive: true,
        });

        return () => scrollableParent.removeEventListener('scroll', onScroll);
    }, [scrollKey, metricsMeasureScroll]);
};

export const getMeasurementByIndex = (measurements: MeasurementItem[], index: number, itemsLength: number) => {
    return measurements[Math.max(0, Math.min(index, itemsLength - 1))];
};
export const useScrollToIndex = ({
    parentRef,
    scrollKey,
    latestRef,
    scrollToFn,
    itemsLength,
}: {
    parentRef: React.RefObject<HTMLDivElement>;
    scrollKey: 'scrollLeft' | 'scrollTop';
    latestRef: React.RefObject<LatestRefData>;
    itemsLength: number;
    scrollToFn?: (offset: number) => void;
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
        (index, { align = 'center' } = {}) => {
            if (!latestRef.current) {
                return;
            }
            const { measurements, scrollOffset, scrollableSize } = latestRef.current;

            const measurement = getMeasurementByIndex(measurements, index, itemsLength);

            if (!measurement) {
                return;
            }

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
        [scrollToOffset, itemsLength, latestRef],
    );

    const scrollToIndex = useCallback(
        (index: number, params?: { align: 'auto' | 'center' | 'start' | 'end' }) => {
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
