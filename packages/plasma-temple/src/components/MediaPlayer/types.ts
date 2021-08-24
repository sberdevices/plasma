export enum ControlType {
    PLAYBACK = 'playback',
    JUMP_BACK = 'jumpBack',
    JUMP_FORWARD = 'jumpForward',
    BACK = 'back',
    NEXT = 'next',
    TIMELINE = 'timeline',
    HEADER = 'header',
}

export interface PlayerTypeMap {
    audio: HTMLAudioElement;
    video: HTMLVideoElement;
}

export type PlayerType = keyof PlayerTypeMap; // audio | video

export interface MediaPlayerPropsMap {
    audio: React.VideoHTMLAttributes<HTMLAudioElement>;
    video: React.VideoHTMLAttributes<HTMLVideoElement>;
}

export interface MediaPlayerState {
    duration: number;
    paused: boolean;
    muted: boolean;
    currentTime: number;
    loading: boolean;
}

export interface MediaPlayerActions {
    playback: () => void;
    seekTo: (time: number) => void;
    jumpTo: (sign: 1 | -1) => void;
}

export interface CustomMediaPlayerControlsProps<T extends HTMLVideoElement | HTMLAudioElement> {
    state: MediaPlayerState & { backDisabled?: boolean; nextDisabled?: boolean; finished: boolean };
    actions: MediaPlayerActions & { goBack?: () => void; goNext?: () => void };
    playerRef: React.RefObject<T>;
    controlsHidden: boolean;
}

export interface MediaPlayerTimelineProps<T extends PlayerType> {
    className?: string;
    playerRef: React.RefObject<PlayerTypeMap[T]>;
    onTimeUpdate?: (time: number) => void;
    currentTime?: number;
    duration?: number;
    showTick?: boolean;
}

export interface MediaPlayerControlsProps {
    playback: () => void;
    jumpTo: MediaPlayerActions['jumpTo'];
    goBack?: () => void;
    goNext?: () => void;
    paused: boolean;
    finished: boolean;
    backDisabled?: boolean;
    nextDisabled?: boolean;
    canPlay: boolean;
    visibleControlList?: ControlType[];
    className?: string;
}
