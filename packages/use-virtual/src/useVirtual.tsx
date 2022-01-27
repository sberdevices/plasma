import { useMemo, useState } from 'react';

import { VirtualProps } from './types';
import { useVirtualScroll } from './useVirtualScroll';
import { useKeyboard } from './utils/use-keyboard';

export const useVirtual = ({ horizontal = false, itemCount = 0, ...props }: VirtualProps) => {
    const virtual = useVirtualScroll({ horizontal, itemCount, ...props });
    const { align, parentRef } = props;
    const { upIndex, downIndex, scrollToIndex, currentIndex, lastUpdateSource } = virtual;
    const [prevCurrentIndex, setPrevCurrentIndex] = useState(currentIndex);

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
