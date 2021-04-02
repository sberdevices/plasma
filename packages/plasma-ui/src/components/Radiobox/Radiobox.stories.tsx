import React from 'react';

import { actionWithPersistedEvent, ShowcaseComponentGrid, InSpacingDecorator } from '../../helpers';

import { Radiobox } from '.';

export default {
    title: 'Controls/Radiobox',
    component: Radiobox,
    decorators: [InSpacingDecorator],
};

const onChange = actionWithPersistedEvent('onChange');
const onFocus = actionWithPersistedEvent('onFocus');
const onBlur = actionWithPersistedEvent('onBlur');

const rows = [
    [
        { name: 'radio-1', value: 1, label: 'Radiobox 1', disabled: false },
        { name: 'radio-1', value: 2, label: 'Radiobox 2', disabled: false },
    ],
    [
        { name: 'radio-2', value: 3, label: 'Radiobox 3', disabled: true },
        { name: 'radio-2', value: 4, label: 'Radiobox 4', disabled: true, checked: true },
    ],
];

const Showcase = ({ render, withLabels = true }) => (
    <ShowcaseComponentGrid>
        {rows.map((items) =>
            items.map((item, j) => render({ ...item, label: withLabels ? item.label : '' }, `item:${j}`)),
        )}
    </ShowcaseComponentGrid>
);

/* eslint-disable prefer-rest-params */
export function Default() {
    const [value, setValue] = React.useState(2);

    return (
        <Showcase
            {...arguments[0]}
            render={(props, key) => (
                <Radiobox
                    key={key}
                    style={{ margin: 0 }}
                    name={props.name}
                    value={props.value}
                    label={props.label}
                    disabled={props.disabled}
                    checked={props.checked || props.value === value}
                    onChange={(event) => {
                        setValue(props.value);
                        onChange(event);
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            )}
        />
    );
}
/* eslint-enable prefer-rest-params */
