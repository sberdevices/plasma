import React from 'react';

import { actionWithPersistedEvent, ShowcaseComponentGrid, InSpacingDecorator } from '../../helpers';

import { Checkbox } from '.';

export default {
    title: 'Controls/Checkbox',
    component: Checkbox,
    decorators: [InSpacingDecorator],
};

const onChange = actionWithPersistedEvent('onChange');
const onFocus = actionWithPersistedEvent('onFocus');
const onBlur = actionWithPersistedEvent('onBlur');

const rows = [
    [
        { name: 'check', value: 1, label: 'Checkbox 1', disabled: false },
        { name: 'check', value: 2, label: 'Checkbox 2', disabled: false },
    ],
    [
        { name: 'check', value: 3, label: 'Checkbox 3', disabled: true },
        { name: 'check', value: 4, label: 'Checkbox 4', disabled: true },
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
    const [values, setValues] = React.useState([2, 4]);

    return (
        <Showcase
            {...arguments[0]}
            render={(props, key) => (
                <Checkbox
                    key={key}
                    style={{ margin: 0 }}
                    name={props.name}
                    value={props.value}
                    label={props.label}
                    disabled={props.disabled}
                    checked={values.indexOf(props.value) !== -1}
                    onChange={(event) => {
                        setValues(
                            [...values, props.value].filter((val) => event.target.checked || val !== props.value),
                        );
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
