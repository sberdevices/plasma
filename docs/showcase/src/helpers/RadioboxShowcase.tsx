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
        { ...props, name: 'radio-1', value: 1, label: 'Radiobox 1', disabled: false, checked: false },
        { ...props, name: 'radio-1', value: 2, label: 'Radiobox 2', disabled: false, checked: false },
    ],
    [
        { ...props, name: 'radio-2', value: 3, label: 'Radiobox 3', disabled: true, checked: false },
        { ...props, name: 'radio-2', value: 4, label: 'Radiobox 4', disabled: true, checked: true },
    ],
    [
        {
            ...props,
            name: 'radio-1',
            value: 5,
            label: 'Radiobox 5',
            disabled: false,
            checked: false,
            description: 'text description',
        },
        {
            ...props,
            name: 'radio-1',
            value: 6,
            label: 'Radiobox 6',
            disabled: false,
            checked: false,
            description: elementDescription,
        },
    ],
];

export const RadioboxShowcase = ({
    component: Component,
    withLabels = true,
}: {
    component: React.FC<any>;
    withLabels: boolean;
}) => {
    const [value, setValue] = React.useState(2);

    return (
        <ShowcaseComponentGrid>
            {rows.map((items) =>
                items.map((item, j) => (
                    <Component
                        {...item}
                        key={`item:${j}`}
                        style={{ margin: 0 }}
                        label={withLabels ? item.label : ''}
                        checked={item.checked || item.value === value}
                        onChange={(event: any) => {
                            setValue(item.value);
                            onChange(event);
                        }}
                    />
                )),
            )}
        </ShowcaseComponentGrid>
    );
};
