import React from 'react';
import styled from 'styled-components';

import { VideoPlayer, VideoPlayerProps } from '../../components/VideoPlayer/VideoPlayer';
import { CustomMediaPlayerControlsProps } from '../../components/MediaPlayer';
import { useGetMutableValue } from '../../hooks/useGetMutableValue';
import { AnyObject } from '../../types';

import { VideoPageState } from './types';

interface VideoPageProps<T extends AnyObject = AnyObject>
    extends Pick<
        VideoPlayerProps,
        | 'autoPlay'
        | 'alwaysShowControls'
        | 'visibleControlList'
        | 'controlsHidden'
        | 'videoFit'
        | 'posterClassName'
        | 'insets'
    > {
    state: VideoPageState<T>;
    customControls?: React.ComponentType<CustomMediaPlayerControlsProps<HTMLVideoElement>>;
    children?: (props: CustomMediaPlayerControlsProps<HTMLVideoElement>) => React.ReactElement;
    changeState: (state: VideoPageState<T>) => void;
}

export const StyledWrapper = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    margin-left: -50vw;
    left: 50%;
`;

export function VideoPage<T extends AnyObject = AnyObject>({
    state,
    customControls,
    autoPlay,
    visibleControlList,
    alwaysShowControls,
    controlsHidden,
    videoFit,
    posterClassName,
    children,
    changeState,
    insets,
}: VideoPageProps<T>): React.ReactElement {
    const { items, position } = state;
    const videos = Array.isArray(items) ? items : [items];
    const { src, title, startTime, endTime, poster } = videos[position];

    const getState = useGetMutableValue(state);

    const onNext = React.useCallback(() => {
        if (position < videos.length - 1) {
            changeState({ ...getState(), position: position + 1 });
        }
    }, [position, videos.length, changeState, getState]);

    const onBack = React.useCallback(() => {
        if (position > 0) {
            changeState({ ...getState(), position: position - 1 });
        } else {
            window.history.back();
        }
    }, [position, changeState, getState]);

    return (
        <StyledWrapper>
            <VideoPlayer
                src={src}
                poster={poster}
                header={title}
                autoPlay={autoPlay}
                visibleControlList={visibleControlList}
                alwaysShowControls={alwaysShowControls}
                controlsHidden={controlsHidden}
                startTime={startTime}
                endTime={endTime}
                goNext={onNext}
                goBack={onBack}
                nextDisabled={position === videos.length - 1}
                customControls={customControls}
                videoFit={videoFit}
                posterClassName={posterClassName}
                insets={insets}
            >
                {children}
            </VideoPlayer>
        </StyledWrapper>
    );
}

export default VideoPage;
