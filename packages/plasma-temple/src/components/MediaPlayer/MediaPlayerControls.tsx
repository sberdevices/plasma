import React from 'react';
import styled from 'styled-components';

import { IconRoot, IconPause, IconPlay, IconPrevious, IconNext, IconRepeat } from '@sberdevices/plasma-icons';
import { MediaPlayerButton, MediaPlayerButtonProps } from './MediaPlayerButton';

import { ControlType, MediaPlayerActions } from './types';
import { ForwardIcon } from './MediaPlayer.assets/ForwardIcon';
import { ReplayIcon } from './MediaPlayer.assets/ReplayIcon';

interface MediaPlayerControlsProps {
    playback: () => void;
    jumpTo: MediaPlayerActions['jumpTo'];
    goBack?: () => void;
    goNext?: () => void;
    paused: boolean;
    finished: boolean;
    disabledBack?: boolean;
    disabledNext?: boolean;
    visibleControlList?: ControlType[];
    className?: string;

}

const isControlVisible = (control: ControlType, controlList?: ControlType[]) => {
    if (!controlList || !controlList.length) {
        return true;
    }

    return controlList.includes(control);
}

const StyledWrapper = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
`;

const StyledTimeTravelButtonText = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 14px;
    line-height: 1.2;
    transform: translate(-50%, -50%);
`;
const TimeTravelButton = ({ forward, ...restProps }: MediaPlayerButtonProps & { forward?: boolean }) => {
    return (
        <MediaPlayerButton {...restProps}>
            <IconRoot icon={forward ? ForwardIcon : ReplayIcon} size="xs" />
            <StyledTimeTravelButtonText>10</StyledTimeTravelButtonText>
        </MediaPlayerButton>
    );
};

export const MediaPlayerControls = ({
    playback,
    goBack,
    goNext,
    jumpTo,
    paused,
    finished,
    disabledBack,
    disabledNext,
    visibleControlList,
    className,
}: MediaPlayerControlsProps) => {
        const IconPlayComponent = finished ? IconRepeat : IconPlay;

        return (
        <StyledWrapper className={className}>
            <MediaPlayerButton
                disabled={disabledBack}
                onClick={goBack}
                visible={isControlVisible(ControlType.BACK, visibleControlList)}
            >
                <IconPrevious size="xs" />
            </MediaPlayerButton>
            <TimeTravelButton
                onClick={() => jumpTo(-1)}
                visible={isControlVisible(ControlType.JUMP_BACK, visibleControlList)}
            />
            <MediaPlayerButton onClick={playback} visible={isControlVisible(ControlType.PLAYBACK, visibleControlList)}>
                {paused ? <IconPlayComponent size="xs" /> : <IconPause size="xs" />}
            </MediaPlayerButton>
            <TimeTravelButton
                onClick={() => jumpTo(1)}
                visible={isControlVisible(ControlType.JUMP_FORWARD, visibleControlList)}
                forward
            />
            <MediaPlayerButton
                disabled={disabledNext}
                onClick={goNext}
                visible={isControlVisible(ControlType.NEXT, visibleControlList)}
            >
                <IconNext size="xs" />
            </MediaPlayerButton>
        </StyledWrapper>
    );
};
