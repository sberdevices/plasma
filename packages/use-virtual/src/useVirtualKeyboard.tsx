import { useMemo } from 'react';

import { VirtualPropsKeyboard } from './types';
import { defaultKeyExtractor, useMeasurements, useVisibleItems } from './utils';
import { useKeyboard } from './utils/use-keyboard';
import { useVirualInit } from './utils/use-virtual-init';

export const useVirtualKeyboard = ({
    itemsLength = 0,
    limit,
    horizontal = false,
    align,
    estimateSize,
    paddingStart = 0,
    paddingEnd = 0,
    keyExtractor = defaultKeyExtractor,
    ...props
}: VirtualPropsKeyboard) => {
    const params = useMemo(
        () => ({
            limit,
            itemsLength,
            align,
        }),
        [limit, itemsLength, align],
    );

    const { upIndexAndRange, downIndexAndRange, range, currentIndex } = useVirualInit({
        horizontal,
        limit,
    });
    const measurements = useMeasurements({
        estimateSize,
        itemsLength,
        paddingStart,
        keyExtractor,
    });
    const visibleItems = useVisibleItems(range, measurements);

    const { up, down } = useMemo(
        () => ({
            up: () => {
                upIndexAndRange(params);
            },
            down: () => {
                downIndexAndRange(params);
            },
        }),
        [upIndexAndRange, downIndexAndRange, params],
    );

    useKeyboard({
        up,
        down,
        horizontal,
        framesToThrottle: props.framesToThrottle,
    });

    return {
        visibleItems,
        currentIndex,
        totalSize: (measurements[itemsLength - 1]?.end || 0) + paddingEnd,
        upIndex: up,
        downIndex: down,
    };
};
