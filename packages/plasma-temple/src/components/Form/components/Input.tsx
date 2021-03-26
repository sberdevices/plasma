import React from 'react';
import { TextField, TextFieldProps } from '@sberdevices/plasma-ui';
import styled from 'styled-components';

import { withWrapField } from '../hocs/withWrapField';
import { FieldComponentProps } from '../types';

type InputProps = FieldComponentProps<TextFieldProps, 'onChange' | 'onSubmit', {
    onSubmit?: () => void;
    onChange?: (val: string) => void;
    pattern?: string;
    required?: boolean;
    innerRef?: React.RefObject<HTMLInputElement>;
}>

const StyledTextField = styled(TextField)`
    display: flex;

    &:read-only {
        user-select: none;
        touch-action: none;
        pointer-events: none;
    }
`;

const filterEnterKeyEvent = (cb?: (ev: React.KeyboardEvent<HTMLInputElement>) => void) => (
    event: React.KeyboardEvent<HTMLInputElement>,
): void => {
    if (event.keyCode === 13) {
        cb?.(event);
    }
};

export const Input = withWrapField<string, InputProps>(
    // eslint-disable-next-line prefer-arrow-callback
    function Input(props): React.ReactElement {
        const { onChange, onSubmit, value, innerRef, label, ...rest } = props;

        const keyDownHandler = React.useCallback(filterEnterKeyEvent(onSubmit), [onSubmit]);

        const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
            (event) => {
                const { target } = event;
                onChange?.(target.value);
            },
            [onChange],
        );

        return (
            <StyledTextField
                ref={innerRef}
                label={label}
                value={value}
                onChange={onChangeHandler}
                onKeyDown={keyDownHandler}
                {...rest}
            />
        );
    },
    'text',
);
