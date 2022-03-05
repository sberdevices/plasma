import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { IconPlaceholder, InSpacingDecorator, disableProps } from '../../helpers';

import { TextArea, TextAreaProps } from '.';

const onChange = action('onChange');
const onFocus = action('onFocus');
const onBlur = action('onBlur');

const propsToDisable = [
    '$isFocused',
    'label',
    'contentRight',
    'autoComplete',
    'autoFocus',
    'cols',
    'dirName',
    'form',
    'minLength',
    'maxLength',
    'name',
    'required',
    'rows',
    'value',
    'wrap',
    'onChange',
    'onFocus',
    'onBlur',
];

const statusOptions = ['', 'success', 'error'];
const resizeOptions = ['none', 'both', 'horizontal', 'vertical'];

export default {
    title: 'Controls/TextArea',
    component: TextArea,
    decorators: [InSpacingDecorator],
    argTypes: {
        status: {
            control: {
                type: 'select',
                options: statusOptions,
            },
        },
        resize: {
            control: {
                type: 'select',
                options: resizeOptions,
            },
        },
        ...disableProps(propsToDisable),
    },
} as Meta;

export const Default: Story<TextAreaProps & { enableRightIcon: boolean }> = ({ enableRightIcon, status, ...rest }) => {
    const [value, setValue] = React.useState('Значение поля');

    return (
        <TextArea
            value={value}
            contentRight={enableRightIcon && <IconPlaceholder />}
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
    id: 'example-textarea',
    placeholder: 'Заполните многострочное поле',
    helperText: 'Подсказка к полю',
    enableRightIcon: true,
    status: '' as 'success',
    resize: 'vertical',
    disabled: false,
    readOnly: false,
};
