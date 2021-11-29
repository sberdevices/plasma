import React, { useState } from 'react';
import styled from 'styled-components';

import { SSRProvider } from '../SSRProvider';
import { applySpacing } from '../../mixins';
import { actionWithPersistedEvent, InSpacingDecorator } from '../../helpers';

import { Radiobox, RadioGroup } from '.';

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

const StyledRadioGroup = styled(RadioGroup)`
    display: flex;
    justify-content: flex-start;
    ${applySpacing({ mb: 20 })};
`;

const Showcase = ({ render, withLabels = true }) => (
    <div>
        <SSRProvider>
            {rows.map((items, i) => (
                <StyledRadioGroup key={i}>
                    {items.map((item, j) => render({ ...item, label: withLabels ? item.label : '' }, `item:${j}`))}
                </StyledRadioGroup>
            ))}
        </SSRProvider>
    </div>
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
                    style={applySpacing({ mr: 20, mb: 0, mt: 0 }) as React.CSSProperties}
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

const items = [
    { value: 1, label: 'Radiobox with a very very very very very long label' },
    { value: 2, label: 'Radiobox 2' },
    { value: 3, label: 'Radiobox 3', disabled: true },
    { value: 4, label: 'Radiobox 4', disabled: true },
];

export const Squeeze = () => {
    const [value, setValue] = useState(1);

    return (
        <div style={{ resize: 'horizontal', overflow: 'hidden', border: '3px solid', display: 'inline-block' }}>
            {items.map((item) => (
                <Radiobox
                    key={item.value}
                    name="radiobox"
                    value={item.value}
                    label={item.label}
                    disabled={item.disabled}
                    checked={item.value === value}
                    description={`Description of ${item.label}`}
                    onChange={(event) => {
                        setValue(item.value);
                        onChange(event);
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            ))}
        </div>
    );
};
