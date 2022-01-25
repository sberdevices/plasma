import { useCallback } from 'react';

import { VirtualProps } from './types';
import { useVerySmoothScroll } from './VerySmoothScroll';
import { useVirtual } from './useVirtual';

export const useVirtualSmoothScroll = (props: Omit<VirtualProps, 'scrollToFn'>) => {
    const smoothScrollToFn = useVerySmoothScroll(props.parentRef);
    const { horizontal = false, debouncedFramesScrollSync = 2 } = props;

    return useVirtual({
        ...props,
        debouncedFramesScrollSync,
        scrollToFn: useCallback(
            (offset: number) => {
                smoothScrollToFn.goAbsolute(offset, horizontal ? 'horizontal' : 'vertical');
            },
            [smoothScrollToFn, horizontal],
        ),
    });
};
