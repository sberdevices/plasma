import React from 'react';
import styled, { css } from 'styled-components';
import { TextFieldRoot, TextFieldHelper } from '@sberdevices/plasma-core/components/TextField';
import type { TextFieldProps as BaseTextFieldProps } from '@sberdevices/plasma-core/components/TextField';

import { accent, critical, primary, secondary, white, text, tertiary, formBorder, body1 } from '../../tokens';

export interface TextFieldProps
    extends BaseTextFieldProps,
        Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onFocus' | 'onBlur'> {}

interface StyledRootProps {
    isContentRight?: boolean;
}
interface StyledInputProps extends TextFieldProps {
    isContentRight?: boolean;
}

const StyledRoot = styled(TextFieldRoot)<StyledRootProps>`
    ${body1};

    color: ${primary};
`;
const StyledInputWrapper = styled.label`
    position: relative;
    display: block;
    cursor: text;
`;
const StyledInput = styled.input<StyledInputProps>`
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
        border-color: ${formBorder};
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
const StyledContent = styled.div`
    position: absolute;
    top: 0;
    right: 0.75rem;
    bottom: 0;

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
            <StyledRoot disabled={disabled} status={status} isContentRight={!!contentRight} {...rest}>
                <StyledInputWrapper>
                    <StyledInput
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
                    {contentRight && <StyledContent>{contentRight}</StyledContent>}
                </StyledInputWrapper>
                {helperText && <TextFieldHelper status={status}>{helperText}</TextFieldHelper>}
            </StyledRoot>
        );
    },
);
