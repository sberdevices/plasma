import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { InSpacingDecorator, disableProps } from '@sberdevices/plasma-sb-utils';

import { TextArea, TextAreaProps } from '.';

const onChange = action('onChange');
const onFocus = action('onFocus');
const onBlur = action('onBlur');

const statuses = ['', 'success', 'error'];
const resizes = ['none', 'both', 'horizontal', 'vertical'];

const propsToDisable = [
    'helperBlock',
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

export default {
    title: 'Controls/TextArea',
    component: TextArea,
    decorators: [InSpacingDecorator],
    argTypes: {
        status: {
            control: {
                type: 'select',
                options: statuses,
            },
        },
        resize: {
            control: {
                type: 'select',
                options: resizes,
            },
        },
        ...disableProps(propsToDisable),
    },
} as Meta;

export const Default: Story<TextAreaProps & { enableContentRight: boolean }> = ({ status, ...rest }) => {
    const [value, setValue] = React.useState('Введите');

    return (
        <TextArea
            value={value}
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
    placeholder: 'Label',
    leftHelper: 'Helper text',
    rightHelper: '125 слов',
    status: '' as 'success',
    resize: 'vertical',
    disabled: false,
};
