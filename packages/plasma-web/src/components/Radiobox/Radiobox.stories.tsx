import React from 'react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { InSpacingDecorator } from '../../helpers';

import { Radiobox } from '.';

export default {
    title: 'Controls/Radiobox',
    component: Radiobox,
    decorators: [InSpacingDecorator],
};

const onChange = action('onChange');
const onFocus = action('onFocus');
const onBlur = action('onBlur');

const name = 'language';
const items = [
    {
        name,
        value: 'c',
        label: 'C',
        disabled: false,
        description: 'A general-purpose, procedural computer programming language.',
    },
    { name, value: 'cpp', label: 'C++', disabled: false },
    { name, value: 'assembly', label: 'Assembly', disabled: false },
    { name, value: 'elixir', label: 'Elixir', disabled: true },
];

export const Default = () => {
    const [value, setValue] = React.useState('c');

    return items.map((item) => (
        <Radiobox
            key={item.value}
            name={item.name}
            value={item.value}
            label={item.label}
            disabled={item.disabled}
            checked={value[item.value]}
            description={item.description}
            onChange={(event) => {
                setValue(item.value);
                onChange(event);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    ));
};

export const TextDescription = () => {
    const value = 0;
    const [checked, setChecked] = React.useState(true);

    return (
        <Radiobox
            name={text('name', 'Radiobox')}
            value={value}
            label={text('label', 'Label')}
            description={text('description', 'Description')}
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

export const NodeDescription = () => {
    const value = 0;
    const [checked, setChecked] = React.useState(true);
    const description = (
        <div>
            Description with <a href="/#">link</a>{' '}
        </div>
    );

    return (
        <Radiobox
            name={text('name', 'Radiobox')}
            value={value}
            label={text('label', 'Label')}
            description={description}
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
