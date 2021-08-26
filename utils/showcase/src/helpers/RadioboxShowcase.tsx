import React from 'react';
import styled from 'styled-components';
import { RadioboxProps, applySpacing, RadioGroup } from '@sberdevices/plasma-ui';

import { actionWithPersistedEvent } from './actionWithPersistedEvent';
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

interface Props extends RadioboxProps {
    value: number;
    tony?: boolean;
}

const rows: Array<Array<Props>> = [
    [
        { ...props, value: 1, label: 'Radiobox 1', disabled: false, checked: false, description: '' },
        { ...props, value: 2, label: 'Radiobox 2', disabled: false, checked: false, description: '' },
    ],
    [
        { ...props, value: 3, label: 'Radiobox 3', disabled: true, checked: false, description: '' },
        { ...props, value: 4, label: 'Radiobox 4', disabled: true, checked: true, description: '' },
    ],
    [
        {
            ...props,
            value: 5,
            label: 'Radiobox 5',
            disabled: false,
            checked: false,
            description: 'text description',
        },
        {
            ...props,
            value: 6,
            label: 'Radiobox 6',
            disabled: false,
            checked: false,
            description: elementDescription,
        },
    ],
    [
        { ...props, value: 3, disabled: false, checked: false, tony: true },
        { ...props, value: 4, disabled: false, checked: true, tony: true },
    ],
];

const StyledRadioGroup = styled(RadioGroup)`
    width: 100%;
    display: flex;
    ${applySpacing({ mb: 20 })};
    justify-content: flex-start;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const RadioboxShowcase = ({
    component: Component,
    withLabels = true,
    withDescription = true,
    radioboxStyles = {},
}: {
    component: React.FC<any>;
    withLabels: boolean;
    withDescription: boolean;
    radioboxStyles?: React.CSSProperties;
}) => {
    const [value, setValue] = React.useState(2);

    return (
        <div>
            {rows.map(
                (items, i) =>
                    items.some((item) => !(!withDescription && item.description)) && (
                        <StyledRadioGroup key={i}>
                            {items
                                .filter((item) => !(!withDescription && item.description))
                                .map(({ tony, label, onChange, ...item }, j) => (
                                    <div
                                        style={{
                                            display: 'flex',
                                            width: '200px',

                                            ...(applySpacing({ mr: 20, mb: 0, mt: 0 }) as Record<string, string>),
                                            ...radioboxStyles,
                                        }}
                                    >
                                        <Component
                                            {...item}
                                            key={`item:${j}`}
                                            name="test-radio"
                                            label={withLabels ? label : ''}
                                            checked={item.checked || item.value === value}
                                            onChange={(event: any) => {
                                                setValue(item.value);
                                                onChange?.(event);
                                            }}
                                        />
                                        {tony && <Tony />}
                                    </div>
                                ))}
                        </StyledRadioGroup>
                    ),
            )}
        </div>
    );
};
