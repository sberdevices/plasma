import React, { forwardRef } from 'react';

import { Field } from '../Field';
import type { FieldProps } from '../Field';
import { Input } from '../Input';
import type { InputProps } from '../Input';

export interface TextFieldProps
    extends Pick<FieldProps, 'contentLeft' | 'contentRight' | 'helperText'>,
        Omit<InputProps, 'hasContentLeft' | 'hasContentRight'> {}

/**
 * Поле ввода текста.
 */
// eslint-disable-next-line prefer-arrow-callback
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
    {
        id,
        size,
        disabled,
        status,
        label,
        animatedHint,
        contentLeft,
        contentRight,
        helperText,
        className,
        style,
        ...rest
    },
    ref,
) {
    return (
        <Field
            id={id}
            disabled={disabled}
            label={animatedHint !== 'label' ? label : undefined}
            helperText={helperText}
            contentLeft={contentLeft}
            contentRight={contentRight}
            status={status}
            className={className}
            style={style}
        >
            <Input
                {...rest}
                ref={ref}
                id={id}
                disabled={disabled}
                size={size}
                status={status}
                label={label}
                animatedHint={animatedHint}
                hasContentLeft={Boolean(contentLeft)}
                hasContentRight={Boolean(contentRight)}
                aria-labelledby={id ? `${id}-label` : undefined}
                aria-describedby={id ? `${id}-helpertext` : undefined}
            />
        </Field>
    );
});
