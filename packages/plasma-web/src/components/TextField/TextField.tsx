import React from 'react';
import {
    TextFieldRoot,
    TextFieldInput,
    TextFieldPlaceholder,
    TextFieldHelper,
    TextFieldProps as BaseProps,
} from '@sberdevices/plasma-core';

import { FieldInput, FieldContent, FieldHelperBlock } from '../Field/Field';

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
            value,
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
                $isContentLeft={!!contentLeft}
                $isContentRight={!!contentRight}
                $isValue={!!value}
                $isHelper={!!helperText}
                status={status}
                className={className}
                style={style}
            >
                {contentLeft && <FieldContent pos="left">{contentLeft}</FieldContent>}
                {size === 'l' && placeLabel && <TextFieldPlaceholder htmlFor={id}>{placeLabel}</TextFieldPlaceholder>}
                <FieldInput
                    ref={ref}
                    id={id}
                    as={TextFieldInput}
                    value={value}
                    placeholder={size === 'm' && placeLabel}
                    disabled={disabled}
                    status={status}
                    size={htmlSize}
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
