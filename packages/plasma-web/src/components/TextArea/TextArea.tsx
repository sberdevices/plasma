import React from 'react';
import { TextFieldRoot, TextFieldTextarea, TextFieldHelper } from '@sberdevices/plasma-core';
import type { TextAreaProps as BaseProps } from '@sberdevices/plasma-core';

import { FieldInput, FieldContent, FieldHelperBlock } from '../Field/Field';

export interface TextAreaProps extends BaseProps {
    /**
     * Слот для вспомогательного блока снизу.
     */
    helperBlock?: React.ReactElement;
}

/**
 * Поле ввода многострочного текста.
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
        {
            placeholder,
            label,
            helperText,
            helperBlock,
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
                $isContentRight={Boolean(contentRight)}
                $isHelper={Boolean(helperText || helperBlock)}
                className={className}
                style={style}
            >
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
                {contentRight && <FieldContent pos="right">{contentRight}</FieldContent>}
                {helperText && <TextFieldHelper status={status}>{helperText}</TextFieldHelper>}
                {helperBlock && <FieldHelperBlock>{helperBlock}</FieldHelperBlock>}
            </TextFieldRoot>
        );
    },
);
