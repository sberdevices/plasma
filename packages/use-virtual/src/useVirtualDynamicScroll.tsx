/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useRef, useState } from 'react';

import { MeasurementItem, VirtualDynamicProps } from './types';
import {
    calculateRange,
    defaultKeyExtractor,
    useIsomorphicLayoutEffect,
    useMeasurements,
    useVisibleItems,
    useWeakFlag,
} from './utils';
import { useOnScroll, useScrollToIndex } from './utils/use-scroll';
import { useVirualInit } from './utils/use-virtual-init';

export const useVirtualDynamicScroll = ({
    parentRef,
    horizontal = false,
    itemsLength = 0,
    estimateSize,
    paddingStart = 0,
    paddingEnd = 0,
    scrollToFn,
    keyExtractor = defaultKeyExtractor,
    addItemsMode,
}: VirtualDynamicProps) => {
    const { sizeKey, scrollKey, range, setRange, upIndex, downIndex, currentIndex } = useVirualInit({ horizontal });

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
        itemsLength,
        paddingStart,
        measuredCache,
        keyExtractor,
    });
    const visibleItems = useVisibleItems(range, measurements);
    const scrollToIndex = useScrollToIndex({
        parentRef,
        scrollKey,
        latestRef,
        itemsLength,
        scrollToFn,
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
        if (latestRef.current.measurements && latestRef.current.measurements.length !== itemsLength) {
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
    const totalSize = (measurements[itemsLength - 1]?.end || 0) + paddingEnd;
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
        setRange((prev) => calculateRange(latestRef.current, prev));
    }, [needRestoreScrollWeakFlag, scrollKey, totalSize, scrollableSize]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useOnScroll({
        parentRef,
        latestRef,
        setRange,
        scrollKey,
    });

    // TODO: additionalOnScroll
    // if (additionalOnScroll) {
    //     additionalOnScroll({
    //         ...latestRef.current,
    //         listSize: latestRef.current.totalSize,
    //         manual: !programmaticallyScrollWeakFlag.current,
    //     });
    // }

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
    };
};
