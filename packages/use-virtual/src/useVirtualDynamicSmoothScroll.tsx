import { useCallback } from 'react';

import { VirtualDynamicProps } from './types';
import { useVerySmoothScroll } from './VerySmoothScroll';
import { useVirtualDynamic } from './useVirtualDynamic';

export const useVirtualDynamicSmoothScroll = (props: Omit<VirtualDynamicProps, 'scrollToFn'>) => {
    const smoothScrollToFn = useVerySmoothScroll(props.parentRef);

    return useVirtualDynamic({
        ...props,
        scrollToFn: useCallback(
            (offset: number) => {
                smoothScrollToFn.goAbsolute(offset, props.horizontal ? 'horizontal' : 'vertical');
            },
            [smoothScrollToFn, props.horizontal],
        ),
    });
};
