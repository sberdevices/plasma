import { useCallback, useRef, useState } from 'react';

interface UseTimer {
    (timeout: number): {
        stopped: boolean;
        startTimer: () => void;
        stopTimer: () => void;
    };
}

export const useTimer: UseTimer = (timeout) => {
    const timer = useRef<number>(0);
    const [stopped, setStopped] = useState(false);

    const stopTimer = useCallback(() => clearTimeout(timer.current), []);

    const startTimer = useCallback(() => {
        setStopped(false);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setStopped(true), timeout);
    }, [setStopped, timeout]);

    return {
        stopped,
        startTimer,
        stopTimer,
    };
};
