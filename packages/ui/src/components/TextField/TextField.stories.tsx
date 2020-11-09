import React, { useState } from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import { Icon } from '../Icon/Icon';

import { TextField } from './TextField';

export default {
    title: 'TextField',
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', width: '20rem', padding: '40px' }}>
                <Story />
            </div>
        ),
    ],
};

export const Default = () => {
    const [value, setValue] = useState('Title 🌚');
    return (
        <TextField
            value={value}
            title={text('title', 'Label')}
            disabled={boolean('disabled', false)}
            hasSuccess={boolean('hasSuccess', false)}
            hasError={boolean('hasError', false)}
            onChange={(v) => setValue(v.target.value)}
            onFocus={action('onFocus')}
            onBlur={action('onBlur')}
        />
    );
};

export const LongText = () => {
    const [value, setValue] = useState('TextField with very very long text that can not be displayed');
    return (
        <TextField
            value={value}
            title={text('title', 'Label has enormous text that will be shortened')}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

const StyledGhostButton = styled.button`
    appearance: none;
    background: none;
    border: 0 none;

    &:focus {
        outline: none;
    }
`;

export const WithIcon = () => {
    const [value, setValue] = useState('5');
    return (
        <>
            <TextField
                value={value}
                title={text('title', 'Label')}
                style={{ marginRight: '1rem' }}
                contentLeft={<Icon icon="assistant" size="s" />}
                onChange={(e) => setValue(e.target.value)}
            />
            <TextField
                value={value}
                title={text('title', 'Label')}
                contentRight={<Icon icon="assistant" size="s" />}
                onChange={(e) => setValue(e.target.value)}
            />
        </>
    );
};
