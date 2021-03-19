export enum ControlType {
    PLAYBACK = 'playback',
    JUMP_BACK = 'jumpBack',
    JUMP_FORWARD = 'jumpForward',
    BACK = 'back',
    NEXT = 'next',
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

export type RenderMediaPlayerControlsFn<T extends HTMLVideoElement | HTMLAudioElement> = (props: {
    state: MediaPlayerState;
    actions: MediaPlayerActions;
    playerRef: React.RefObject<T>;
    controlsHidden: boolean;
}) => React.ReactNode;
