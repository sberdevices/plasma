export function debounceByFrames<FN extends (...args: any[]) => void>(fn: FN, framesToDebounce = 0) {
    if (framesToDebounce === 0) {
        return fn;
    }

    let timeoutId: number | null = null;
    let framesCounter = 0;

    return (...args: Parameters<FN>) => {
        const tick = () => {
            if (framesCounter === framesToDebounce - 1) {
                timeoutId = null;
                framesCounter = 0;
                fn(...args);
            } else {
                framesCounter++;
                timeoutId = requestAnimationFrame(tick);
            }
        };

        if (timeoutId !== null) {
            framesCounter = 0;
            cancelAnimationFrame(timeoutId);
        }

        timeoutId = requestAnimationFrame(tick);
    };
}

// eslint-disable-next-line space-before-function-paren
export function throttleByFrames<FN extends (...args: any[]) => void>(fn: FN, framesToThrottle = 0) {
    if (framesToThrottle === 0) {
        return fn;
    }

    let isWaited = false;
    let framesCounter = 0;

    const tick = () => {
        if (framesCounter === framesToThrottle - 1) {
            isWaited = false;
            framesCounter = 0;
        } else {
            framesCounter++;
            requestAnimationFrame(tick);
        }
    };

    return (...args: Parameters<FN>) => {
        if (isWaited) {
            return;
        }

        fn(...args);
        isWaited = true;

        tick();
    };
}
