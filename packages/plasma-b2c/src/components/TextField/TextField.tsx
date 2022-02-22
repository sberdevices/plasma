import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { FieldRoot, FieldPlaceholder, FieldContent, FieldHelper, Input, primary } from '@sberdevices/plasma-core';
import type { FieldProps, InputProps } from '@sberdevices/plasma-core';

import { bodySBold } from '../../tokens';
import { FieldWrapper, applyInputStyles } from '../Field';

export interface TextFieldProps extends Omit<FieldProps, 'size'>, InputProps {
    /**
     * Лейбл сверху.
     */
    caption?: string;
}

const StyledInput = styled(Input)`
    ${applyInputStyles}
    ${bodySBold}

    border-radius: 0.75rem;

    &:not(:placeholder-shown) {
        /* stylelint-disable-next-line number-max-precision */
        padding-top: 1.4375rem;
    }

    &::placeholder {
        color: transparent;
    }
`;
const StyledPlaceholder = styled(FieldPlaceholder)`
    ${bodySBold}

    top: 1rem;
    left: 1rem;
    right: 1rem;

    input:not(:placeholder-shown) ~ & {
        transform: scale(0.715);
        top: 0.375rem;
    }
`;
const StyledCaption = styled.span`
    ${bodySBold}

    display: flex;
    margin-bottom: 0.75rem;
    color: ${primary};
`;

/**
 * Поле ввода текста.
 */
// eslint-disable-next-line prefer-arrow-callback
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
    {
        id,
        disabled,
        status,
        label,
        placeholder,
        contentLeft,
        contentRight,
        caption,
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
            $disabled={disabled}
            $isContentLeft={Boolean(contentLeft)}
            $isContentRight={Boolean(contentRight)}
            $isHelper={Boolean(helperText)}
            status={status}
            style={style}
            className={className}
        >
            {caption && <StyledCaption id={id ? `${id}-label` : undefined}>{caption}</StyledCaption>}
            <FieldWrapper status={status}>
                {contentLeft && <FieldContent pos="left">{contentLeft}</FieldContent>}
                <StyledInput
                    ref={ref}
                    id={id}
                    placeholder={placeLabel}
                    disabled={disabled}
                    status={status}
                    aria-labelledby={id ? `${id}-label` : undefined}
                    aria-describedby={id ? `${id}-helpertext` : undefined}
                    {...rest}
                />
                {placeLabel && <StyledPlaceholder htmlFor={id}>{placeLabel}</StyledPlaceholder>}
                {contentRight && <FieldContent pos="right">{contentRight}</FieldContent>}
            </FieldWrapper>
            {helperText && <FieldHelper id={id ? `${id}-helpertext` : undefined}>{helperText}</FieldHelper>}
        </FieldRoot>
    );
});
