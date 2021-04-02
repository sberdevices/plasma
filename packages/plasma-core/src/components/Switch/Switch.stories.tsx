import React from 'react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Switch } from '.';

const onChange = action('onChange');
const onFocus = action('onFocus');
const onBlur = action('onBlur');

export default {
    title: 'Switch',
    component: Switch,
};

export const Default = () => <Switch value="val" onChange={onChange} onFocus={onFocus} onBlur={onBlur} />;
