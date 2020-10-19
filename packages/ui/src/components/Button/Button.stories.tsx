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

export const Default = () => <Button text={text('text', 'Button')} disabled={boolean('disabled', false)} />;

export const Sizes = () => (
    <Button text={text('text', 'Button')} disabled={boolean('disabled', false)} size={select('size', sizes, 'l')} />
);

export const Views = () => (
    <Button
        text={text('text', 'Button')}
        disabled={boolean('disabled', false)}
        view={select('view', views, 'primary')}
    />
);

export const Pins = () => (
    <Button
        disabled={boolean('disabled', false)}
        contentLeft={<Icon icon="clock" />}
        pin={select('pin', pins, 'square-square')}
    />
);

export const WithIcon = () => (
    <>
        <Button
            text="Prev"
            disabled={boolean('disabled', false)}
            contentLeft={<Icon icon="skipPrevious" />}
            style={{ marginRight: '15px' }}
        />
        <Button
            text="Next"
            disabled={boolean('disabled', false)}
            contentRight={<Icon icon="skipNext" />}
            style={{ marginLeft: '15px' }}
        />
    </>
);
