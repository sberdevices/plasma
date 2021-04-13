import { VideoPlayerProps } from '../../components/VideoPlayer/VideoPlayer';

export interface VideoItem extends Pick<VideoPlayerProps, 'src' | 'startTime' | 'endTime' | 'poster'> {
    id: string;
    title: string;
}

export interface VideoPageState
    extends Pick<VideoPlayerProps, 'autoPlay' | 'alwaysShowControls' | 'visibleControlList'> {
    items: VideoItem | VideoItem[];
    position: number;
}
