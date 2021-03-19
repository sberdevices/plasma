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
    const duration = endTime <= startTime || startTime >= newDuration
        ? newDuration
        : Math.min(endTime, newDuration) - startTime;
    return { ...state, duration, buffered };
};

export function useMediaPlayer<T extends PlayerType>(
    playerType: T,
    { startTime = 0, endTime, ...props }: MediaPlayerPropsMap[T] & { startTime?: number; endTime?: number },
) {
    const playerRef = useRef<PlayerTypeMap[T]>(null);

    const [state, setState] = useState<MediaPlayerState>({
        currentTime: 0,
        duration: 0,
        paused: true,
        muted: false,
        volume: 1,
        loading: Boolean(props.autoPlay),
    });

    const onTogglePlayback = () => {
        if (playerRef.current) {
            const { paused } = playerRef.current;
            setState((prevState) => ({ ...prevState, paused }));
        }
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

        setState((prevState) => ({
            ...prevState,
            currentTime: 0,
            duration: 0,
        }));

        if (props.autoPlay && playerRef.current.paused) {
            actions.playback();
        }
    }, [props.src, startTime, endTime]);

    const element = createElement<MediaPlayerPropsMap[T]>(playerType, {
        controls: false,
        ...props,
        ref: playerRef,
        onPlay: wrapEventHandler(onTogglePlayback, props.onPlay),
        onPause: wrapEventHandler(onTogglePlayback, props.onPause),
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
