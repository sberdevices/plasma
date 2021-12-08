import { useState, useMemo } from 'react';

import { VirtualDynamicProps } from './types';
import { useVirtualDynamicScroll } from './useVirtualDynamicScroll';
import { useKeyboard } from './utils/use-keyboard';

export const useVirtualDynamic = (props: VirtualDynamicProps) => {
    const virtual = useVirtualDynamicScroll(props);
    const { horizontal = true, align, itemsLength } = props;
    const { upIndex, downIndex, setNeedRestoreScrollWeakFlag, scrollToIndex } = virtual;
    const [prevRange, setPrevRange] = useState(virtual.range);
    const [prevCurrentIndex, setPrevCurrentIndex] = useState(virtual.currentIndex);

    if (virtual.range !== prevRange) {
        setPrevRange(virtual.range);
        setNeedRestoreScrollWeakFlag(false);
    }

    const { up, down } = useMemo(() => {
        const params = { align, itemsLength };

        return {
            up: () => {
                upIndex(params);
            },
            down: () => {
                downIndex(params);
            },
        };
    }, [upIndex, downIndex, align, itemsLength]);

    useKeyboard({
        up,
        down,
        horizontal,
        framesToThrottle: props.framesToThrottle,
    });

    if (prevCurrentIndex !== virtual.currentIndex) {
        scrollToIndex(virtual.currentIndex);
        setPrevCurrentIndex(virtual.currentIndex);
    }

    return virtual;
};
