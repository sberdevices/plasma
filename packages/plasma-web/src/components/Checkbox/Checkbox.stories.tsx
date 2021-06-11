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

const name = 'languages';
const items = [
    {
        name,
        value: 'natural',
        label: 'Natural languages',
        disabled: false,
        description: 'Languages that people speak. They were not designed by people and they evolved naturally.',
    },
    { name, value: 'russian', label: 'Russian', disabled: false, parent: 'natural' },
    { name, value: 'english', label: 'English', disabled: false, parent: 'natural' },
    { name, value: 'french', label: 'French', disabled: false, parent: 'natural' },
    { name, value: 'klingon', label: 'Klingon', disabled: false, parent: 'natural' },
    { name, value: 'elvish', label: 'Elvish', disabled: true, parent: 'natural' },
    { name, value: 'dothraki', label: 'Dothraki', disabled: true, parent: 'natural' },
];

const getChildren = (value: string) => items.filter((item) => item.parent === value);
const getState = (values: Record<string, boolean | null>, value: string) => {
    const allChildren = getChildren(value);

    if (!allChildren.length) {
        return { checked: values[value], indeterminate: false };
    }

    const checkedChildren = allChildren.filter((child) => values[child.value]);

    if (checkedChildren.length === 0) {
        return { checked: false, indeterminate: false };
    }

    if (allChildren.length !== checkedChildren.length) {
        return { checked: false, indeterminate: true };
    }

    return { checked: true, indeterminate: false };
};

export const Default = () => {
    const [values, setValues] = React.useState({
        russian: true,
        english: true,
        french: true,
        klingon: false,
        elvish: true,
        dothraki: false,
    });

    return items.map((item) => (
        <Checkbox
            {...getState(values, item.value)}
            style={{ marginLeft: item.parent ? 36 : null }}
            key={item.value}
            name={item.name}
            value={item.value}
            label={item.label}
            disabled={item.disabled}
            description={item.description}
            onChange={(event) => {
                const { checked } = event.target;

                if (item.parent) {
                    setValues({ ...values, [item.value]: checked });
                } else {
                    setValues({
                        ...values,
                        ...getChildren(item.value).reduce((acc, child) => ({ ...acc, [child.value]: checked }), {}),
                    });
                }

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
        <Checkbox
            name={text('name', 'checkbox')}
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
        <Checkbox
            name={text('name', 'checkbox')}
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
