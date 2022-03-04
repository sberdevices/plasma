import React, { useState, useMemo, useLayoutEffect } from 'react';

import { useThrottledCallback } from '../../../hooks';
import { MediaPlayerActions, MediaPlayerState, PlayerType, PlayerTypeMap } from '../types';

const updateStateDuration = (state: MediaPlayerState, newDuration: number, startTime: number, endTime: number) => {
    if (Number.isNaN(newDuration)) {
        return { ...state, duration: 0 };
    }

    const duration =
        endTime <= startTime || startTime >= newDuration ? newDuration : Math.min(endTime, newDuration) - startTime;
    return { ...state, duration };
};

interface UseMediaPlayerParams {
    start?: number;
    end?: number;
    muted?: boolean;
    autoPlay?: boolean;
}

interface UseMediaPlayer {
    <T extends PlayerType, N extends PlayerTypeMap[T]>(ref: React.RefObject<N>, params?: UseMediaPlayerParams): {
        actions: MediaPlayerActions;
        state: MediaPlayerState;
    };
}

export const useMediaPlayer: UseMediaPlayer = (ref, params) => {
    const { start, end, muted = false, autoPlay = true } = params || {};
    const durationRef = ref.current?.duration ?? 0;
    const durationParams = (end ?? 0) + (start ?? 0);
    const durationAbsolute = durationParams || durationRef;
    const startTimeAbsolute = start ?? 0;
    const [state, setState] = useState<MediaPlayerState>(() => ({
        currentTime: startTimeAbsolute,
        duration: durationAbsolute,
        muted,
        loading: Boolean(autoPlay),
        paused: !autoPlay,
    }));
    const endTimeAbsolute = end ?? state.duration;

    const handlers = React.useMemo(
        () => ({
            play: () => setState((prevState) => ({ ...prevState, paused: false })),
            pause: () => setState((prevState) => ({ ...prevState, paused: true })),
            playing: () => {
                if (ref.current) {
                    setState((prevState) => ({ ...prevState, loading: false }));
                }
            },
            timeUpdate: () => {
                if (ref.current) {
                    setState((prevState) => ({
                        ...prevState,
                        ...(ref.current && { currentTime: ref.current.currentTime }),
                    }));
                }
            },
            durationChange: () => {
                if (ref.current && !durationParams) {
                    const { duration, paused } = ref.current;
                    // Исправление проблемы с тем, что видео иногда не воспроизводится после смены дорожки
                    if (autoPlay && paused) {
                        ref.current.play();
                    }
                    setState((prevState) =>
                        updateStateDuration(prevState, duration, startTimeAbsolute, endTimeAbsolute),
                    );
                }
            },
            waiting: () => {
                if (ref.current) {
                    setState((prevState) => ({ ...prevState, loading: true }));
                }
            },
            loadstart: () => {
                if (ref.current) {
                    setState((prevState) => ({ ...prevState, loading: true }));
                }
            },
        }),
        [end, ref, start],
    );

    useLayoutEffect(() => {
        if (!ref.current) {
            return;
        }

        const node = ref.current;

        for (const [event, handler] of Object.entries(handlers)) {
            node.addEventListener(event.toLowerCase(), handler);
        }
        node.currentTime = startTimeAbsolute;

        node.addEventListener(
            'canplaythrough',
            () => {
                setState((prev) => ({
                    ...prev,
                    loading: false,
                }));
                if (autoPlay) {
                    node.play().catch(() => {
                        setState((prev) => ({
                            ...prev,
                            paused: true,
                        }));
                    });
                }
            },
            {
                once: true,
            },
        );

        return () => {
            node.pause();

            for (const [event, handler] of Object.entries(handlers)) {
                node.removeEventListener(event.toLowerCase(), handler);
            }
        };
    }, [autoPlay, handlers, ref, start]);

    const playbackAction = useThrottledCallback(
        () => {
            if (!ref.current) {
                return;
            }

            const { currentTime, paused } = ref.current;

            if (paused) {
                if (currentTime >= endTimeAbsolute) {
                    ref.current.currentTime = startTimeAbsolute;
                }
                ref.current.play();
            } else {
                ref.current.pause();
            }
        },
        [ref, startTimeAbsolute, endTimeAbsolute],
        300,
    );

    const actions = useMemo(
        () => ({
            playback: playbackAction,
            seekTo: (time: number) => {
                if (ref.current) {
                    ref.current.currentTime = Math.min(endTimeAbsolute, Math.max(startTimeAbsolute, time));
                }
            },
            jumpTo: (sign: 1 | -1) => {
                if (ref.current) {
                    const time = ref.current.currentTime + 10 * sign;

                    ref.current.currentTime =
                        sign === 1 ? Math.min(time, endTimeAbsolute) : Math.max(startTimeAbsolute, time);
                }
            },
        }),
        [end, ref, start, playbackAction],
    );

    return {
        actions,
        state: {
            ...state,
            get currentTime() {
                return state.currentTime - startTimeAbsolute;
            },
        },
    };
};
