import React from 'react';
import { boolean, number, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Radiobox } from '.';

const onChangeAction = action('onChange');
const onFocusAction = action('onFocus');
const onBlurAction = action('onBlur');

export default {
    title: 'Radiobox',
    component: Radiobox,
};

export const Default = () => {
    const [checked, setChecked] = React.useState(true);

    return (
        <Radiobox
            value={0}
            label={text('label', 'Radiobox')}
            checked={checked}
            disabled={boolean('disabled', false)}
            onChange={(event) => {
                setChecked(event.target.checked);
                onChangeAction(event.target.checked);
            }}
            onFocus={() => onFocusAction()}
            onBlur={() => onBlurAction()}
        />
    );
};

export const List = () => {
    const items = Array(number('Items count', 5))
        .fill(0)
        .map((_, i) => ({ value: i, label: `Item ${i}` }));
    const [value, setValue] = React.useState(0);

    return (
        <>
            {items.map((item, i) => (
                <Radiobox
                    key={`item:${i}`}
                    checked={value === item.value}
                    onChange={() => {
                        setValue(item.value);
                        onChangeAction(item.value);
                    }}
                    {...item}
                />
            ))}
        </>
    );
};
