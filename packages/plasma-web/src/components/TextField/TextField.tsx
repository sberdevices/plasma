import React from 'react';
import styled, { css } from 'styled-components';
import { TextFieldRoot as BaseRoot, TextFieldHelper } from '@sberdevices/plasma-core/components/TextField';
import type { TextFieldProps as BaseTextFieldProps } from '@sberdevices/plasma-core/components/TextField';
import { accent, critical, primary, secondary, white, text, tertiary, body1 } from '@sberdevices/plasma-tokens-web';

export interface TextFieldProps
    extends BaseTextFieldProps,
        Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onFocus' | 'onBlur'> {}

interface StyledRootProps {
    isContentRight?: boolean;
}
interface StyledInputProps extends TextFieldProps {
    isContentRight?: boolean;
}

export const TextFieldRoot = styled(BaseRoot)<StyledRootProps>`
    ${body1};

    color: ${primary};
`;
export const TextFieldInputWrapper = styled.label`
    position: relative;
    display: block;
    cursor: text;
`;
export const TextFieldInput = styled.input<StyledInputProps>`
    grid-area: input;
    box-sizing: border-box;

    width: 100%;
    height: 3rem;
    padding: 0.75rem 1rem;

    /* stylelint-disable-next-line number-max-precision */
    border: 0.0625rem solid ${tertiary};
    border-radius: 0.25rem;

    background: ${white};
    color: ${text};
    caret-color: ${accent};

    font: inherit;
    line-height: inherit;
    letter-spacing: inherit;

    transition: border-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;

    &:hover {
        border-color: rgba(0, 0, 0, 0.32);
    }

    &:focus {
        /* stylelint-disable-next-line number-max-precision */
        box-shadow: inset 0 0 0 0.0625rem ${accent};
        border-color: ${accent};
        outline: none;
    }

    &::placeholder {
        color: ${tertiary};
    }

    ${({ status }) =>
        status === 'error' &&
        css`
            border-color: ${critical};
        `}

    ${({ isContentRight }) =>
        isContentRight &&
        css`
            padding-right: 3.25rem;
        `}
`;
export const TextFieldContent = styled.div`
    position: absolute;
    top: 0;
    right: 0.75rem;
    bottom: 0;
    height: 3rem;

    display: flex;
    align-items: center;

    color: ${secondary};
`;

/**
 * Поле ввода текста.
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    ({ value, placeholder, helperText, disabled, contentRight, status, onChange, onFocus, onBlur, ...rest }, ref) => {
        return (
            <TextFieldRoot disabled={disabled} status={status} isContentRight={!!contentRight} {...rest}>
                <TextFieldInputWrapper>
                    <TextFieldInput
                        ref={ref}
                        value={value}
                        placeholder={placeholder}
                        disabled={disabled}
                        status={status}
                        isContentRight={!!contentRight}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                    {contentRight && <TextFieldContent>{contentRight}</TextFieldContent>}
                </TextFieldInputWrapper>
                {helperText && <TextFieldHelper status={status}>{helperText}</TextFieldHelper>}
            </TextFieldRoot>
        );
    },
);
