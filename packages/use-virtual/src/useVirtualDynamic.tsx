import { useState, useMemo } from 'react';

import { VirtualDynamicProps } from './types';
import { useVirtualDynamicScroll } from './useVirtualDynamicScroll';
import { useKeyboard } from './utils/use-keyboard';

export const useVirtualDynamic = (props: VirtualDynamicProps) => {
    const virtual = useVirtualDynamicScroll(props);
    const { horizontal = false, align, itemCount, parentRef } = props;
    const { upIndex, downIndex, setNeedRestoreScrollWeakFlag, scrollToIndex, currentIndex, lastUpdateSource } = virtual;
    const [prevRange, setPrevRange] = useState(virtual.range);
    const [prevCurrentIndex, setPrevCurrentIndex] = useState(currentIndex);

    if (virtual.range !== prevRange) {
        setPrevRange(virtual.range);
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
        framesToThrottle: props.framesToThrottle,
        parentRef,
    });

    if (prevCurrentIndex !== currentIndex) {
        if (lastUpdateSource === 'keyboard') {
            scrollToIndex(currentIndex);
        }
        setPrevCurrentIndex(currentIndex);
    }

    return virtual;
};
