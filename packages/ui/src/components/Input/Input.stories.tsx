import React, { useState } from 'react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Input } from './Input';

export default {
    title: 'Input',
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', width: '640px', padding: '40px' }}>
                <Story />
            </div>
        ),
    ],
};

export const Default = () => {
    const [value, setValue] = useState('Text Input 🌚');
    return (
        <Input
            value={value}
            disabled={boolean('disabled', false)}
            placeholder={text('placeholder', 'Type your value here')}
            onChange={(e) => setValue(e.target.value)}
            onFocus={action('onFocus')}
            onBlur={action('onBlur')}
            onResetClick={() => setValue('')}
        />
    );
};

export const WithIcon = () => {
    const [value, setValue] = useState('Command for 🤖');
    return (
        <Input
            value={value}
            disabled={boolean('disabled', false)}
            placeholder={text('placeholder', 'Type your command...')}
            iconName="assistant"
            onChange={(e) => setValue(e.target.value)}
        />
    );
};
