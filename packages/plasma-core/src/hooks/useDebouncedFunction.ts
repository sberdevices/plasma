import React from 'react';

/**
 * @param {Function} func
 * @param {number} delay
 * @param {boolean} cleanUp
 * https://habr.com/ru/company/domclick/blog/510616/
 */
export function useDebouncedFunction(func: Function, delay: number, cleanUp?: boolean) {
    const timeoutRef = React.useRef<number>();

    /**
     * Очистка таймера
     */
    function clearTimer() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = undefined;
        }
    }

    /**
     * Очищаем таймер при анмаунте компонента, если cleanUp выставлен в true
     * и тем самым отменяем последний запланированный вызов
     */
    React.useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

    return (...args: any[]) => {
        clearTimer();
        timeoutRef.current = setTimeout(() => func(...args), delay);
    };
}
