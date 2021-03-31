import React from 'react'
import styled from 'styled-components';
import { buttonFocused, primary, secondary } from '@sberdevices/plasma-tokens';

interface MediaPlayerTimelineProps {
    currentTime: number;
    duration: number;
    className?: string;
}

const formatNumber = (value: number) => value.toString().padStart(2, '0');

export const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.round(time % 60);

    const minutesAndSeconds = [formatNumber(minutes), formatNumber(seconds)].join(':');

    return hours > 0
        ? `${formatNumber(hours)}:${minutesAndSeconds}`
        : minutesAndSeconds;
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

export const MediaPlayerTimeline = ({ currentTime, duration, className }: MediaPlayerTimelineProps) => {
    const timelinePosition = Math.min(currentTime / duration * 100, 100);

    return (
        <StyledWrapper className={className}>
            <StyledTime>{formatTime(currentTime)}</StyledTime>
            <StyledTimeLine>
                <StyledProgress style={{ width: `${timelinePosition}%` }} />
                <StyledTimelineTick style={{ left: `${timelinePosition}%` }} />
            </StyledTimeLine>
            <StyledTime>{formatTime(duration)}</StyledTime>
        </StyledWrapper>
    )
}
