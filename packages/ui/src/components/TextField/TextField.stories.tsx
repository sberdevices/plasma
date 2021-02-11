import React, { useState } from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { IconSleep, IconEye } from '@sberdevices/plasma-icons';

import { InSpacing } from '../../helpers/StoryDecorators';
import { ActionButton } from '../Button';

import { TextField } from '.';

export default {
    title: 'Controls/TextField',
    component: TextField,
    decorators: [InSpacing],
};

export const Default = () => {
    const [value, setValue] = useState('Title 🌚');
    return (
        <TextField
            value={value}
            title={text('title', 'Label')}
            helperText={text('helperText', 'Helper text')}
            disabled={boolean('disabled', false)}
            status={select('status', ['success', 'error', undefined], undefined)}
            onChange={(v) => setValue(v.target.value)}
            onFocus={action('onFocus')}
            onBlur={action('onBlur')}
            contentLeft={boolean('contentLeft', true) && <IconSleep color="inherit" size="s" />}
            contentRight={
                boolean('contentRight', true) && (
                    <ActionButton view="clear">
                        <IconEye color="inherit" size="s" />
                    </ActionButton>
                )
            }
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
            status={select('status', ['success', 'error', undefined], undefined)}
            onChange={(v) => setValue(v.target.value)}
            onFocus={action('onFocus')}
            onBlur={action('onBlur')}
        />
    );
};
