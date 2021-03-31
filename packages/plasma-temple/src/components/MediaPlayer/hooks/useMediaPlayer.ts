import React, { useRef, useState, createElement, useMemo, useEffect } from 'react';
import { MediaPlayerActions, MediaPlayerPropsMap, MediaPlayerState, PlayerType, PlayerTypeMap } from '../types';

const wrapEventHandler = <T extends PlayerType>(
    eventHandler: React.ReactEventHandler<PlayerTypeMap[T]>,
    userEventHandler?: React.ReactEventHandler<PlayerTypeMap[T]>
) => (event: React.SyntheticEvent<PlayerTypeMap[T]>) => {
    eventHandler(event);
    userEventHandler?.(event);
};

const updateStateCurrentTime = (state: MediaPlayerState, newCurrentTime: number, startTime: number, endTime: number) => {
    const currentTime = endTime <= startTime
        ? newCurrentTime
        : Math.max(0, newCurrentTime - startTime);
    return { ...state, currentTime };
};

const updateStateDuration = (state: MediaPlayerState, newDuration: number, buffered: TimeRanges, startTime: number, endTime: number) => {
    if (Number.isNaN(newDuration)) {
        return { ...state, duration: 0, buffered };
    }

    const duration = endTime <= startTime || startTime >= newDuration
        ? newDuration
        : Math.min(endTime, newDuration) - startTime;
    return { ...state, duration, buffered };
};

const initMediaPlayerState = <T extends PlayerType>({ autoPlay }: MediaPlayerPropsMap[T]) => ({
    currentTime: 0,
    duration: 0,
    paused: true,
    muted: false,
    volume: 1,
    loading: Boolean(autoPlay),
});

export function useMediaPlayer<T extends PlayerType>(
    playerType: T,
    { startTime = 0, endTime, ...props }: MediaPlayerPropsMap[T] & { startTime?: number; endTime?: number },
) {
    const playerRef = useRef<PlayerTypeMap[T]>(null);

    const [state, setState] = useState<MediaPlayerState>(initMediaPlayerState(props));

    const onPlay = () => {
        setState((prevState) => ({ ...prevState, paused: false }));
    }

    const onPause = () => {
        setState((prevState) => ({ ...prevState, paused: true }));
    }

    const onVolumeChange = () => {
        if (playerRef.current) {
            const { muted, volume } = playerRef.current;
            setState((prevState) => ({ ...prevState, muted, volume }));
        }
    };

    const onDurationChange = () => {
        if (playerRef.current) {
            const { duration, buffered } = playerRef.current;
            setState((prevState) => updateStateDuration(
                prevState,
                duration,
                buffered,
                startTime,
                endTime ?? duration,
            ));
        }
    };

    const onTimeUpdate = (event: React.SyntheticEvent<PlayerTypeMap[T]>) => {
        if (playerRef.current) {
            const { currentTime, paused, duration } = playerRef.current;

            if (!duration) {
                return;
            }

            setState((prevState) => updateStateCurrentTime(
                prevState,
                currentTime,
                startTime,
                Math.min(endTime ?? duration, duration),
            ));

            if (!paused && currentTime >= Math.min(duration, endTime ?? duration)) {
                playerRef.current.pause();
                (props.onEnded as React.ReactEventHandler<PlayerTypeMap[T]>)?.(event);
            }

            if (currentTime < startTime) {
                playerRef.current.currentTime = Math.min(startTime, duration);
            }
        }
    };

    const onProgress = () => {
        if (playerRef.current) {
            const { buffered } = playerRef.current;
            setState((prevState) => ({ ...prevState, buffered }));
        }
    };

    const onWaiting = () => {
        if (playerRef.current) {
            setState((prevState) => ({ ...prevState, loading: true }));
        }
    };

    const onPlaying = () => {
        if (playerRef.current) {
            setState((prevState) => ({ ...prevState, loading: false }));
        }
    };

    const actions: MediaPlayerActions = useMemo(() => ({
        playback: () => {
            if (!playerRef.current) {
                return;
            }

            const { currentTime, paused, duration } = playerRef.current;

            if (paused) {
                if (currentTime >= Math.min(endTime ?? duration, duration)) {
                    playerRef.current.currentTime = startTime;
                }
                playerRef.current.play();
            } else {
                playerRef.current.pause();
            }
        },
        seekTo: (time: number) => {
            if (playerRef.current) {
                const { duration } = playerRef.current;
                playerRef.current.currentTime = Math.min(duration, Math.max(0, time));
            }
        },
        volume: (volume: number) => {
            if (playerRef.current) {
                playerRef.current.volume = Math.min(1, Math.max(0, volume));
            }
        },
        mute: () => {
            if (playerRef.current) {
                playerRef.current.muted = !playerRef.current.muted;
            }
        },
        jumpTo: (sign: 1 | -1) => {
            if (playerRef.current) {
                const { duration } = playerRef.current;
                const time = playerRef.current.currentTime + 10 * sign;

                playerRef.current.currentTime = sign === 1
                    ? Math.min(time, duration, endTime ?? duration)
                    : Math.max(startTime, time);
            }
        },
    }), [startTime, endTime]);

    useEffect(() => {
        if (!playerRef.current) {
            return;
        }

        const { duration, buffered, src } = playerRef.current;
        const initState = initMediaPlayerState(props);

        playerRef.current.pause();
        playerRef.current.currentTime = 0;

        setState(src !== props.src
            ? initState
            : updateStateDuration(
                initState,
                duration,
                buffered,
                startTime,
                endTime ?? duration
            ),
        );

        if (props.autoPlay) {
            actions.playback();
        }
    }, [props.src, startTime, endTime]);

    const element = createElement<MediaPlayerPropsMap[T]>(playerType, {
        controls: false,
        ...props,
        ref: playerRef,
        onPlay: wrapEventHandler(onPlay, props.onPlay),
        onPause: wrapEventHandler(onPause, props.onPause),
        onVolumeChange: wrapEventHandler(onVolumeChange, props.onVolumeChange),
        onDurationChange: wrapEventHandler(onDurationChange, props.onDurationChange),
        onTimeUpdate: wrapEventHandler(onTimeUpdate, props.onTimeUpdate),
        onProgress: wrapEventHandler(onProgress, props.onProgress),
        onEnded: props.onEnded,
        onWaiting: onWaiting,
        onPlaying: onPlaying,
    });

    return {
        element,
        playerRef,
        actions,
        state,
    };
}
