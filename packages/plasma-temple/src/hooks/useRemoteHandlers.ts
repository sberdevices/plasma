import { isSberBox } from '@sberdevices/plasma-ui/utils';
import throttle from 'lodash.throttle';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Axis } from '../types';

type ShortKey = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'OK';
type LongKey = 'LONG_UP' | 'LONG_DOWN' | 'LONG_LEFT' | 'LONG_RIGHT' | 'LONG_OK';
export type RemoteKey = ShortKey | LongKey;

const navKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

interface UseRemoteListenerProps {
    keypressTimeMs?: number;
    disable?: boolean;
}

interface UseRemoteListenerCallback {
    (key: RemoteKey, event: KeyboardEvent): void;
}

interface UseRemoteListenerProps {
    keypressTimeMs?: number;
    disable?: boolean;
}

export const useRemoteListener = (cb: UseRemoteListenerCallback, params: UseRemoteListenerProps) => {
    const { keypressTimeMs = 150, disable = false } = params || {};
    const keydown = useRef<number | null>(null);

    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent): void => {
            if (disable || navKeys.indexOf(event.key) === -1) {
                return;
            }

            const isLong = keydown.current && Date.now() - keydown.current < keypressTimeMs;

            switch (event.key) {
                case 'ArrowUp':
                    cb(isLong ? 'LONG_UP' : 'UP', event);
                    break;
                case 'ArrowDown':
                    cb(isLong ? 'LONG_DOWN' : 'DOWN', event);
                    break;
                case 'ArrowLeft':
                    cb(isLong ? 'LONG_LEFT' : 'LEFT', event);
                    break;
                case 'ArrowRight':
                    cb(isLong ? 'LONG_RIGHT' : 'RIGHT', event);
                    break;
                default:
                    break;
            }
            keydown.current = Date.now();
        };
        const handleKeyup = (event: KeyboardEvent): void => {
            if (navKeys.indexOf(event.key) === -1) {
                return;
            }
            keydown.current = null;
        };

        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('keyup', handleKeyup);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
            document.removeEventListener('keyup', handleKeyup);
        };
    }, [cb, disable, keypressTimeMs]);
};

const throttlingParamsDefault = {
    leading: true,
    trailing: false,
};

const isSberbox = isSberBox();
const defaultDelay = isSberbox ? 300 : 30;
const defaultLongDelay = isSberbox ? 1500 : 150;

interface UseRemoteHandlersProps {
    initialIndex: number;
    axis: Axis;
    delay?: number;
    longDelay?: number;
    min: number;
    max: number;
    count?: number;
    longCount?: number;
    throttlingParams?: typeof throttlingParamsDefault;
    detectCondition?: boolean;
    disable?: boolean;
    repeat?: boolean;
}

export function useRemoteHandlers({
    initialIndex = 0,
    axis,
    delay = defaultDelay,
    longDelay = defaultLongDelay,
    min,
    max,
    count = 1,
    longCount = 5,
    throttlingParams = throttlingParamsDefault,
    disable = false,
    repeat = true,
}: UseRemoteHandlersProps) {
    const indexState = useState(initialIndex);
    const [currentIndex, setIndex] = indexState;

    const step = useCallback(
        throttle(
            (cmd: '+' | '-') =>
                setIndex((prevIndex) => {
                    if (cmd === '+') {
                        const indexAfterLimit = repeat ? min : max;
                        return prevIndex + count <= max ? prevIndex + count : indexAfterLimit;
                    }
                    const indexAfterLimit = repeat ? max : min;
                    return prevIndex - count >= min ? prevIndex - count : indexAfterLimit;
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
                        const indexAfterLimit = repeat ? min : max;
                        return prevIndex + longCount <= max ? prevIndex + longCount : indexAfterLimit;
                    }
                    const indexAfterLimit = repeat ? max : min;
                    return prevIndex - longCount >= min ? prevIndex - longCount : indexAfterLimit;
                }),
            longDelay,
            throttlingParams,
        ),
        [min, max],
    );

    useRemoteListener(
        (key, e) => {
            if (disable) {
                return;
            }

            const preventDefault = (condition: boolean) => {
                if (condition) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            };

            if (axis === Axis.X) {
                switch (key) {
                    case 'LEFT':
                        preventDefault(currentIndex > 0);
                        step('-');
                        break;
                    case 'RIGHT':
                        preventDefault(currentIndex < max);
                        step('+');
                        break;
                    case 'LONG_LEFT':
                        preventDefault(currentIndex > 0);
                        jump('-');
                        break;
                    case 'LONG_RIGHT':
                        preventDefault(currentIndex < max);
                        jump('+');
                        break;
                    default:
                        break;
                }
            } else {
                switch (key) {
                    case 'UP':
                        preventDefault(currentIndex > 0);
                        step('-');
                        break;
                    case 'DOWN':
                        preventDefault(currentIndex < max);
                        step('+');
                        break;
                    case 'LONG_UP':
                        preventDefault(currentIndex > 0);
                        jump('-');
                        break;
                    case 'LONG_DOWN':
                        preventDefault(currentIndex < max);
                        jump('+');
                        break;
                    default:
                        break;
                }
            }
        },
        { disable },
    );

    return indexState;
}
