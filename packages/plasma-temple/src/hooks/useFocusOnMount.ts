import React from 'react';

interface UseFocusOnMountParams {
    preventScroll?: boolean;
    delay?: number;
    prevent?: boolean;
    callOnce?: boolean;
}

interface UseFocusOnMount {
    <T>(ref: React.RefObject<T>, params?: UseFocusOnMountParams): void;
}

export const useFocusOnMount: UseFocusOnMount = (ref, params = {}) => {
    const { preventScroll, delay = 150, prevent = false, callOnce = false } = params;
    const calledOnce = React.useRef(false);

    React.useEffect(() => {
        if (callOnce && calledOnce.current) {
            return;
        }

        const timer = setTimeout(() => {
            if (!prevent && ref.current instanceof HTMLElement) {
                ref.current.focus({ preventScroll });
                calledOnce.current = true;
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [ref, prevent, preventScroll, delay, callOnce]);
};
