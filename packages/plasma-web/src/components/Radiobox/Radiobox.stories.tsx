import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { InSpacingDecorator } from '../../helpers';

import { Radiobox, RadioboxProps } from '.';

export default {
    title: 'Controls/Radiobox',
    decorators: [InSpacingDecorator],
} as Meta;

const onChange = action('onChange');
const onFocus = action('onFocus');
const onBlur = action('onBlur');

const cDescription = (
    <div>
        A general-purpose, procedural computer programming{' '}
        <a href="https://en.wikipedia.org/wiki/C_(programming_language)">language</a>{' '}
    </div>
);

const langName = 'language';
const items = [
    {
        langName,
        value: 'c',
        label: 'C',
        disabled: false,
        description: cDescription,
    },
    { langName, value: 'cpp', label: 'C++', disabled: false },
    { langName, value: 'assembly', label: 'Assembly', disabled: false },
    { langName, value: 'elixir', label: 'Elixir', disabled: true },
];

export const Live = () => {
    const [value, setValue] = React.useState('c');

    return items.map((item) => (
        <Radiobox
            key={item.value}
            name={item.langName}
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

export const Default: Story<RadioboxProps> = ({ name, label, description, disabled }) => {
    const value = 0;
    const [checked, setChecked] = React.useState(true);

    return (
        <Radiobox
            name={name}
            value={value}
            label={label}
            description={description}
            disabled={disabled}
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

Default.args = {
    name: 'Radiobox',
    label: 'Label',
    description: 'Description',
    disabled: false,
};
