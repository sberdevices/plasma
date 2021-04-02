import React from 'react';
import { Switch } from '@sberdevices/plasma-ui/components/Switch';

import { actionWithPersistedEvent, ShowcaseComponentGrid, UIStoryDecorator, InSpacingDecorator } from '../helpers';

const onChange = actionWithPersistedEvent('onChange');
const onFocus = actionWithPersistedEvent('onFocus');
const onBlur = actionWithPersistedEvent('onBlur');

export default {
    title: 'UI/Controls/Switch',
    component: Switch,
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

const rows = [
    [
        { name: 'switch', value: 1, label: 'Switch 1', disabled: false, pressed: false },
        { name: 'switch', value: 2, label: 'Switch 2', disabled: false, pressed: false },
    ],
    [
        { name: 'switch', value: 3, label: 'Switch 3', disabled: false, pressed: true },
        { name: 'switch', value: 4, label: 'Switch 4', disabled: false, pressed: true },
    ],
    [
        { name: 'switch', value: 5, label: 'Switch 5', disabled: true, pressed: false },
        { name: 'switch', value: 6, label: 'Switch 6', disabled: true, pressed: false },
    ],
];

const Showcase = ({ render, withLabels = true }: { render: any; withLabels: boolean }) => (
    <ShowcaseComponentGrid>
        {rows.map((items) =>
            items.map((item, j) => render({ ...item, label: withLabels ? item.label : '' }, `item:${j}`)),
        )}
    </ShowcaseComponentGrid>
);

/* eslint-disable prefer-rest-params */
export function Default() {
    const [values, setValues] = React.useState([2, 4, 6]);

    return (
        <Showcase
            {...arguments[0]}
            render={(props: any, key: string) => (
                <Switch
                    key={key}
                    style={{ margin: 0 }}
                    name={props.name}
                    value={props.value}
                    label={props.label}
                    disabled={props.disabled}
                    pressed={props.pressed}
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
