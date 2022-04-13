import React from 'react';
import { ScrollAxis } from '@sberdevices/plasma-core';

import { useRemoteListener } from '../../hooks';

import { throttleByFrames } from './utils';

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
    delayFrames,
    longDelayFrames,
    min,
    max,
    count = 1,
    longCount = 5,
}: {
    initialIndex: number;
    axis: ScrollAxis;
    delayFrames: number;
    longDelayFrames: number;
    min: number;
    max: number;
    count?: number;
    longCount?: number;
    throttlingParams?: typeof throttlingParamsDefault;
}) {
    const indexState = React.useState(initialIndex);
    const [, setIndex] = indexState;

    const step = React.useCallback(
        throttleByFrames(
            (cmd: '+' | '-') =>
                setIndex((prevIndex) => {
                    if (cmd === '+') {
                        return prevIndex + count <= max ? prevIndex + count : min;
                    }
                    return prevIndex - count >= min ? prevIndex - count : max;
                }),
            delayFrames,
        ),
        [min, max],
    );
    const jump = React.useCallback(
        throttleByFrames(
            (cmd: '+' | '-') =>
                setIndex((prevIndex) => {
                    if (cmd === '+') {
                        return prevIndex + longCount <= max ? prevIndex + longCount : min;
                    }
                    return prevIndex - longCount >= min ? prevIndex - longCount : max;
                }),
            longDelayFrames,
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
