import React from 'react';
import styled, { css } from 'styled-components';

import { Headline3, Spinner } from '@sberdevices/ui';
import { MediaPlayerControls } from '../MediaPlayer/MediaPlayerControls';
import { MediaPlayerTimeline } from '../MediaPlayer/MediaPlayerTimeline';
import { ControlType, RenderMediaPlayerControlsFn } from '../MediaPlayer/types';

import { useMediaPlayer } from '../MediaPlayer/hooks/useMediaPlayer';
import { useMediaPlayerKeyboard } from '../MediaPlayer/hooks/useMediaPlayerKeyboard';
import { useTimer } from '../MediaPlayer/hooks/useTimer';
import { AssistantInsetsCommand } from '@sberdevices/assistant-client';

type Insets = AssistantInsetsCommand['insets'];

export interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement>{
    header?: React.ReactNode;
    goBack?: () => void;
    goNext?: () => void;
    backDisabled?: boolean;
    nextDisabled?: boolean;
    alwaysShowControls?: boolean;
    visibleControlList?: ControlType[];
    startTime?: number;
    endTime?: number;
    children?: React.ReactNode | RenderMediaPlayerControlsFn<HTMLVideoElement>;
    insets?: Insets;
}

const opacityMixin = css<{ hidden: boolean }>`
    transition: opacity 0.3s ease-in-out;
    opacity: ${({ hidden }) => hidden ? 0 : 1};
`;

const StyledContainer = styled.div`
    position: relative;
    height: 100%;
    width: 100%;

    & > video {
        height: 100%;
        width: 100%;
        object-fit: contain;
        background: rgba(8, 8, 8, 0.56);
    }
`;

const StyledOverlay = styled.div<{ transparent: boolean }>`
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: background-color 0.3s ease-in-out;
    background-color: ${({ transparent }) => transparent ? 'transparent' : 'rgba(8, 8, 8, 0.56)'};
    z-index: 10;
`;

const StyledControlsWrapper = styled.div<{ hidden: boolean; insets?: Insets }>`
    position: absolute;
    bottom: ${({ insets }) => insets?.bottom ?? 0}px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    ${opacityMixin}
`;

const StyledSpinner = styled(Spinner)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50);
`;

const StyledHeader = styled(Headline3)<{ hidden: boolean; insets?: Insets }>`
    display: inline-block;
    position: absolute;
    top: ${({ insets }) => insets?.top ? `${insets?.top}px` : '0.75rem'};
    left: ${({ insets }) => insets?.left ? `${insets?.top}px` : '0.75rem'};
    ${opacityMixin}
`;

const CONTROLS_HIDE_TIMEOUT = 5000;

export const VideoPlayer = React.memo(({
    header,
    goBack,
    goNext,
    backDisabled,
    nextDisabled,
    alwaysShowControls,
    children,
    visibleControlList,
    insets,
    ...restProps
}: VideoPlayerProps) => {
    const {element, actions, state, playerRef } = useMediaPlayer('video', restProps);
    const { playback, jumpTo } = actions;
    const { currentTime, duration, loading, paused } = state;

    const { stopped: controlsHidden, startTimer } = useTimer(CONTROLS_HIDE_TIMEOUT);

    const isControlsHidden = controlsHidden && !alwaysShowControls;

    useMediaPlayerKeyboard(playback, isControlsHidden);

    React.useEffect(() => {
        if (!alwaysShowControls) {
            startTimer();
        }
    }, [alwaysShowControls, startTimer]);

    return (
        <StyledContainer onClick={startTimer}>
            {element}
            {loading && <StyledSpinner />}
            <StyledOverlay transparent={controlsHidden || Boolean(alwaysShowControls)}>
                {typeof children === 'function'
                    ? children({ state, actions, playerRef, controlsHidden: isControlsHidden })
                    : children
                }
                <StyledHeader hidden={isControlsHidden} insets={insets}>{header}</StyledHeader>
                <StyledControlsWrapper hidden={isControlsHidden} insets={insets}>
                    <MediaPlayerControls
                        playback={playback}
                        goBack={goBack}
                        goNext={goNext}
                        jumpTo={jumpTo}
                        paused={paused}
                        finished={Boolean(duration) && currentTime >= duration}
                        disabledBack={backDisabled}
                        disabledNext={nextDisabled}
                        visibleControlList={visibleControlList}
                    />
                    <MediaPlayerTimeline currentTime={currentTime} duration={duration} />
                </StyledControlsWrapper>
            </StyledOverlay>
        </StyledContainer>
    );
});
