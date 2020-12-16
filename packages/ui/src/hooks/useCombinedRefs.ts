import React from 'react';

/**
 * Хук призван подружить работу forwardRef и useRef
 */
export function useCombinedRefs<T>(
    ...refs: Array<((instance: T | null) => void) | React.MutableRefObject<T | null> | null>
) {
    const targetRef = React.useRef<T>();

    React.useEffect(() => {
        refs.forEach((ref) => {
            if (!ref) {
                return;
            }
            if (targetRef.current) {
                if (typeof ref === 'function') {
                    ref(targetRef.current);
                } else {
                    ref.current = targetRef.current;
                }
            }
        });
    }, [refs]);

    return targetRef as React.MutableRefObject<T | null>;
}
