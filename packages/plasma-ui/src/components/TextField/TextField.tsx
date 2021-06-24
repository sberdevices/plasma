import React from 'react';
import {
    TextFieldRoot,
    TextFieldInput,
    TextFieldPlaceholder,
    TextFieldContent,
    TextFieldHelper,
    TextFieldProps as BaseProps,
} from '@sberdevices/plasma-core';

import { FieldInput } from '../Field/Field';

export interface TextFieldProps extends BaseProps {}

/**
 * Поле ввода текста.
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    (
        {
            size = 'l',
            value,
            placeholder,
            label,
            helperText,
            disabled,
            contentLeft,
            contentRight,
            status,
            onChange,
            onFocus,
            onBlur,
            style,
            id,
            className,
            ...rest
        },
        ref,
    ) => {
        return (
            <TextFieldRoot
                $size={size}
                $disabled={disabled}
                $isContentLeft={Boolean(contentLeft)}
                $isContentRight={Boolean(contentRight)}
                $isValue={Boolean(value)}
                $isHelper={Boolean(helperText)}
                status={status}
                className={className}
                style={style}
            >
                {contentLeft && <TextFieldContent pos="left">{contentLeft}</TextFieldContent>}
                {(label || placeholder) && (
                    <TextFieldPlaceholder htmlFor={id}>{label || placeholder}</TextFieldPlaceholder>
                )}
                <FieldInput
                    ref={ref}
                    id={id}
                    as={TextFieldInput}
                    value={value}
                    disabled={disabled}
                    status={status}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    {...rest}
                />
                {contentRight && <TextFieldContent pos="right">{contentRight}</TextFieldContent>}
                {helperText && <TextFieldHelper status={status}>{helperText}</TextFieldHelper>}
            </TextFieldRoot>
        );
    },
);
