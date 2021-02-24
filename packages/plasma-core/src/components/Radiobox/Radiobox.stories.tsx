import React from 'react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Radiobox } from '.';

export default {
    title: 'Radiobox',
    component: Radiobox,
};

const onChange = action('onChange');
const onFocus = action('onFocus');
const onBlur = action('onBlur');

export const Default = () => {
    const value = 0;
    const [checked, setChecked] = React.useState(true);

    return (
        <Radiobox
            name={text('name', 'Radiobox')}
            value={value}
            label={text('label', 'Label')}
            disabled={boolean('disabled', false)}
            checked={checked}
            onChange={(event) => {
                setChecked(event.target.checked);
                onChange(event);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
};
