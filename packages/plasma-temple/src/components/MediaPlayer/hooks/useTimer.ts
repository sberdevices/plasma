import { useCallback, useRef, useState } from 'react';

export const useTimer = (timeout: number) => {
    const timer = useRef<number>(0);
    const [stopped, setStopped] = useState(false);

    const startTimer = useCallback(() => {
        setStopped(false);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setStopped(true), timeout);
    }, [setStopped, timeout]);

    return {
        stopped,
        startTimer,
    };
};
