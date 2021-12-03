import { useMemo, useRef } from 'react';

import { VirtualPropsKeyboard } from './types';
import { defaultKeyExtractor, useIsomorphicLayoutEffect, useMeasurements, useVisibleItems } from './utils';
import { useKeyboard } from './utils/use-keyboard';
import { useVirualInit } from './utils/use-virtual-init';

export const useVirtualKeyboard = ({
    size = 0,
    limit,
    horizontal = true,
    align,
    estimateSize,
    paddingStart = 0,
    paddingEnd = 0,
    keyExtractor = defaultKeyExtractor,
    ...props
}: VirtualPropsKeyboard) => {
    const latestRef = useRef({
        limit,
        size,
        align,
    });
    useIsomorphicLayoutEffect(() => {
        latestRef.current.limit = limit;
        latestRef.current.size = size;
        latestRef.current.align = align;
    }, [limit, size, align]);

    const { upIndexAndRange, downIndexAndRange, range, currentIndex } = useVirualInit({
        horizontal,
        limit,
    });
    const measurements = useMeasurements({
        estimateSize,
        itemsLength: size,
        paddingStart,
        keyExtractor,
    });
    const visibleItems = useVisibleItems(range, measurements);

    const { up, down } = useMemo(
        () => ({
            up: () => {
                upIndexAndRange(latestRef.current);
            },
            down: () => {
                downIndexAndRange(latestRef.current);
            },
        }),
        [upIndexAndRange, downIndexAndRange],
    );

    useKeyboard({ up, down, horizontal, framesToThrottle: props.framesToThrottle });

    return {
        visibleItems,
        currentIndex,
        totalSize: (measurements[size - 1]?.end || 0) + paddingEnd,
        upIndex: up,
        downIndex: down,
    };
};
