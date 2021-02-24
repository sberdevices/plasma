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
    const status = select('status', ['success', 'error', ''], '');

    return (
        <TextField
            value={value}
            label={text('title', 'Label')}
            helperText={text('helperText', 'Helper text')}
            disabled={boolean('disabled', false)}
            status={status !== '' ? status : undefined}
            contentLeft={boolean('contentLeft', true) && <IconSleep color="inherit" size="s" />}
            contentRight={
                boolean('contentRight', true) && (
                    <ActionButton view="clear">
                        <IconEye color="inherit" size="s" />
                    </ActionButton>
                )
            }
            onChange={(v) => setValue(v.target.value)}
            onFocus={action('onFocus')}
            onBlur={action('onBlur')}
        />
    );
};
