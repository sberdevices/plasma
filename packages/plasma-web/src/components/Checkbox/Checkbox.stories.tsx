import React from 'react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { InSpacingDecorator } from '../../helpers';

import { Checkbox } from '.';

export default {
    title: 'Controls/Checkbox',
    component: Checkbox,
    decorators: [InSpacingDecorator],
};

const onChange = action('onChange');
const onFocus = action('onFocus');
const onBlur = action('onBlur');

export const Default = () => {
    const value = 0;
    const [checked, setChecked] = React.useState(true);

    return (
        <Checkbox
            name={text('name', 'checkbox')}
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
