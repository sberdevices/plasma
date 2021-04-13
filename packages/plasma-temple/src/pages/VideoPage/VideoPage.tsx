import React from 'react';
import styled from 'styled-components';

import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer';
import { VideoPageState } from './types';
import { CustomMediaPlayerControlsProps } from '../../components/MediaPlayer';
import { useInsets } from '../../hooks';

interface VideoPageProps {
    state: VideoPageState;
    customControls?: React.ComponentType<CustomMediaPlayerControlsProps<HTMLVideoElement>>;
    changeState: (state: VideoPageState) => void;
}

export const StyledWrapper = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    margin-left: -50vw;
    left: 50%;
`;

export const Video: React.FC<VideoPageProps> = ({ state, customControls, changeState }) => {
    const { items, autoPlay, visibleControlList, alwaysShowControls, position } = state;
    const videos = Array.isArray(items) ? items : [items];
    const { src, title, startTime, endTime, poster } = videos[position];

    const insets = useInsets();
    const onNext = React.useCallback(() => {
        if (position < videos.length - 1) {
            changeState({ ...state, position: position + 1 });
        }
    }, [state, position]);

    const onBack = React.useCallback(() => {
        if (position > 0) {
            changeState({ ...state, position: position - 1 });
        } else {
            window.history.back();
        }
    }, [state, position]);

    return (
        <StyledWrapper>
            <VideoPlayer
                src={src}
                poster={poster}
                header={title}
                autoPlay={autoPlay}
                visibleControlList={visibleControlList}
                alwaysShowControls={alwaysShowControls}
                startTime={startTime}
                endTime={endTime}
                goNext={onNext}
                goBack={onBack}
                nextDisabled={position === videos.length - 1}
                insets={insets}
                customControls={customControls}
            />
        </StyledWrapper>
    );
};

export default Video;
