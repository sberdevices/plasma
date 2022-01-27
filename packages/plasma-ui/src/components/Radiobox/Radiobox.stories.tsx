import React, { useState } from 'react';
import styled from 'styled-components';

import { SSRProvider } from '../SSRProvider';
import { actionWithPersistedEvent, InSpacingDecorator } from '../../helpers';

import { Radiobox, RadioGroup } from '.';

export default {
    title: 'Controls/Radiobox',
    component: Radiobox,
    decorators: [
        InSpacingDecorator,
        (Story: React.FC) => (
            <SSRProvider>
                <Story />
            </SSRProvider>
        ),
    ],
};

const onChange = actionWithPersistedEvent('onChange');
const onFocus = actionWithPersistedEvent('onFocus');
const onBlur = actionWithPersistedEvent('onBlur');

const items = [
    {
        id: 'radio-1-1',
        name: 'radio-1',
        value: 1,
        label: 'Radiobox with a very very very very very long label',
        disabled: false,
    },
    { id: 'radio-1-2', name: 'radio-1', value: 2, label: 'Radiobox 2', disabled: false },
    { id: 'radio-2-1', name: 'radio-2', value: 3, label: 'Radiobox 3', disabled: true },
    { id: 'radio-2-2', name: 'radio-2', value: 4, label: 'Radiobox 4', disabled: true, checked: true },
];

const StyledGriddyRadioGroup = styled(RadioGroup)`
    display: inline-grid;
    grid-template-columns: repeat(2, 50%);
    gap: 1rem;
    align-items: flex-start;

    /* stylelint-disable-next-line selector-max-universal */
    & > * + * {
        margin-top: 0 !important;
    }
`;

export const Default = () => {
    const [value, setValue] = React.useState(2);
    return (
        <StyledGriddyRadioGroup>
            {items.map((item) => (
                <Radiobox
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    value={item.value}
                    label={item.label}
                    disabled={item.disabled}
                    checked={item.checked || item.value === value}
                    onChange={(event) => {
                        setValue(item.value);
                        onChange(event);
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            ))}
        </StyledGriddyRadioGroup>
    );
};

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
