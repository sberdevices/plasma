import React from 'react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { IconPlaceholder, InSpacingDecorator } from '../../helpers';

import { TextArea } from '.';

const onChange = action('onChange');
const onFocus = action('onFocus');
const onBlur = action('onBlur');

export default {
    title: 'Controls/TextArea',
    component: TextArea,
    decorators: [InSpacingDecorator],
};

export const Default = () => {
    const [value, setValue] = React.useState('Some text 🌝');

    return (
        <TextArea
            value={value}
            placeholder={text('placeholder', 'Label')}
            helperText={text('helperText', 'Helper text')}
            contentRight={boolean('contentRight', true) && <IconPlaceholder />}
            status={select('status', ['', 'success', 'error'], '') || undefined}
            resize={select('resize', ['none', 'both', 'horizontal', 'vertical'], 'vertical')}
            disabled={boolean('disabled', false)}
            readOnly={boolean('readOnly', false)}
            onChange={(e) => {
                setValue(e.target.value);
                onChange(e);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
};
