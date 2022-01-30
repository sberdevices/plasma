import { useMemo } from 'react';

import { VirtualPropsKeyboard } from './types';
import { defaultKeyExtractor } from './utils';
import { useKeyboard } from './hooks-helpers/useKeyboard';
import { useVirualInit } from './hooks-helpers/useVirtualInit';
import { useMeasurements } from './hooks-helpers/useMeasurements';
import { useVisibleItems } from './hooks-helpers/useVisibleItems';

export const useVirtualKeyboard = (props: VirtualPropsKeyboard) => {
    const {
        itemCount = 0,
        limit,
        horizontal = false,
        align,
        estimateSize,
        paddingStart = 0,
        paddingEnd = 0,
        keyExtractor = defaultKeyExtractor,
        parentRef,
    } = props;

    const params = useMemo(
        () => ({
            limit,
            itemCount,
            align,
        }),
        [limit, itemCount, align],
    );

    const { upIndexAndRange, downIndexAndRange, range, currentIndex } = useVirualInit(props);
    const measurements = useMeasurements({
        estimateSize,
        itemCount,
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
        parentRef,
    });

    return {
        visibleItems,
        currentIndex,
        totalSize: (measurements[itemCount - 1]?.end || 0) + paddingEnd,
        upIndex: up,
        downIndex: down,
    };
};
