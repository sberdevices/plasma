/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { MeasurementItem, VirtualDynamicProps } from './types';
import {
    calculateRange,
    defaultKeyExtractor,
    useIsomorphicLayoutEffect,
    useMeasurements,
    useVisibleItems,
    useWeakFlag,
} from './utils';
import { useKeyboard } from './utils/use-keyboard';
import { useOnScroll, useScrollToIndex } from './utils/use-scroll';
import { useVirualInit } from './utils/use-virtual-init';

export const useVirtualDynamic = (props: VirtualDynamicProps) => {
    const {
        parentRef,
        itemCount = 0,
        estimateSize,
        paddingStart = 0,
        paddingEnd = 0,
        scrollToFn,
        keyExtractor = defaultKeyExtractor,
        addItemsMode,
        align,
        horizontal = false,
        framesToThrottle,
    } = props;
    const {
        sizeKey,
        scrollKey,
        range,
        setRange,
        upIndex,
        downIndex,
        currentIndex,
        lastUpdateSource,
        setIsScrollingToIndexTrue,
        setCurrentIndexAfterScrolling,
        setRangeAndIsScrollingTrue,
        setIsScrollingFalse,
    } = useVirualInit(props);

    const latestRef = useRef<{
        scrollOffset: number;
        measurements: MeasurementItem[];
        scrollableSize: number;
    }>({
        scrollOffset: 0,
        measurements: [],
        scrollableSize: 0,
    });
    const [measuredCache, setMeasuredCache] = useState<Record<string, number>>({});
    const measurements = useMeasurements({
        estimateSize,
        itemCount,
        paddingStart,
        measuredCache,
        keyExtractor,
    });
    const visibleItems = useVisibleItems(range, measurements);
    const { scrollToIndex } = useScrollToIndex({
        parentRef,
        scrollKey,
        latestRef,
        itemCount,
        scrollToFn,
        setIsScrollingToIndexTrue,
    });

    const [scrollableSize, setScrollableSize] = useState(0);
    useEffect(() => {
        if (!parentRef.current) {
            return;
        }
        latestRef.current.scrollableSize = scrollableSize || parentRef.current[sizeKey];
        latestRef.current.measurements = measurements;
    }, [parentRef, sizeKey, measurements, scrollableSize]);

    const resizeObserverRef = useRef<ResizeObserver>();
    const observeItem = useCallback((el: HTMLElement) => resizeObserverRef.current?.observe(el), []);
    // TODO: передать элементу unregisterItem
    const unobserveItem = useCallback((el: HTMLElement) => resizeObserverRef.current?.unobserve(el), []);

    const [needRestoreScrollWeakFlag, setNeedRestoreScrollWeakFlag] = useWeakFlag(false);
    // const [programmaticallyScrollWeakFlag, setProgrammaticallyScrollWeakFlag] = useWeakFlag(false);

    useEffect(() => {
        // Если количество элементов изменилось, то считаем, что могли добавиться элементы
        // сверху, поэтому нужно восстановить позицию скрола
        if (latestRef.current.measurements && latestRef.current.measurements.length !== itemCount) {
            addItemsMode === 'prepend' && setNeedRestoreScrollWeakFlag(true);
        }
    });

    useIsomorphicLayoutEffect(() => {
        if (resizeObserverRef.current || !parentRef.current) return;

        // Наблюдатель за размером элементов виртуального списка и размером вьюпорта
        resizeObserverRef.current = new ResizeObserver((entries) => {
            const measuredCacheNew: Record<string, number> = {};

            entries.forEach((entry) => {
                const target = entry.target as HTMLElement;
                const entrySize = target[sizeKey];

                if (target === parentRef.current) {
                    return setScrollableSize(entrySize);
                }

                // TODO: подумать как заменить data-virtual-index
                const changedItemIndex = Number(target.dataset?.virtualIndex);

                if (Number.isNaN(changedItemIndex)) return;

                const cacheKey = keyExtractor(changedItemIndex);
                // Если изменился один из элементов виртуального списка

                if (measuredCache[cacheKey] === entrySize) return;

                measuredCacheNew[cacheKey] = entrySize;

                // Если позиция больше чем элемент, который изменился, то это значит, что изменился элемент выше
                // позиции скрола, изменилась высота вьюпорта, и надо восстановить позицию скрола
                if (latestRef.current.scrollOffset > latestRef.current.measurements[changedItemIndex].start) {
                    setNeedRestoreScrollWeakFlag(true);
                }
            });

            if (Object.keys(measuredCacheNew).length > 0) {
                setMeasuredCache((prev) => ({ ...prev, ...measuredCacheNew }));
            }
        });

        observeItem(parentRef.current);
        setScrollableSize(parentRef.current[sizeKey]);

        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
                resizeObserverRef.current = undefined;
            }
        };
    }, [keyExtractor, sizeKey, measuredCache, observeItem, setNeedRestoreScrollWeakFlag]);

    const prevTotalSizeRef = useRef<number>();
    const totalSize = (measurements[itemCount - 1]?.end || 0) + paddingEnd;
    // Срабатывает на изменение размера списка и скролящейся области, размер списка меняется,
    // если добавились новые элементы, или один из элементов виртуального списка поменял свои размеры
    // Нужен чтобы восстановить позицию скрола и пересчитать видимые элементы согласно новой позиции скрола
    // Должен решать проблему blinking/jumping при добавлении элементов сверху позиции скрола
    useIsomorphicLayoutEffect(() => {
        if (!parentRef.current) return;

        let scrollOffset = parentRef.current[scrollKey];

        if (needRestoreScrollWeakFlag.current) {
            const oldTotalSize = prevTotalSizeRef.current || 0;
            scrollOffset += totalSize - oldTotalSize;

            // setProgrammaticallyScrollWeakFlag(true);
            parentRef.current[scrollKey] = scrollOffset;
        }

        latestRef.current.scrollOffset = scrollOffset;
        setRange((prev) => calculateRange(latestRef.current, prev, itemCount));
    }, [needRestoreScrollWeakFlag, scrollKey, totalSize, scrollableSize, itemCount]);

    useOnScroll({
        parentRef,
        latestRef,
        setRange,
        setRangeAndIsScrollingTrue,
        setIsScrollingFalse,
        scrollKey,
        setCurrentIndexAfterScrolling,
        itemCount,
    });

    // TODO: additionalOnScroll
    // if (additionalOnScroll) {
    //     additionalOnScroll({
    //         ...latestRef.current,
    //         listSize: latestRef.current.totalSize,
    //         manual: !programmaticallyScrollWeakFlag.current,
    //     });
    // }

    const [prevRange, setPrevRange] = useState(range);
    const [prevCurrentIndex, setPrevCurrentIndex] = useState(currentIndex);

    if (range !== prevRange) {
        setPrevRange(range);
        setNeedRestoreScrollWeakFlag(false);
    }

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

    if (prevCurrentIndex !== currentIndex) {
        if (lastUpdateSource === 'keyboard') {
            scrollToIndex(currentIndex);
        }
        setPrevCurrentIndex(currentIndex);
    }

    return {
        visibleItems,
        totalSize,
        scrollToIndex,
        observeItem,
        unobserveItem,
        measuredCache,
        currentIndex,
        range,
        setNeedRestoreScrollWeakFlag,
        upIndex,
        downIndex,
        lastUpdateSource,
    };
};
