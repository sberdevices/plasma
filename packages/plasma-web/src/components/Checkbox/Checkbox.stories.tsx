import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { SSRProvider } from '../SSRProvider';
import { InSpacingDecorator, disableProps } from '../../helpers';

import { Checkbox, CheckboxProps } from '.';

const propsToDisable = [
    'name',
    'indeterminate',
    'id',
    'focused',
    'type',
    'value',
    'checked',
    'readOnly',
    'placeholder',
    'required',
    'minLength',
    'maxLength',
    'onChange',
    'onFocus',
    'onBlur',
];

export default {
    title: 'Controls/Checkbox',
    component: Checkbox,
    decorators: [InSpacingDecorator],
    argTypes: {
        label: {
            control: {
                type: 'text',
            },
        },
        description: {
            control: {
                type: 'text',
            },
        },
    },
} as Meta;

const onChange = action('onChange');
const onFocus = action('onFocus');
const onBlur = action('onBlur');

const englishDescription = (
    <div>
        The most spoken language in the <a href="/#">world</a>{' '}
    </div>
);

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
    {
        name,
        value: 'english',
        label: 'English',
        disabled: false,
        parent: 'natural',
        description: englishDescription,
    },
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

export const Live = () => {
    const [values, setValues] = React.useState({
        russian: true,
        english: true,
        french: true,
        klingon: false,
        elvish: true,
        dothraki: false,
    });

    return (
        <SSRProvider>
            {items.map((item) => (
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
                                ...getChildren(item.value).reduce(
                                    (acc, child) => ({ ...acc, [child.value]: checked }),
                                    {},
                                ),
                            });
                        }

                        onChange(event);
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            ))}
        </SSRProvider>
    );
};

export const Default: Story<CheckboxProps> = (args) => {
    const value = 0;
    const [checked, setChecked] = React.useState(true);

    return (
        <SSRProvider>
            <Checkbox
                value={value}
                checked={checked}
                onChange={(event) => {
                    setChecked(event.target.checked);
                    onChange(event);
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                {...args}
            />
        </SSRProvider>
    );
};

Default.args = {
    name: 'checkbox',
    label: 'Label',
    description: 'Description',
    disabled: false,
};

Default.argTypes = {
    ...disableProps(propsToDisable),
};
