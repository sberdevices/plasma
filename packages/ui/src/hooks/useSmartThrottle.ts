import React from 'react';

import { useDebouncedFunction } from './useDebouncedFunction';

/**
 * Троттлинг с задержкой, увеличивающейся с каждым вызовом
 * Задержка сбрасывается до минимальной после последнего вызова.
 * @param {Function} func
 * @param {number} minDelay
 * @param {number} maxDelay
 */
export function useSmartThrottle<A extends Array<any>>(func: Function, minDelay: number, maxDelay: number) {
    const isThrottled = React.useRef(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context = React.useRef<{ savedThis: any; savedArgs: any } | null>();
    const delay = React.useRef(minDelay);

    /**
     * Сброс до минимального значения
     */
    const restoreDelay = useDebouncedFunction(() => {
        delay.current = minDelay;
    }, minDelay);

    return function wrapper(...args: A) {
        if (isThrottled.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            context.current = { savedThis: this, savedArgs: args };
            delay.current = Math.min(delay.current + (maxDelay - minDelay) * 0.1, maxDelay);
            restoreDelay();
            return;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        func.apply(this, args);

        isThrottled.current = true;

        setTimeout(() => {
            isThrottled.current = false;
            if (context.current) {
                wrapper.apply(context.current.savedThis, context.current.savedArgs);
                context.current = null;
            }
        }, delay.current);
    };
}
