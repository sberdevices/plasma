/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useLayoutEffect, useEffect, useState, useReducer, useRef, useCallback, useMemo } from 'react';
// import observeRect from '@reach/observe-rect';

// import { webTelemetryKV } from '../../../analytics';

import { LatestRefData, MeasurementItem, Range, VirtualProps } from './types';

export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const rectReducer = (state: DOMRect | null, action: { rect: DOMRect }): null | DOMRect => {
    const { rect } = action;

    if (!state || state.height !== rect.height || state.width !== rect.width) {
        return rect;
    }

    return state;
};

export const useRect = (nodeRef: React.RefObject<HTMLElement>) => {
    const [element, setElement] = useState<HTMLElement | null>(nodeRef.current);
    const [rect, dispatch] = useReducer(rectReducer, null);
    const initialRectSet = useRef(false);

    useIsomorphicLayoutEffect(() => {
        if (nodeRef.current !== element) {
            setElement(nodeRef.current);
        }
    });

    useIsomorphicLayoutEffect(() => {
        if (element && !initialRectSet.current) {
            initialRectSet.current = true;
            const rect = element.getBoundingClientRect();
            dispatch({ rect });
        }
    }, [element]);

    useEffect(() => {
        if (!element) {
            return;
        }
        // @ts-ignore
        const observer = observeRect(element, (rect) => {
            dispatch({ rect });
        });

        observer.observe();

        return () => {
            observer.unobserve();
        };
    }, [element]);

    return rect;
};

export const findNearestBinarySearch = (
    low: number,
    high: number,
    getCurrentValue: (index: number) => number,
    value: number,
) => {
    while (low <= high) {
        // eslint-disable-next-line no-bitwise
        const middle = ((low + high) / 2) | 0;
        const currentValue = getCurrentValue(middle);

        if (currentValue < value) {
            low = middle + 1;
        } else if (currentValue > value) {
            high = middle - 1;
        } else {
            return middle;
        }
    }

    if (low > 0) {
        return low - 1;
    }

    return 0;
};

export const calculateRange = ({ measurements, scrollableSize, scrollOffset }: LatestRefData, prevRange: Range) => {
    const size = measurements.length - 1;
    const getOffset = (index: number) => measurements[index].start;

    const start = findNearestBinarySearch(0, size, getOffset, scrollOffset);
    let end = start;

    while (end < size && measurements[end].end < scrollOffset + scrollableSize) {
        end++;
    }

    if (prevRange.start !== start || prevRange.end !== end) {
        return { start, end };
    }

    return prevRange;
};

export const defaultEstimateSize = () => 50;

export const defaultKeyExtractor = (index: number) => index;

export const defaultMeasureSize = (el: HTMLElement, horizontal?: boolean) => {
    const key = horizontal ? 'offsetWidth' : 'offsetHeight';

    return el[key];
};

export function useWeakFlag(initialValue: boolean) {
    const ref = useRef(initialValue);
    const updater = useCallback((value: boolean) => {
        ref.current = value;
    }, []);

    return [ref, updater] as const;
}

export const useMeasurements = ({
    estimateSize = defaultEstimateSize,
    itemCount,
    paddingStart,
    measuredCache,
    keyExtractor,
}: {
    estimateSize?: VirtualProps['estimateSize'];
    itemCount: number;
    paddingStart: number;
    keyExtractor: Required<VirtualProps>['keyExtractor'];
    /**
     * используется для динамического (неизвестного
     * до рендера) размера элемента
     */
    measuredCache?: Record<string, number>;
}) => {
    const measurements = useMemo(() => {
        const result: MeasurementItem[] = [];
        for (let i = 0; i < itemCount; i++) {
            const cacheKey = keyExtractor(i);
            const cachedSize = measuredCache?.[cacheKey];
            const start = result[i - 1] ? result[i - 1].end : paddingStart;
            const size = typeof cachedSize === 'number' ? cachedSize : estimateSize(i);
            // TODO check measuredCache[cacheKey]
            // measuredCache[cacheKey] = size;
            const end = start + size;
            result[i] = { index: i, start, size, end };
        }

        return result;
    }, [itemCount, paddingStart, estimateSize, measuredCache, keyExtractor]);

    return measurements;
};

export function useVisibleItems<MI = MeasurementItem>(range: Range, measurements: MI[]) {
    const visibleItems = useMemo(() => {
        if (range.start === 0 && range.end === 0) return [];

        const result: MI[] = [];
        const end = Math.min(range.end, measurements.length - 1);

        for (let i = range.start; i <= end; i++) {
            result.push(measurements[i]);
        }

        return result;
        // Правило срабатывает на generic "MI", что не должно быть.
        // React Hook useMemo has a missing dependency: 'MI'. Either include it or remove the dependency array.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [range.start, range.end, measurements]);

    return visibleItems;
}

const NUMBER_OF_METRICS_TO_COLLECT = 4;
// TODO: inject webTelemetryKV from component
// const sendMetrics = async (
// payload: Array<{
//     frameDuration: number;
//     frameCounter: number;
// }>,
// ) => {
// const meta = {
//     widget: 'useVirtual',
//     event: 'scroll',
// };
// for (const { frameDuration, frameCounter } of payload) {

// TODO: pass webTelemetryKV instance
// webTelemetryKV.push(
//     {
//         key: 'frameDuration',
//         value: frameDuration,
//     },
//     meta,
// );
// webTelemetryKV.push(
//     {
//         key: 'frameCounter',
//         value: frameCounter,
//     },
//     meta,
// );
// }
// };

export const useMetricsMeasureScroll = () => {
    const ref = useRef<{
        buffer: number[];
        now: number;
        prevEvent: 'rAF' | 'scroll';
        lastScrollNow: null | number;
        metrics: Array<{
            frameDuration: number;
            frameCounter: number;
        }>;
    }>({
        buffer: [],
        now: 0,
        prevEvent: 'rAF',
        lastScrollNow: null,
        metrics: [],
    });

    useEffect(() => {
        ref.current.now = performance.now();
        const runMetric = () => {
            if (ref.current.metrics.length >= NUMBER_OF_METRICS_TO_COLLECT) {
                return;
            }

            const newNow = performance.now();
            const diff = newNow - ref.current.now;

            if (ref.current.prevEvent === 'scroll') {
                ref.current.buffer.push(diff);
            } else if (ref.current.prevEvent === 'rAF' && ref.current.buffer.length > 0) {
                const { buffer } = ref.current;
                ref.current.lastScrollNow = newNow;
                ref.current.metrics.push({
                    frameDuration: Math.round(buffer.reduce((a, b) => a + b, 0) / buffer.length),
                    frameCounter: buffer.length,
                });
                ref.current.buffer = [];
            }

            ref.current.prevEvent = 'rAF';
            ref.current.now = newNow;
            requestAnimationFrame(runMetric);

            if (ref.current.metrics.length >= NUMBER_OF_METRICS_TO_COLLECT) {
                // sendMetrics(ref.current.metrics);
            }
        };
        runMetric();
    }, []);

    const measureScroll = useCallback(() => {
        ref.current.prevEvent = 'scroll';
    }, []);

    return measureScroll;
};
