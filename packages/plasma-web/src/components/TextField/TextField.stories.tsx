import React from 'react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { IconPlaceholder, InSpacingDecorator } from '../../helpers';

import { TextField } from '.';

const onChange = action('onChange');
const onFocus = action('onFocus');
const onBlur = action('onBlur');

export default {
    title: 'Controls/TextField',
    component: TextField,
    decorators: [InSpacingDecorator],
};

export const Default = () => {
    const [value, setValue] = React.useState('Title 🌝');
    const status = select('status', ['error', ''], '');

    return (
        <TextField
            value={value}
            placeholder={text('placeholder', 'Label')}
            helperText={text('helperText', 'Helper text')}
            contentRight={boolean('contentRight', true) && <IconPlaceholder />}
            status={status === 'error' ? status : undefined}
            onChange={(e) => {
                setValue(e.target.value);
                onChange(e);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
};
