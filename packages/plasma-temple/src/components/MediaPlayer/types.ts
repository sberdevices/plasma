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

export type PlayerType = keyof PlayerTypeMap;

export interface MediaPlayerPropsMap {
    audio: React.VideoHTMLAttributes<HTMLAudioElement>;
    video: React.VideoHTMLAttributes<HTMLVideoElement>;
}

export interface MediaPlayerState {
    duration: number;
    paused: boolean;
    muted: boolean;
    currentTime: number;
    volume: number;
    loading: boolean;
    buffered?: TimeRanges;
}

export interface MediaPlayerActions {
    playback: () => void;
    seekTo: (time: number) => void;
    volume: (volume: number) => void;
    mute: () => void;
    jumpTo: (sign: 1 | -1) => void;
}

export interface CustomMediaPlayerControlsProps<T extends HTMLVideoElement | HTMLAudioElement> {
    state: MediaPlayerState & { backDisabled?: boolean; nextDisabled?: boolean; finished: boolean; }
    actions: MediaPlayerActions & { goBack?: () => void; goNext?: () => void; };
    playerRef: React.RefObject<T>;
    controlsHidden: boolean;
}
