import React from 'react';
import styled from 'styled-components';
import { buttonFocused, primary, secondary } from '@sberdevices/plasma-tokens';

import { MediaPlayerTimelineProps, PlayerType } from './types';

const formatNumber = (value: number): string => value.toString().padStart(2, '0');

export const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.round(time % 60);

    const minutesAndSeconds = [formatNumber(minutes), formatNumber(seconds)].join(':');

    return hours > 0 ? `${formatNumber(hours)}:${minutesAndSeconds}` : minutesAndSeconds;
};

const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0.625rem 0;
`;

const StyledTime = styled.span`
    font-size: 1rem;
    line-height: 1.25;
    letter-spacing: -0.019em;
`;

const StyledProgress = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 4px;
    border-radius: 2px;
    background-color: ${primary};
`;

const StyledTimelineTick = styled.span`
    position: absolute;
    top: 1px;
    left: 0;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    outline: none;
    background-color: ${primary};
    transform: translate(-50%, -50%);

    &:focus {
        box-shadow: 0 0 4px 0 ${buttonFocused};
    }
`;

const StyledTimeLine = styled.div`
    position: relative;
    flex: 1;
    max-width: 100%;
    height: 4px;
    margin: 0 1rem;
    border-radius: 2px;
    background-color: ${secondary};
`;

export const MediaPlayerTimeline = <T extends PlayerType>({
    className,
    playerRef,
    onTimeUpdate,
    currentTime,
    duration = 0,
    showTick = true,
}: MediaPlayerTimelineProps<T>): React.ReactElement => {
    const [mediaData, setMediaData] = React.useState({
        duration,
        currentTime: 0,
    });
    const currentTimeValue = currentTime ?? mediaData.currentTime;
    const durationValue = duration || mediaData.duration;

    const updateTime = React.useCallback(() => {
        if (!playerRef.current) {
            return;
        }

        const node = playerRef.current;
        const currentTimeSafe = currentTime ?? 0;

        onTimeUpdate?.(node.currentTime + currentTimeSafe);
        setMediaData((prevData) => ({
            ...prevData,
            currentTime: node.currentTime + currentTimeSafe,
        }));
    }, [onTimeUpdate, playerRef, currentTime]);

    const timelinePosition = (currentTimeValue / durationValue) * 100;

    React.useLayoutEffect(() => {
        if (!playerRef.current) {
            return;
        }

        const node = playerRef.current;

        node.addEventListener(
            'canplaythrough',
            () => {
                if (duration === 0 && !currentTime) {
                    setMediaData({
                        duration: node.duration,
                        currentTime: node.currentTime,
                    });
                }
            },
            { once: true },
        );

        node.addEventListener('timeupdate', updateTime);

        return () => {
            node.removeEventListener('timeupdate', updateTime);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerRef.current, updateTime, currentTime, duration]);

    React.useEffect(() => {
        if (duration && duration !== mediaData.duration) {
            setMediaData({
                ...mediaData,
                duration,
            });
        }
    }, [duration, mediaData]);

    return (
        <StyledWrapper className={className}>
            <StyledTime>{formatTime(currentTimeValue)}</StyledTime>
            <StyledTimeLine>
                <StyledProgress style={{ width: `${timelinePosition}%` }} />
                {showTick && <StyledTimelineTick style={{ left: `${timelinePosition}%` }} />}
            </StyledTimeLine>
            <StyledTime>{formatTime(durationValue)}</StyledTime>
        </StyledWrapper>
    );
};
