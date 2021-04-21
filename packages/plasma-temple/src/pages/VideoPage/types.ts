import { VideoPlayerProps } from '../../components/VideoPlayer/VideoPlayer';
import { AnyObject } from '../../types';

export interface VideoItem extends Pick<VideoPlayerProps, 'src' | 'startTime' | 'endTime' | 'poster'> {
    id: string;
    title: string;
}

export type VideoPageState<T extends AnyObject = AnyObject> = T & {
    items: VideoItem | VideoItem[];
    position: number;
};
