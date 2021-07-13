import React from 'react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { InSpacingDecorator } from '../../helpers';

import { Select } from '.';

export default {
    title: 'Controls/Select',
    component: Select,
    decorators: [InSpacingDecorator],
};

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

export const Default = () => {
    const [value, setValue] = React.useState<string | Array<string>>(null);

    return (
        <div style={{ maxWidth: '20rem' }}>
            <div style={{ marginBottom: '1rem' }}>
                <Select
                    multiselect={boolean('multiselect', false) as false}
                    value={value as string}
                    items={items}
                    placeholder={text('placeholder', 'Выберите пример')}
                    helperText={text('helperText', 'Заполните пример')}
                    status={select('status', ['', 'success', 'warning', 'error'], '') || undefined}
                    disabled={boolean('disabled', false) as true}
                    onChange={(v) => {
                        setValue(v);
                        onChange(v);
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </div>
            <div>
                <Select value={null} items={[]} placeholder="Another select" />
            </div>
        </div>
    );
};
