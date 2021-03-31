import React from 'react';
import styled from 'styled-components';

import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer';
import { setPositionAction } from '../../store/actions';
import { PageProps, VideoViewPayload, Screen } from '../../types';
import { CanvasAppContext } from '../../canvasAppContext';

export const StyledWrapper = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    margin-left: -50vw;
    left: 50%;
`;

export const Video: React.FC<PageProps<VideoViewPayload>> = ({ data, position, uiState, dispatch }) => {
    const { configRoute } = React.useContext(CanvasAppContext);
    const  customControls = configRoute?.type === Screen.video
        ? configRoute?.customControls
        : undefined;

    const { items, autoPlay, visibleControlList, alwaysShowControls } = data;
    const videos = Array.isArray(items) ? items : [items];
    const { src, title, startTime, endTime, poster } = videos[position];

    const onNext = React.useCallback(() => {
        if (position < videos.length - 1) {
            dispatch(setPositionAction({ position: position + 1 }));
        }
    }, [dispatch, position]);

    const onBack = React.useCallback(() => {
        if (position > 0) {
            dispatch(setPositionAction({ position: position - 1 }));
        } else {
            window.history.back();
        }
    }, [dispatch, position]);

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
                insets={uiState.insets}
                customControls={customControls}
            />
        </StyledWrapper>
    );
};

export default Video;
