import { useCallback, useRef } from 'react';

export const useWeakFlag = (initialValue: boolean) => {
    const ref = useRef(initialValue);
    const updater = useCallback((value: boolean) => {
        ref.current = value;
    }, []);

    return [ref, updater] as const;
};
