import React from 'react';
import styled, { css } from 'styled-components';
import { TextFieldHelper } from '@sberdevices/plasma-core/components/TextField';
import type { TextFieldProps as BaseTextFieldProps } from '@sberdevices/plasma-core/components/TextField';

import { TextFieldRoot, TextFieldInputWrapper, TextFieldInput, TextFieldContent } from '../TextField/TextField';

export interface TextAreaProps
    extends Omit<BaseTextFieldProps, 'type'>,
        Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onFocus' | 'onBlur'> {
    /**
     * Изменение размера текстового поля.
     */
    resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

const StyledInputWrapper = styled(TextFieldInputWrapper)<Pick<TextAreaProps, 'resize'>>`
    ${({ resize }) => (resize === 'both' || resize === 'horizontal') && 'display: inline-flex;'}
`;
const StyledTextArea = styled.textarea<TextAreaProps>`
    display: block;
    height: 9.375rem; /* 150px */
    min-height: 3rem; /* 48px */
    ${({ resize }) =>
        css`
            ${resize && `resize: ${resize};`}
            ${resize !== 'both' && resize !== 'horizontal' && 'min-width: 100%;max-width: 100%;'}
        `}
`;

/**
 * Поле ввода многострочного текста.
 */
export const TextArea = React.forwardRef<HTMLInputElement, TextAreaProps>(
    (
        { value, placeholder, helperText, disabled, contentRight, status, resize, onChange, onFocus, onBlur, ...rest },
        ref,
    ) => {
        return (
            <TextFieldRoot disabled={disabled} status={status} isContentRight={!!contentRight} {...rest}>
                <StyledInputWrapper resize={resize}>
                    <TextFieldInput
                        as={StyledTextArea}
                        ref={ref}
                        value={value}
                        placeholder={placeholder}
                        disabled={disabled}
                        status={status}
                        isContentRight={!!contentRight}
                        resize={resize}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                    {contentRight && <TextFieldContent>{contentRight}</TextFieldContent>}
                </StyledInputWrapper>
                {helperText && <TextFieldHelper status={status}>{helperText}</TextFieldHelper>}
            </TextFieldRoot>
        );
    },
);
