import React, { useLayoutEffect } from 'react';

export const useFocusOnMount = <T extends HTMLElement>(preventScroll = false): React.RefObject<T> => {
    const focusRef = React.useRef<T>(null);

    useLayoutEffect(() => {
        if (focusRef.current) {
            focusRef.current.focus({ preventScroll });
        }
    }, [focusRef, preventScroll]);

    return focusRef;
};
