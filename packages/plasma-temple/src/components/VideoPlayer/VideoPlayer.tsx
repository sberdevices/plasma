import React from 'react';
import styled, { css } from 'styled-components';
import classnames from 'classnames';
import { Headline3, Spinner } from '@sberdevices/plasma-ui';
import { gridMargins, gridSizes, mediaQuery } from '@sberdevices/plasma-ui/utils';

import { isControlVisible, MediaPlayerControls } from '../MediaPlayer/MediaPlayerControls';
import { MediaPlayerTimeline } from '../MediaPlayer/MediaPlayerTimeline';
import { ControlType, CustomMediaPlayerControlsProps } from '../MediaPlayer/types';
import { useMediaPlayer } from '../MediaPlayer/hooks/useMediaPlayer';
import { useMediaPlayerKeyboard } from '../MediaPlayer/hooks/useMediaPlayerKeyboard';
import { useTimer } from '../MediaPlayer/hooks/useTimer';
import { MediaPlayer } from '../MediaPlayer/MediaPlayer';
import { useInsets } from '../../hooks';
import { Insets, ObjectFit } from '../../types';

export interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    header?: React.ReactNode;
    goBack?: () => void;
    goNext?: () => void;
    backDisabled?: boolean;
    nextDisabled?: boolean;
    alwaysShowControls?: boolean;
    controlsHidden?: boolean;
    visibleControlList?: ControlType[];
    startTime?: number;
    endTime?: number;
    customControls?: React.ComponentType<CustomMediaPlayerControlsProps<HTMLVideoElement>>;
    videoFit?: ObjectFit;
    posterClassName?: string;
    children?: (props: CustomMediaPlayerControlsProps<HTMLVideoElement>) => React.ReactElement;
    src: string;
}

const opacityMixin = css<{ hidden: boolean }>`
    transition: opacity 0.3s ease-in-out;
    opacity: ${({ hidden }) => (hidden ? 0 : 1)};
`;

const paddingsControlsMixin = gridSizes.map((breakpoint) => {
    return mediaQuery(breakpoint)(css`
        padding-left: ${gridMargins[breakpoint]}rem;
        padding-right: ${gridMargins[breakpoint]}rem;
    `);
});

const StyledContainer = styled.div<{ videoFit: ObjectFit }>`
    position: relative;
    height: 100%;
    width: 100%;

    & > video {
        height: 100%;
        width: 100%;
        object-fit: ${({ videoFit }) => videoFit};
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
    background-color: ${({ transparent }) => (transparent ? 'transparent' : 'rgba(8, 8, 8, 0.56)')};
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
    top: ${({ insets }) => (insets?.top ? `${insets?.top}px` : '2rem')};
    ${opacityMixin}
    ${paddingsControlsMixin}
`;

const CONTROLS_HIDE_TIMEOUT = 5000;

export const VideoPlayer = React.memo(
    ({
        header,
        goBack,
        goNext,
        backDisabled,
        nextDisabled,
        alwaysShowControls,
        controlsHidden: forceControlsHidden,
        customControls: CustomControlsComponent,
        visibleControlList,
        children,
        startTime = 0,
        endTime,
        autoPlay,
        muted,
        videoFit = 'contain',
        posterClassName = '',
        className,
        ...restProps
    }: VideoPlayerProps) => {
        const insets = useInsets();
        const playerRef = React.useRef<HTMLVideoElement>(null);
        const { actions, state } = useMediaPlayer(playerRef, {
            start: startTime,
            end: endTime,
            autoPlay,
            muted,
        });
        const { playback, jumpTo } = actions;
        const { currentTime, duration, loading, paused } = state;
        const [isPosterShowing, setIsPosterShowing] = React.useState(true);

        React.useLayoutEffect(() => {
            const isOnStart = currentTime === 0;
            if (isPosterShowing && !loading && !isOnStart) {
                setIsPosterShowing(false);
            }
            if (!isPosterShowing && loading && isOnStart) {
                setIsPosterShowing(true);
            }
        }, [isPosterShowing, loading, currentTime]);

        const { stopped: controlsHidden, startTimer, stopTimer } = useTimer(CONTROLS_HIDE_TIMEOUT);

        const isControlsHidden = forceControlsHidden || (controlsHidden && !alwaysShowControls);

        const onKewDown = React.useCallback(() => startTimer(), [startTimer]);
        useMediaPlayerKeyboard(playback, isControlsHidden, onKewDown);

        React.useEffect(() => {
            if (!alwaysShowControls) {
                startTimer();
            }

            return () => {
                stopTimer();
            };
        }, [alwaysShowControls, startTimer, stopTimer]);

        const customControlsActions = React.useMemo(
            () => ({
                ...actions,
                goBack,
                goNext,
            }),
            [actions, goBack, goNext],
        );

        const controlledTimeLineProps = startTime && endTime ? { currentTime, duration: endTime - startTime } : {};

        const finished = Boolean(duration) && currentTime >= duration;
        const playerState = { ...state, backDisabled, nextDisabled, finished };
        const classNames = classnames(className, { [posterClassName]: isPosterShowing });
        return (
            <StyledContainer onClick={startTimer} videoFit={videoFit}>
                <MediaPlayer type="video" {...restProps} innerRef={playerRef} className={classNames} />
                {loading && <StyledSpinner />}
                <StyledOverlay transparent={isControlsHidden}>
                    {CustomControlsComponent && (
                        <CustomControlsComponent
                            playerRef={playerRef}
                            controlsHidden={isControlsHidden}
                            state={playerState}
                            actions={customControlsActions}
                        />
                    )}
                    {children &&
                        children({
                            playerRef,
                            controlsHidden: isControlsHidden,
                            state: playerState,
                            actions: customControlsActions,
                        })}
                    {isControlVisible(ControlType.HEADER, visibleControlList) && (
                        <StyledHeader hidden={isControlsHidden} insets={insets}>
                            {header}
                        </StyledHeader>
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
                            canPlay={!loading}
                        />
                        {isControlVisible(ControlType.TIMELINE, visibleControlList) && (
                            <MediaPlayerTimeline playerRef={playerRef} {...controlledTimeLineProps} />
                        )}
                    </StyledControlsWrapper>
                </StyledOverlay>
            </StyledContainer>
        );
    },
);
