import React from 'react';
import { TextFieldRoot, TextFieldTextarea, TextFieldHelper } from '@sberdevices/plasma-core';
import type { TextAreaProps as BaseProps } from '@sberdevices/plasma-core';

import { FieldInput, FieldWrapper, FieldHelper, FieldHelpers } from '../Field/Field';

export interface TextAreaProps extends BaseProps {
    /**
     * Вспомогательные тексты снизу для поля ввода.
     */
    leftHelper?: string;
    rightHelper?: string;
}

/**
 * Поле ввода многострочного текста.
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
        {
            placeholder,
            label,
            leftHelper,
            rightHelper,
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
                $isContentRight={Boolean(contentRight)}
                $isHelper={Boolean(leftHelper || rightHelper)}
                className={className}
                style={style}
            >
                <FieldWrapper status={status} disabled={disabled}>
                    <FieldInput
                        as={TextFieldTextarea}
                        ref={ref}
                        id={id}
                        placeholder={label || placeholder}
                        disabled={disabled}
                        status={status}
                        $resize={resize}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        {...rest}
                    />
                    <FieldHelpers>
                        <FieldHelper as={TextFieldHelper}>{leftHelper}</FieldHelper>
                        <FieldHelper>{rightHelper}</FieldHelper>
                    </FieldHelpers>
                </FieldWrapper>
            </TextFieldRoot>
        );
    },
);
