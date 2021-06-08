import React from 'react';
import {
    TextFieldRoot,
    TextFieldTextarea,
    TextFieldContent,
    TextFieldHelper,
    TextAreaProps as BaseProps,
} from '@sberdevices/plasma-core';

import { FieldInput } from '../Field/Field';

export interface TextAreaProps extends BaseProps {}

/**
 * Поле ввода многострочного текста.
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
        {
            value,
            placeholder,
            label,
            helperText,
            disabled,
            contentRight,
            status,
            resize,
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
                status={status}
                $disabled={disabled}
                $isContentRight={!!contentRight}
                $isValue={!!value}
                $isHelper={!!helperText}
                className={className}
                style={style}
            >
                <FieldInput
                    as={TextFieldTextarea}
                    ref={ref}
                    id={id}
                    value={value}
                    placeholder={label || placeholder}
                    disabled={disabled}
                    status={status}
                    $resize={resize}
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
