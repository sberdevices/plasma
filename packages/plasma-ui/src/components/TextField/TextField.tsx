import React from 'react';
import styled, { css } from 'styled-components';
import { caption, accent, surfaceLiquid01, surfaceLiquid02, primary, secondary } from '@sberdevices/plasma-tokens';
import { TextFieldRoot, TextFieldHelper } from '@sberdevices/plasma-core';
import type { TextFieldProps as BaseTextFieldProps } from '@sberdevices/plasma-core';

export interface TextFieldProps
    extends BaseTextFieldProps,
        Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onFocus' | 'onBlur'> {
    /**
     * Слот для контента слева.
     */
    contentLeft?: React.ReactElement;
}

interface StyledRootProps {
    isContentLeft?: boolean;
    isContentRight?: boolean;
}
interface StyledLabelProps {
    isValue?: boolean;
}

const StyledInputWrapper = styled.label`
    position: relative;
    display: block;
    cursor: text;
`;
const StyledInput = styled.input`
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    padding: 1.625rem 1rem 0.625rem;
    width: 100%;
    height: 3.5rem;

    background-color: ${surfaceLiquid01};
    border: 0 none;
    border-radius: 1rem;
    color: ${primary};
    caret-color: ${accent};

    font: inherit;
    line-height: inherit;
    letter-spacing: inherit;

    transition-duration: 0.1s;
    transition-property: background-color, color;
    transition-timing-function: ease-in-out;

    &:focus {
        background-color: ${surfaceLiquid02};
        outline: none;
    }

    &:disabled {
        color: ${secondary};
    }
`;
const StyledLabel = styled.span<StyledLabelProps>`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    position: absolute;
    top: 1.125rem;
    left: 1rem;
    right: 1rem;

    transition: all 0.1s ease-in-out;

    /* stylelint-disable-next-line selector-nested-pattern, selector-type-no-unknown */
    ${StyledInput}:focus ~ & {
        ${caption};

        top: 0.375rem;
    }

    ${({ isValue }) =>
        isValue &&
        css`
            ${caption};

            top: 0.375rem;
        `}
`;
const StyledContent = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin: 0 1rem;

    display: flex;
    align-items: center;

    color: ${secondary};

    /* stylelint-disable-next-line */
    ${StyledInput} ~ & {
        left: auto;
        right: 0;
    }
`;
const StyledRoot = styled(TextFieldRoot)<StyledRootProps>`
    color: ${secondary};

    ${({ isContentLeft }) =>
        isContentLeft &&
        css`
            & ${StyledInput} {
                padding-left: 3.5rem;
            }
            & ${StyledLabel} {
                left: 3.5rem;
            }
        `}

    ${({ isContentRight }) =>
        isContentRight &&
        css`
            & ${StyledInput} {
                padding-right: 3.5rem;
            }
            & ${StyledLabel} {
                right: 3.5rem;
            }
        `}
`;

/**
 * Компонент ввода с подписью (caption) сверху.
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    (
        {
            value,
            label,
            helperText,
            disabled,
            contentLeft,
            contentRight,
            status,
            onChange,
            onFocus,
            onBlur,
            className,
            id,
            style,
            type = 'text',
            ...rest
        },
        ref,
    ) => (
        <StyledRoot
            status={status}
            disabled={disabled}
            isContentLeft={!!contentLeft}
            isContentRight={!!contentRight}
            className={className}
            style={style}
            id={id}
        >
            <StyledInputWrapper>
                {contentLeft && <StyledContent>{contentLeft}</StyledContent>}
                <StyledInput
                    ref={ref}
                    value={value}
                    type={type}
                    disabled={disabled}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    {...rest}
                />
                {label && <StyledLabel isValue={!!value}>{label}</StyledLabel>}
                {contentRight && <StyledContent>{contentRight}</StyledContent>}
            </StyledInputWrapper>
            {helperText && <TextFieldHelper status={status}>{helperText}</TextFieldHelper>}
        </StyledRoot>
    ),
);
