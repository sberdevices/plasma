import React, { forwardRef } from 'react';
import styled from 'styled-components';
import {
    FieldRoot,
    FieldPlaceholder,
    FieldContent,
    FieldHelper,
    Input,
    primary,
    secondary,
} from '@sberdevices/plasma-core';
import type { InputProps } from '@sberdevices/plasma-core';

import { bodySBold, textXSBold } from '../../tokens';
import { FieldWrapper, applyInputStyles } from '../Field';

export interface TextFieldProps extends Omit<InputProps, 'size'> {
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
        padding-bottom: 0.5rem;
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
    color: ${secondary};

    input:not(:placeholder-shown) ~ & {
        transform: scale(0.715);
        top: 0.5rem;
        left: 0;
    }
`;
const StyledCaption = styled.span`
    ${bodySBold}

    display: flex;
    margin-bottom: 0.75rem;
    color: ${primary};
`;
const StyledHelper = styled(FieldHelper)`
    ${textXSBold}

    left: 0;
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
            {caption && <StyledCaption>{caption}</StyledCaption>}
            <FieldWrapper status={status}>
                {contentLeft && <FieldContent pos="left">{contentLeft}</FieldContent>}
                <StyledInput ref={ref} id={id} placeholder={placeLabel} disabled={disabled} status={status} {...rest} />
                {placeLabel && <StyledPlaceholder htmlFor={id}>{placeLabel}</StyledPlaceholder>}
                {contentRight && <FieldContent pos="right">{contentRight}</FieldContent>}
            </FieldWrapper>
            {helperText && <StyledHelper>{helperText}</StyledHelper>}
        </FieldRoot>
    );
});
