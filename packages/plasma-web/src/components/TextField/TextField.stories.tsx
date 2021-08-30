import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { IconPlaceholder, InSpacingDecorator, disableProps } from '../../helpers';

import { TextField, TextFieldProps } from '.';

const onChange = action('onChange');
const onFocus = action('onFocus');
const onBlur = action('onBlur');

const sizes = ['m', 'l'];
const statuses = ['', 'success', 'error'];

const propsToDisable = [
    'helperBlock',
    'contentLeft',
    'htmlSize',
    '$isFocused',
    'label',
    'contentRight',
    'type',
    'name',
    'onFocus',
    'onBlur',
    'onChange',
    'value',
    'checked',
    'maxLength',
    'minLength',
    'required',
];

export default {
    title: 'Controls/TextField',
    component: TextField,
    decorators: [InSpacingDecorator],
    argTypes: {
        status: {
            control: {
                type: 'select',
                options: statuses,
            },
        },
        size: {
            control: {
                type: 'inline-radio',
                options: sizes,
            },
        },
        ...disableProps(propsToDisable),
    },
} as Meta;

interface DefaultSortyProps extends TextFieldProps {
    enableContentLeft: boolean;
    enableContentRight: boolean;
}

export const Default: Story<DefaultSortyProps> = ({ enableContentLeft, enableContentRight, status, ...rest }) => {
    const [value, setValue] = React.useState('Title 🌝');

    return (
        <TextField
            value={value}
            contentLeft={enableContentLeft && <IconPlaceholder />}
            contentRight={enableContentRight && <IconPlaceholder />}
            status={status || undefined}
            onChange={(e) => {
                setValue(e.target.value);
                onChange(e);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            {...rest}
        />
    );
};

Default.args = {
    size: 'm',
    placeholder: 'Label',
    helperText: 'Helper text',
    enableContentLeft: true,
    enableContentRight: true,
    status: '' as 'success',
    disabled: false,
    readOnly: false,
};

export const DeferredValue: Story<{ readOnly: boolean }> = ({ readOnly }) => {
    const [asyncValue, setAsyncValue] = React.useState('');

    React.useEffect(() => {
        setTimeout(() => {
            setAsyncValue("Sorry i'm late :)");
        }, 3000);
    }, []);

    return <TextField placeholder="Wait three seconds..." defaultValue={asyncValue} readOnly={readOnly} />;
};

DeferredValue.args = {
    readOnly: true,
};

const defValuePropsToDisable = [...propsToDisable, 'status', 'size', 'helperText', 'placeholder', 'disabled'];

DeferredValue.argTypes = {
    ...disableProps(defValuePropsToDisable),
};
