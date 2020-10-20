import React from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';

import { Icon } from '../Icon/Icon';
import { Button, View, Size, Pin } from './Button';

export default {
    title: 'Button',
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', padding: '40px' }}>
                <Story />
            </div>
        ),
    ],
};

const sizes: Size[] = ['l', 'm', 's'];
const views: View[] = ['primary', 'secondary', 'warning', 'critical', 'checked', 'clear'];
const pins: Pin[] = [
    'square-square',
    'square-clear',
    'clear-square',
    'clear-clear',
    'clear-circle',
    'circle-clear',
    'circle-circle',
];

export const Default = () => (
    <Button
        text={text('text', 'Button')}
        motion={boolean('motion', true)}
        disabled={boolean('disabled', false)}
        fullWidth={boolean('fullWidth', false)}
    />
);

export const Sizes = () => (
    <Button
        text={text('text', 'Button')}
        size={select('size', sizes, 'l')}
        motion={boolean('motion', true)}
        disabled={boolean('disabled', false)}
        fullWidth={boolean('fullWidth', false)}
    />
);

export const Views = () => (
    <Button
        text={text('text', 'Button')}
        view={select('view', views, 'primary')}
        motion={boolean('motion', true)}
        disabled={boolean('disabled', false)}
        fullWidth={boolean('fullWidth', false)}
    />
);

export const Pins = () => (
    <Button
        pin={select('pin', pins, 'square-square')}
        contentLeft={<Icon icon="clock" />}
        motion={boolean('motion', true)}
        disabled={boolean('disabled', false)}
        fullWidth={boolean('fullWidth', false)}
    />
);

export const WithIcon = () => (
    <>
        <Button
            text="Prev"
            contentLeft={<Icon icon="skipPrevious" />}
            motion={boolean('motion', true)}
            disabled={boolean('disabled', false)}
            fullWidth={boolean('fullWidth', false)}
            style={{ marginRight: '15px' }}
        />
        <Button
            text="Next"
            contentRight={<Icon icon="skipNext" />}
            motion={boolean('motion', true)}
            disabled={boolean('disabled', false)}
            fullWidth={boolean('fullWidth', false)}
            style={{ marginLeft: '15px' }}
        />
    </>
);
