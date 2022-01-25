import { useMemo, useState } from 'react';

import { VirtualProps } from './types';
import { useVirtualScroll } from './useVirtualScroll';
import { useKeyboard } from './utils/use-keyboard';

export const useVirtual = (props: VirtualProps) => {
    const virtual = useVirtualScroll(props);
    const { horizontal = false, align, itemsLength = 0, parentRef } = props;
    const { upIndex, downIndex, scrollToIndex, currentIndex, lastUpdateSource } = virtual;
    const [prevCurrentIndex, setPrevCurrentIndex] = useState(currentIndex);

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
