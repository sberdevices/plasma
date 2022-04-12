import React from 'react';
import throttle from 'lodash.throttle';
import { ScrollAxis } from '@sberdevices/plasma-core';

import { useRemoteListener } from '../../hooks';

const throttlingParamsDefault = {
    leading: true,
    trailing: false,
};

/**
 * Хук для навигации. Слушает нажатие кнопок на пульте/клавиатуре.
 */
export function useRemoteHandlers({
    initialIndex = 0,
    axis,
    delay,
    longDelay,
    min,
    max,
    count = 1,
    longCount = 5,
    throttlingParams = throttlingParamsDefault,
}: {
    initialIndex: number;
    axis: ScrollAxis;
    delay: number;
    longDelay: number;
    min: number;
    max: number;
    count?: number;
    longCount?: number;
    throttlingParams?: typeof throttlingParamsDefault;
}) {
    const indexState = React.useState(initialIndex);
    const [, setIndex] = indexState;

    const step = React.useCallback(
        throttle(
            (cmd: '+' | '-') =>
                setIndex((prevIndex) => {
                    if (cmd === '+') {
                        return prevIndex + count <= max ? prevIndex + count : min;
                    }
                    return prevIndex - count >= min ? prevIndex - count : max;
                }),
            delay,
            throttlingParams,
        ),
        [min, max],
    );
    const jump = React.useCallback(
        throttle(
            (cmd: '+' | '-') =>
                setIndex((prevIndex) => {
                    if (cmd === '+') {
                        return prevIndex + longCount <= max ? prevIndex + longCount : min;
                    }
                    return prevIndex - longCount >= min ? prevIndex - longCount : max;
                }),
            longDelay,
            throttlingParams,
        ),
        [min, max],
    );

    useRemoteListener((key, ev) => {
        ev.preventDefault();
        if (axis === 'x') {
            switch (key) {
                case 'LEFT':
                    step('-');
                    break;
                case 'RIGHT':
                    step('+');
                    break;
                case 'LONG_LEFT':
                    jump('-');
                    break;
                case 'LONG_RIGHT':
                    jump('+');
                    break;
                default:
                    break;
            }
        } else {
            switch (key) {
                case 'UP':
                    step('-');
                    break;
                case 'DOWN':
                    step('+');
                    break;
                case 'LONG_UP':
                    jump('-');
                    break;
                case 'LONG_DOWN':
                    jump('+');
                    break;
                default:
                    break;
            }
        }
    });

    return indexState;
}
