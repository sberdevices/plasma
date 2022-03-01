import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { FieldRoot, FieldPlaceholder, FieldContent, Input } from '@sberdevices/plasma-core';
import type { InputProps } from '@sberdevices/plasma-core';

import { FieldHelper, applyInputStyles } from '../Field';

export interface TextFieldProps extends InputProps {}

const StyledInput = styled(Input)`
    ${applyInputStyles}

    border-radius: 1rem;
`;

/**
 * Поле ввода текста.
 */
// eslint-disable-next-line prefer-arrow-callback
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
    {
        id,
        size = 'l',
        disabled,
        status,
        label,
        placeholder,
        contentLeft,
        contentRight,
        helperText,
        style,
        className,
        ...rest
    },
    ref,
) {
    const placeLabel = (label || placeholder) as string | undefined;

    return (
        <FieldRoot
            $size={size}
            $disabled={disabled}
            $isContentLeft={Boolean(contentLeft)}
            $isContentRight={Boolean(contentRight)}
            $isHelper={Boolean(helperText)}
            status={status}
            style={style}
            className={className}
        >
            {contentLeft && <FieldContent pos="left">{contentLeft}</FieldContent>}
            <StyledInput
                $size={size}
                ref={ref}
                id={id}
                placeholder={placeLabel}
                disabled={disabled}
                status={status}
                aria-describedby={id ? `${id}-helpertext` : undefined}
                {...rest}
            />
            {placeLabel && size === 'l' && <FieldPlaceholder htmlFor={id}>{placeLabel}</FieldPlaceholder>}
            {contentRight && <FieldContent pos="right">{contentRight}</FieldContent>}
            {helperText && <FieldHelper id={id ? `${id}-helpertext` : undefined}>{helperText}</FieldHelper>}
        </FieldRoot>
    );
});
