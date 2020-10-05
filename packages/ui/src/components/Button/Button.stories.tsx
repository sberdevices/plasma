import React from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';

import { Icon } from '../Icon/Icon';

import { Button } from './Button';

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

const sizes: ['l', 'm', 's'] = ['l', 'm', 's'];
const views: ['primary', 'secondary', 'warning', 'critical', 'checked', 'clear'] = [
    'primary',
    'secondary',
    'warning',
    'critical',
    'checked',
    'clear',
];
const pins: [
    'square-square',
    'square-clear',
    'clear-square',
    'clear-clear',
    'clear-circle',
    'circle-clear',
    'circle-circle',
] = ['square-square', 'square-clear', 'clear-square', 'clear-clear', 'clear-circle', 'circle-clear', 'circle-circle'];

export const Default = () => <Button disabled={boolean('disabled', false)}>{text('children', 'Button')}</Button>;

export const Sizes = () => (
    <Button disabled={boolean('disabled', false)} size={select('size', sizes, 'l')}>
        {text('children', 'Button')}
    </Button>
);

export const Views = () => (
    <Button disabled={boolean('disabled', false)} view={select('view', views, 'primary')}>
        {text('children', 'Button')}
    </Button>
);

export const Pins = () => (
    <Button
        disabled={boolean('disabled', false)}
        iconLeft={<Icon icon="clock" />}
        pin={select('pin', pins, 'square-square')}
    />
);

export const WithIcon = () => (
    <>
        <Button
            disabled={boolean('disabled', false)}
            iconLeft={<Icon icon="skipPrevious" />}
            style={{ marginRight: '15px' }}
        >
            Prev
        </Button>
        <Button disabled={boolean('disabled', false)} iconRight={<Icon icon="skipNext" />}>
            Next
        </Button>
    </>
);
