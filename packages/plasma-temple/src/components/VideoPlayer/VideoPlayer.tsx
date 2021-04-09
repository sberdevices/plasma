import React from 'react';
import styled, { css } from 'styled-components';

import { Headline3, Spinner } from '@sberdevices/plasma-ui';
import { isControlVisible, MediaPlayerControls } from '../MediaPlayer/MediaPlayerControls';
import { MediaPlayerTimeline } from '../MediaPlayer/MediaPlayerTimeline';
import { ControlType, CustomMediaPlayerControlsProps } from '../MediaPlayer/types';

import { useMediaPlayer } from '../MediaPlayer/hooks/useMediaPlayer';
import { useMediaPlayerKeyboard } from '../MediaPlayer/hooks/useMediaPlayerKeyboard';
import { useTimer } from '../MediaPlayer/hooks/useTimer';
import { AssistantInsetsCommand } from '@sberdevices/assistant-client';
import { gridMargins, gridSizes, mediaQuery } from '@sberdevices/plasma-ui/utils';

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
    customControls?: React.ComponentType<CustomMediaPlayerControlsProps<HTMLVideoElement>>;
    insets?: Insets;
}

const opacityMixin = css<{ hidden: boolean }>`
    transition: opacity 0.3s ease-in-out;
    opacity: ${({ hidden }) => hidden ? 0 : 1};
`;

const paddingsControlsMixin = gridSizes.map((breakpoint) => {
    return mediaQuery(
        breakpoint,
    )(css`
        padding-left: ${gridMargins[breakpoint]}rem;
        padding-right: ${gridMargins[breakpoint]}rem;
    `);
});

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
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    ${opacityMixin}
    ${paddingsControlsMixin}
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
    top: ${({ insets }) => insets?.top ? `${insets?.top}px` : '2rem'};
    ${opacityMixin}
    ${paddingsControlsMixin}
`;

const CONTROLS_HIDE_TIMEOUT = 5000;

export const VideoPlayer = React.memo(({
    header,
    goBack,
    goNext,
    backDisabled,
    nextDisabled,
    alwaysShowControls,
    customControls: CustomControlsComponent,
    visibleControlList,
    insets,
    ...restProps
}: VideoPlayerProps) => {
    const {element, actions, state, playerRef } = useMediaPlayer('video', restProps);
    const { playback, jumpTo } = actions;
    const { currentTime, duration, loading, paused } = state;

    const { stopped: controlsHidden, startTimer } = useTimer(CONTROLS_HIDE_TIMEOUT);

    const isControlsHidden = controlsHidden && !alwaysShowControls;

    useMediaPlayerKeyboard(playback, isControlsHidden, () => !isControlsHidden && startTimer());

    React.useEffect(() => {
        if (!alwaysShowControls) {
            startTimer();
        }
    }, [alwaysShowControls, startTimer]);

    const customControlsActions = React.useMemo(() => ({
        ...actions,
        goBack,
        goNext,
    }), [actions, goBack, goNext]);

    const finished = Boolean(duration) && currentTime >= duration;

    return (
        <StyledContainer onClick={startTimer}>
            {element}
            {loading && <StyledSpinner />}
            <StyledOverlay transparent={controlsHidden || Boolean(alwaysShowControls)}>
                {CustomControlsComponent && (
                    <CustomControlsComponent
                        playerRef={playerRef}
                        controlsHidden={isControlsHidden}
                        state={{ ...state, backDisabled, nextDisabled, finished }}
                        actions={customControlsActions}
                    />
                )}
                {isControlVisible(ControlType.HEADER, visibleControlList) && (
                    <StyledHeader hidden={isControlsHidden} insets={insets}>{header}</StyledHeader>
                )}
                <StyledControlsWrapper hidden={isControlsHidden} insets={insets}>
                    <MediaPlayerControls
                        playback={playback}
                        goBack={goBack}
                        goNext={goNext}
                        jumpTo={jumpTo}
                        paused={paused}
                        finished={finished}
                        backDisabled={backDisabled}
                        nextDisabled={nextDisabled}
                        visibleControlList={visibleControlList}
                    />
                    {isControlVisible(ControlType.TIMELINE, visibleControlList) && (
                        <MediaPlayerTimeline currentTime={currentTime} duration={duration} />
                    )}
                </StyledControlsWrapper>
            </StyledOverlay>
        </StyledContainer>
    );
});
