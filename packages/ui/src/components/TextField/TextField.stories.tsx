import React, { useState } from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { IconSettings } from '../Icon';

import { TextField } from './TextField';

export default {
    title: 'TextField',
};

export const Default = () => {
    const [value, setValue] = useState('Title 🌚');
    return (
        <TextField
            value={value}
            title={text('title', 'Label')}
            helperText={text('helperText', 'Helper text')}
            disabled={boolean('disabled', false)}
            hasSuccess={boolean('hasSuccess', false)}
            hasError={boolean('hasError', false)}
            onChange={(v) => setValue(v.target.value)}
            onFocus={action('onFocus')}
            onBlur={action('onBlur')}
            contentLeft={boolean('Content left', false) && <IconSettings size="s" />}
            contentRight={boolean('Content right', false) && <IconSettings size="s" />}
        />
    );
};

export const LongText = () => {
    const [value, setValue] = useState('TextField with very very long text that can not be displayed');
    return (
        <TextField
            value={value}
            title={text('title', 'Label has enormous text that will be shortened by dots')}
            helperText={text('helperText', 'Helper text very long text that can not be displayed by dots')}
            disabled={boolean('disabled', false)}
            hasSuccess={boolean('hasSuccess', false)}
            hasError={boolean('hasError', false)}
            onChange={(v) => setValue(v.target.value)}
            onFocus={action('onFocus')}
            onBlur={action('onBlur')}
        />
    );
};
