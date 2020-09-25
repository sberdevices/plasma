import React from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';

import { Button } from './Button';
import { Icon } from '../Icon/Icon';

export default {
    title: 'Button',
    decorators:  [
        (Story) => <div style={{ display: 'flex', padding: '40px' }}><Story/></div>
    ]
};

const sizes = ['l', 'm', 's'];
const views = ['primary', 'secondary', 'warning', 'critical', 'checked', 'clear'];
const pins = ['square-square', 'square-clear', 'clear-square', 'clear-clear', 'clear-circle', 'circle-clear', 'circle-circle'];

export const Default = () => (
    <Button
        disabled={boolean('disabled', false)}
        children={text('children', 'Button')}
    />
);

export const Sizes = () => (
    <Button
        disabled={boolean('disabled', false)}
        children={text('children', 'Button')}
        size={select('size', sizes, 'l')}
    />
);

export const Views = () => (
    <Button
        disabled={boolean('disabled', false)}
        children={text('children', 'Button')}
        view={select('view', views, 'primary')}
    />
);

export const Pins = () => (
    <Button
        disabled={boolean('disabled', false)}
        iconLeft={<Icon icon="clock"/>}
        pin={select('pin', pins, 'square-square')}
    />
);

export const WithIcon = () => (
    <>
        <Button
            disabled={boolean('disabled', false)}
            children={'Prev'}
            iconLeft={<Icon icon="skipPrevious"/>}
            style={{marginRight: '15px'}}
        />
        <Button
            disabled={boolean('disabled', false)}
            children={'Next'}
            iconRight={<Icon icon="skipNext"/>}
        />
    </>
);
