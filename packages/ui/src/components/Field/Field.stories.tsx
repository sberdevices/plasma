import React, { useState } from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import { Field } from './Field';
import { Icon } from '../Icon/Icon';

export default {
    title: 'Field',
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', width: '640px', padding: '40px' }}>
                <Story />
            </div>
        ),
    ],
};

export const Default = () => {
    const [value, setValue] = useState('Title 🌚');
    return (
        <Field
            value={value}
            title={text('title', 'Label')}
            disabled={boolean('disabled', false)}
            onChange={(v) => setValue(v.target.value)}
            onFocus={action('onFocus')}
            onBlur={action('onBlur')}
        />
    );
};

export const LongText = () => {
    const [value, setValue] = useState('Field with very very long text that can not be displayed');
    return (
        <Field
            value={value}
            title={text('longTitle', 'Label has enormous text that will be shortened')}
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
        <Field
            value={value}
            title={text('withIconTitle', 'Custom range input')}
            contentLeft={
                <StyledGhostButton
                    onClick={(e) => {
                        e.stopPropagation();
                        setValue(`${Number(value) - 1}`);
                    }}
                >
                    <Icon icon="minus" size="s" />
                </StyledGhostButton>
            }
            contentRight={
                <StyledGhostButton
                    onClick={(e) => {
                        e.stopPropagation();
                        setValue(`${Number(value) + 1}`);
                    }}
                >
                    <Icon icon="plus" size="s" />
                </StyledGhostButton>
            }
            onChange={(e) => setValue(e.target.value)}
        />
    );
};
