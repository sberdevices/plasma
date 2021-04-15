import React from 'react';
import { boolean, text, array, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { ControlType } from '../MediaPlayer/types';

import { VideoPlayer } from './VideoPlayer';

export default {
    title: 'Video Player',
};

export const Default = () => (
    <VideoPlayer
        header="Header"
        src={text('source', 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4')}
        visibleControlList={array('control list', Object.values(ControlType)) as ControlType[]}
        onPlay={action('onPlay')}
        onEnded={action('onEnded')}
        backDisabled={boolean('back disabled', false)}
        nextDisabled={boolean('next disabled', false)}
        alwaysShowControls={boolean('always show controls', false)}
        insets={object('insets', {
            top: 0,
            bottom: 144,
            left: 0,
            right: 0,
        })}
    />
);

export const WithAutoplay = () => (
    <VideoPlayer
        autoPlay={boolean('auto play', true)}
        muted
        src={text('source', 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4')}
        onPlay={action('onPlay')}
        onEnded={action('onEnded')}
    />
);

export const WithTimeRange = () => (
    <VideoPlayer
        src="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
        alwaysShowControls={boolean('always show controls', true)}
        startTime={10}
        endTime={15}
        onPlay={action('onPlay')}
        onEnded={action('onEnded')}
    />
);
