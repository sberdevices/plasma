import React, { useState, useMemo, useLayoutEffect } from 'react';

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
    const { start = 0, end = Number.MAX_SAFE_INTEGER, muted = false, autoPlay = true } = params || {};
    const [state, setState] = useState<MediaPlayerState>(() => ({
        currentTime: start,
        duration: start + end,
        muted,
        loading: Boolean(autoPlay),
        paused: !autoPlay,
    }));

    const handlers = React.useMemo(
        () => ({
            play: () => setState((prevState) => ({ ...prevState, paused: false })),
            pause: () => setState((prevState) => ({ ...prevState, paused: true })),
            playing: () => {
                if (ref.current) {
                    setState((prevState) => ({ ...prevState, loading: false }));
                }
            },
            durationChange: () => {
                if (ref.current) {
                    const { duration } = ref.current;
                    setState((prevState) => updateStateDuration(prevState, duration, start, end ?? duration));
                }
            },
            waiting: () => {
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
    }, [autoPlay, handlers, ref]);

    const actions = useMemo(
        () => ({
            playback: () => {
                if (!ref.current) {
                    return;
                }

                const { currentTime, paused, duration } = ref.current;

                if (paused) {
                    if (currentTime >= Math.min(end ?? duration, duration)) {
                        ref.current.currentTime = start;
                    }
                    ref.current.play();
                } else {
                    ref.current.pause();
                }
            },
            seekTo: (time: number) => {
                if (ref.current) {
                    const { duration } = ref.current;
                    ref.current.currentTime = Math.min(duration, Math.max(0, time));
                }
            },
            jumpTo: (sign: 1 | -1) => {
                if (ref.current) {
                    const { duration } = ref.current;
                    const time = ref.current.currentTime + 10 * sign;

                    ref.current.currentTime =
                        sign === 1 ? Math.min(time, duration, end ?? duration) : Math.max(start, time);
                }
            },
        }),
        [end, ref, start],
    );

    return {
        actions,
        state: {
            ...state,
            get currentTime() {
                return ref.current?.currentTime ?? 0;
            },
        },
    };
};
