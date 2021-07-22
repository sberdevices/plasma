import React from 'react';
import { TextFieldRoot, TextFieldInput, TextFieldHelper } from '@sberdevices/plasma-core';
import type { TextFieldProps as BaseProps } from '@sberdevices/plasma-core';

import { FieldInput, FieldPlaceholder, FieldContent, FieldHelperBlock } from '../Field/Field';

export interface TextFieldProps extends BaseProps {
    /**
     * Слот для вспомогательного блока снизу.
     */
    helperBlock?: React.ReactElement;
}

/**
 * Поле ввода текста.
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    (
        {
            size = 'm',
            placeholder,
            label,
            helperText,
            helperBlock,
            disabled,
            contentLeft,
            contentRight,
            status,
            htmlSize,
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
        const placeLabel = label || placeholder;

        return (
            <TextFieldRoot
                $size={size}
                $disabled={disabled}
                $isContentLeft={Boolean(contentLeft)}
                $isContentRight={Boolean(contentRight)}
                $isHelper={Boolean(helperText || helperBlock)}
                status={status}
                className={className}
                style={style}
            >
                {contentLeft && <FieldContent pos="left">{contentLeft}</FieldContent>}
                <FieldInput
                    ref={ref}
                    id={id}
                    as={TextFieldInput}
                    placeholder={placeLabel}
                    disabled={disabled}
                    status={status}
                    size={htmlSize}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    {...rest}
                />
                {size === 'l' && placeLabel && <FieldPlaceholder htmlFor={id}>{placeLabel}</FieldPlaceholder>}
                {contentRight && <FieldContent pos="right">{contentRight}</FieldContent>}
                {helperText && <TextFieldHelper status={status}>{helperText}</TextFieldHelper>}
                {helperBlock && <FieldHelperBlock>{helperBlock}</FieldHelperBlock>}
            </TextFieldRoot>
        );
    },
);
