import { LatestRefData, VisibleRange } from './types';

export const findNearestBinarySearch = (
    low: number,
    high: number,
    getCurrentValue: (index: number) => number,
    value: number,
) => {
    while (low <= high) {
        // eslint-disable-next-line no-bitwise
        const middle = ((low + high) / 2) | 0;
        const currentValue = getCurrentValue(middle);

        if (currentValue < value) {
            low = middle + 1;
        } else if (currentValue > value) {
            high = middle - 1;
        } else {
            return middle;
        }
    }

    if (low > 0) {
        return low - 1;
    }

    return 0;
};

export const calculateRange = (
    { measurements, scrollableSize, scrollOffset }: LatestRefData,
    prevRange: VisibleRange,
    itemCount: number,
) => {
    const getOffset = (index: number) => measurements[index].start;

    const start = findNearestBinarySearch(0, itemCount, getOffset, scrollOffset);
    let end = start;

    while (end < itemCount && measurements[end].end < scrollOffset + scrollableSize) {
        end++;
    }

    if (prevRange.start !== start || prevRange.end !== end) {
        return { start, end };
    }

    return prevRange;
};

export const defaultEstimateSize = () => 50;

export const defaultKeyExtractor = (index: number) => index;

export const defaultMeasureSize = (el: HTMLElement, horizontal?: boolean) => {
    const key = horizontal ? 'offsetWidth' : 'offsetHeight';

    return el[key];
};

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
