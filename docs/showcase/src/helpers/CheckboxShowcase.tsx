import React from 'react';

import { actionWithPersistedEvent } from './actionWithPersistedEvent';
import { ShowcaseComponentGrid } from './Showcase';

const onChange = actionWithPersistedEvent('onChange');
const onFocus = actionWithPersistedEvent('onFocus');
const onBlur = actionWithPersistedEvent('onBlur');

const props = {
    onChange,
    onFocus,
    onBlur,
};
const elementDescription = (
    <div>
        Description with <a href="/#">link</a>
    </div>
);
const rows = [
    [
        { ...props, name: 'check', value: 1, label: 'Checkbox 1', disabled: false, description: '' },
        { ...props, name: 'check', value: 2, label: 'Checkbox 2', disabled: false, description: '' },
    ],
    [
        { ...props, name: 'check', value: 3, label: 'Checkbox 3', disabled: true, description: '' },
        { ...props, name: 'check', value: 4, label: 'Checkbox 4', disabled: true, description: '' },
    ],
    [
        { ...props, name: 'check', value: 5, label: 'Checkbox 5', disabled: false, description: 'text description' },
        { ...props, name: 'check', value: 6, label: 'Checkbox 6', disabled: false, description: elementDescription },
    ],
];

export const CheckboxShowcase = ({
    component: Component,
    withLabels = true,
}: {
    component: React.FC<any>;
    withLabels: boolean;
}) => {
    const [values, setValues] = React.useState([2, 4]);

    return (
        <ShowcaseComponentGrid>
            {rows.map((items) =>
                items.map((item, j) => (
                    <Component
                        {...item}
                        key={`item:${j}`}
                        style={{ margin: 0 }}
                        label={withLabels ? item.label : ''}
                        checked={values.indexOf(item.value) !== -1}
                        onChange={(event: any) => {
                            setValues(
                                [...values, item.value].filter((val) => event.target.checked || val !== item.value),
                            );
                            onChange(event);
                        }}
                    />
                )),
            )}
        </ShowcaseComponentGrid>
    );
};
