import React, { Touch, useLayoutEffect } from 'react';

import { isSberBoxLike } from '..';

export interface UseTouchHandlerParams {
    /**
     * Ось по которой осуществляется свайп
     */
    axis?: 'x' | 'y';
    /**
     * Дистанция между началом и окончанием свайпа в процентах от размера элемента
     */
    callDistance?: number;
}

export interface UseTouchHandlerCallback {
    (dir: number): void;
}

export interface UseTouchHandler {
    <T extends HTMLElement>(
        /**
         * объект ссылки на DOM элемент
         */
        ref: React.RefObject<T>,
        /**
         * Функция, которая будет вызвана на окончании свайпа при соблюдении условий
         */
        callback: UseTouchHandlerCallback,
        /**
         * Условия обработки touch событий, см. `UseTouchHandlerParams`
         */
        params?: UseTouchHandlerParams,
    ): void;
}

export const useTouchHandler: UseTouchHandler = (ref, callback, params) => {
    const { axis = 'x', callDistance = 25 } = params || {};

    useLayoutEffect(() => {
        if (!ref.current || isSberBoxLike()) {
            return;
        }

        const target = ref.current;
        let startPoint: Touch | null;

        const startHandler = (event: TouchEvent) => {
            startPoint = event.changedTouches.item(event.changedTouches.length - 1);
        };

        const moveHandler = (event: TouchEvent) => {
            // зона для нативного свайпа `назад`
            if (startPoint && startPoint?.clientX > 50) {
                event.preventDefault();
            }
        };

        const endHandler = (event: TouchEvent) => {
            const endPoint = event.changedTouches.item(event.changedTouches.length - 1);

            if (!startPoint || !endPoint) {
                return;
            }

            let start = startPoint.clientX;
            let end = endPoint.clientX;
            let nodeSize = target.clientWidth;

            if (axis === 'y') {
                start = startPoint.clientY;
                end = endPoint.clientY;
                nodeSize = target.clientHeight;
            }

            const diffByAxis = end - start;

            const percenteageDist = (diffByAxis / nodeSize) * 100;

            if (Math.abs(percenteageDist) >= callDistance) {
                callback(Math.sign(percenteageDist) * -1);
            }
        };

        target.addEventListener('touchstart', startHandler);
        target.addEventListener('touchmove', moveHandler);
        target.addEventListener('touchend', endHandler);

        return () => {
            target.removeEventListener('touchstart', startHandler);
            target.removeEventListener('touchmove', moveHandler);
            target.removeEventListener('touchend', endHandler);
        };
    }, [axis, callDistance, callback, ref]);
};
