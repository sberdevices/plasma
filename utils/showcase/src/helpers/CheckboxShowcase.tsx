import React from 'react';
import { CheckboxProps } from '@sberdevices/plasma-ui';

import { actionWithPersistedEvent } from './actionWithPersistedEvent';
import { ShowcaseComponentGrid } from './Showcase';
import { Tony } from './Tony';

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

interface Props extends CheckboxProps {
    value: number;
    tony?: boolean;
}

const rows: Array<Array<Props>> = [
    [
        { ...props, value: 1, label: 'Checkbox 1', disabled: false, description: '' },
        { ...props, value: 2, label: 'Checkbox 2', disabled: false, description: '' },
    ],
    [
        { ...props, value: 3, label: 'Checkbox 3', disabled: true, description: '' },
        { ...props, value: 4, label: 'Checkbox 4', disabled: true, description: '' },
    ],
    [
        { ...props, value: 5, label: 'Checkbox 5', disabled: false, description: 'text description' },
        { ...props, value: 6, label: 'Checkbox 6', disabled: false, description: elementDescription },
    ],
    [
        { ...props, value: 5, disabled: false, checked: false, tony: true },
        { ...props, value: 6, disabled: false, checked: true, tony: true },
    ],
];

export const CheckboxShowcase = ({
    component: Component,
    withLabels = true,
    withDescription = true,
}: {
    component: React.FC<any>;
    withLabels: boolean;
    withDescription: boolean;
}) => {
    const [values, setValues] = React.useState([2, 4]);

    return (
        <ShowcaseComponentGrid>
            {rows.map((items) =>
                items
                    .filter((item) => !(!withDescription && item.description))
                    .map(({ tony, label, onChange, ...item }, j) => (
                        <div style={{ display: 'flex' }}>
                            <Component
                                {...item}
                                key={`item:${j}`}
                                name="test-checkbox"
                                style={{ margin: 0 }}
                                label={withLabels ? label : ''}
                                checked={values.indexOf(item.value) !== -1}
                                onChange={(event: any) => {
                                    setValues(
                                        [...values, item.value].filter(
                                            (val) => event.target.checked || val !== item.value,
                                        ),
                                    );
                                    onChange?.(event);
                                }}
                            />
                            {tony && <Tony />}
                        </div>
                    )),
            )}
        </ShowcaseComponentGrid>
    );
};
