import React from 'react';

import { MediaPlayerPropsMap, PlayerType, PlayerTypeMap } from './types';

interface CommonMediaPlayerProps<T extends PlayerType> {
    type: T;
    src: string;
    className?: string;
}

export type MediaPlayerProps<T extends PlayerType> = CommonMediaPlayerProps<T> &
    MediaPlayerPropsMap[T] & {
        innerRef?: React.RefObject<PlayerTypeMap[T]>;
    };

export const MediaPlayer = <T extends PlayerType>({
    type,
    innerRef,
    ...props
}: MediaPlayerProps<T>): React.ReactElement => {
    return React.createElement(type, {
        ref: innerRef,
        ...props,
    });
};
