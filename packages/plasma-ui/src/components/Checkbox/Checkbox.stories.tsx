import React from 'react';
import styled from 'styled-components';

import { SSRProvider } from '../SSRProvider';
import { actionWithPersistedEvent, InSpacingDecorator } from '../../helpers';

import { Checkbox } from '.';

export default {
    title: 'Controls/Checkbox',
    component: Checkbox,
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

const labelWithLink = (
    <div>
        Label 5 with <a href="/#">link</a>
    </div>
);

const items = [
    { id: 'check-1-1', name: 'check', value: 1, label: 'Checkbox 1', disabled: false },
    { id: 'check-1-2', name: 'check', value: 2, label: 'Checkbox 2', disabled: false },
    { id: 'check-1-3', name: 'check', value: 3, label: 'Checkbox 3', disabled: true },
    { id: 'check-1-4', name: 'check', value: 4, label: 'Checkbox 4', disabled: true },
    { id: 'check-1-5', name: 'check', value: 5, label: labelWithLink },
];

const StyledGrid = styled.div`
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
    const [values, setValues] = React.useState([2, 4]);

    return (
        <StyledGrid>
            {items.map((item) => (
                <Checkbox
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    value={item.value}
                    label={item.label}
                    disabled={item.disabled}
                    checked={values.includes(item.value)}
                    onChange={(event) => {
                        setValues(
                            event.target.checked ? [...values, item.value] : values.filter((v) => v !== item.value),
                        );
                        onChange(event);
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            ))}
        </StyledGrid>
    );
};
