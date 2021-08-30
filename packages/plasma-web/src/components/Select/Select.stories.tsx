import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { InSpacingDecorator, disableProps } from '../../helpers';

import { Select, SelectProps } from '.';

const statuses = ['', 'success', 'warning', 'error'];
const propsToDisable = ['value', 'items', 'onItemClick', 'separator', 'onChange'];

export default {
    title: 'Controls/Select',
    component: Select,
    decorators: [InSpacingDecorator],
    argTypes: {
        status: {
            control: {
                type: 'select',
                options: statuses,
            },
        },
        ...disableProps(propsToDisable),
    },
} as Meta;

const onChange = action('onChange');
const onFocus = action('onFocus');
const onBlur = action('onBlur');
const items = [
    { value: 'each', label: 'Каждый' },
    { value: 'hunter', label: 'Охотник', isDisabled: true },
    { value: 'wants', label: 'Желает' },
    {
        value: 'toKnow',
        label: 'Знать',
        items: [
            { value: '_fullText', label: 'Каждый охотник желает знать, где сидит фазан' },
            { value: '_thePheasant', label: 'Фазан' },
            { value: '_is', label: 'Сидит' },
        ],
    },
    { value: 'where', label: 'Где' },
    { value: 'is', label: 'Сидит' },
    { value: 'thePheasant', label: 'Фазан' },
    { value: 'fullText', label: 'Каждый охотник желает знать, где сидит фазан' },
];

export const Default: Story<SelectProps> = ({ status, ...rest }) => {
    const [value, setValue] = React.useState<string | Array<string>>(null);

    return (
        <div style={{ maxWidth: '20rem' }}>
            <div style={{ marginBottom: '1rem' }}>
                <Select
                    value={value as string}
                    items={items}
                    status={status || undefined}
                    onChange={(v) => {
                        setValue(v);
                        onChange(v);
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    {...rest}
                />
            </div>
            <div>
                <Select value={null} items={[]} placeholder="Another select" />
            </div>
        </div>
    );
};

Default.args = {
    multiselect: false,
    placeholder: 'Выберите пример',
    helperText: 'Заполните пример',
    status: '' as 'success',
    disabled: false,
};
