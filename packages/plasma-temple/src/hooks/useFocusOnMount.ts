import React from 'react';

interface UseFocusOnMountParams {
    preventScroll?: boolean;
    delay?: number;
    prevent?: boolean;
}

interface UseFocusOnMount {
    <T>(ref: React.RefObject<T>, params?: UseFocusOnMountParams): void;
}

export const useFocusOnMount: UseFocusOnMount = (ref, params = {}) => {
    const { preventScroll, delay = 0, prevent = false } = params;

    React.useLayoutEffect(() => {
        const timer = setTimeout(() => {
            if (!prevent && ref.current instanceof HTMLElement) {
                ref.current.focus({ preventScroll });
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [ref, prevent, preventScroll, delay]);
};
