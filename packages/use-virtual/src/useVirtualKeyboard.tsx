import { useMemo } from 'react';

import { VirtualPropsKeyboard } from './types';
import { defaultKeyExtractor } from './utils';
import { useKeyboard } from './hooks-helpers/useKeyboard';
import { useVirtualInit } from './hooks-helpers/useVirtualInit';
import { useMeasurements } from './hooks-helpers/useMeasurements';
import { useVisibleItems } from './hooks-helpers/useVisibleItems';

// TODO: убрать дефолтное значение,
// определять по размеру контейнера
const DEFAULT_INITIAL_RANGE = {
    start: 0,
    end: 3,
};
export const useVirtualKeyboard = (props: VirtualPropsKeyboard) => {
    const {
        itemCount = 0,
        horizontal = false,
        align,
        estimateSize,
        paddingStart = 0,
        paddingEnd = 0,
        keyExtractor = defaultKeyExtractor,
        parentRef,
        initialCurrentIndex = 0,
        initialRange = DEFAULT_INITIAL_RANGE,
    } = props;

    const params = useMemo(
        () => ({
            itemCount,
            align,
        }),
        [itemCount, align],
    );

    const { upIndexAndRange, downIndexAndRange, range, currentIndex } = useVirtualInit({
        ...props,
        horizontal,
        initialCurrentIndex,
        initialRange,
    });

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
