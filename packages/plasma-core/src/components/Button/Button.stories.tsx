import React from 'react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Button } from '.';

const onClick = action('onClick');
const onFocus = action('onFocus');
const onBlur = action('onBlur');

export default {
    title: 'Button',
    component: Button,
};

const views = ['primary', 'secondary', 'warning', 'critical', 'checked', 'clear'];
const sizes = ['l', 'm', 's', 'xs', 'xxs', 'xxxs'];
const pins = [
    'square-square',
    'square-circle',
    'circle-square',
    'circle-circle',
    'circle-clear',
    'clear-circle',
    'clear-clear',
];

export const Default = () => (
    <Button
        view={select('view', views, 'primary') as 'primary'}
        size={select('size', sizes, 'l') as 'l'}
        pin={select('pin', pins, 'square-square') as 'square-square'}
        disabled={boolean('disabled', false)}
        outlined={boolean('outlined', false)}
        focused={boolean('focused', false)}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
    >
        {text('text', 'Label')}
    </Button>
);
