import React from 'react';
import { boolean, number, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { InSpacing } from '../../helpers/StoryDecorators';

import { Checkbox } from '.';

const onChangeAction = action('onChange');
const onFocusAction = action('onFocus');
const onBlurAction = action('onBlur');

export default {
    title: 'Controls/Checkbox',
    component: Checkbox,
    decorators: [InSpacing],
};

export const Default = () => {
    const [checked, setChecked] = React.useState(true);

    return (
        <Checkbox
            id="agreement"
            name="agreement"
            value="yes"
            label={text('label', 'Checkbox')}
            checked={checked}
            focused={boolean('focused', false)}
            disabled={boolean('disabled', false)}
            onChange={(event) => {
                setChecked(event.target.checked);
                onChangeAction(event.target.value, event.target.checked);
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
    const [values, setValues] = React.useState([0]);

    return (
        <>
            {items.map((item, i) => (
                <Checkbox
                    key={`item:${i}`}
                    checked={(values as number[]).indexOf(item.value) !== -1}
                    onChange={(event) => {
                        /**
                         * values = [1, 2, 3]
                         * value = 4
                         * checked = true:
                         * > Фильтрация выведет весь список values + value, т.к. всегда true
                         * > [...values, value].filter(...) = [1, 2, 3, 4]
                         * checked = false:
                         * > Фильтрация выведет изначальный список values,
                         * > т.к. в первой части условия false, а во второй - идет фильтрация по значению value
                         * > [...values, value].filter(...) = [1, 2, 3]
                         */
                        const newValues = [...values, item.value].filter(
                            (val) => event.target.checked || val !== item.value,
                        );
                        setValues(newValues);
                        onChangeAction(newValues);
                    }}
                    {...item}
                />
            ))}
        </>
    );
};
