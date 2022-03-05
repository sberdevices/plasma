import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { IconPlaceholder, InSpacingDecorator, disableProps } from '../../helpers';

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

export const Default: Story<TextAreaProps & { enableContentRight: boolean }> = ({
    enableContentRight,
    status,
    ...rest
}) => {
    const [value, setValue] = React.useState('Some text 🌝');

    return (
        <TextArea
            value={value}
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
    id: 'example-textarea',
    placeholder: 'Label',
    helperText: 'Helper text',
    enableContentRight: true,
    status: '' as 'success',
    resize: 'vertical',
    disabled: false,
    readOnly: false,
};
