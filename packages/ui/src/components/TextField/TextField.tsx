import React from 'react';
import styled, { css } from 'styled-components';
import {
    body1,
    caption,
    accent,
    critical,
    surfaceLiquid01,
    surfaceLiquid02,
    primary,
    secondary,
} from '@sberdevices/plasma-tokens';

import { DisabledProps } from '../../mixins';

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /**
     * Надпись лейбла.
     */
    title?: string;
    /**
     * Подсказка для поля ввода.
     */
    helperText?: string;
    /**
     * Слот для контента слева.
     */
    contentLeft?: React.ReactElement;
    /**
     * Слот для контента справа.
     */
    contentRight?: React.ReactElement;
    /**
     * Статус компонента: заполнен успешно или с ошибкой.
     */
    status?: 'success' | 'error';
}

interface IsContentProps {
    isContentLeft?: boolean;
    isContentRight?: boolean;
}

const StyledInputWrapper = styled.label`
    position: relative;
    cursor: text;
`;

const StyledInput = styled.input`
    ${body1};

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

interface StyledLabelProps {
    isValue?: boolean;
}

const StyledLabel = styled.span<StyledLabelProps>`
    ${body1};

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
    color: ${primary};
    display: flex;
    align-items: center;

    /* stylelint-disable-next-line max-line-length */
    /* stylelint-disable-next-line declaration-block-semicolon-newline-after, rule-empty-line-before, selector-nested-pattern */
    ${StyledInput} ~ & {
        left: auto;
        right: 0;
    }
`;

const StyledHelperText = styled.span`
    ${caption};

    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    margin-top: 0.25rem;
    padding-left: 1rem;
    padding-right: 1rem;
`;

const StyledRoot = styled.div<Pick<FieldProps, 'status'> & DisabledProps & IsContentProps>`
    display: flex;
    flex-direction: column;

    caret-color: ${accent};
    color: ${secondary};

    ${({ status }) => {
        if (status === 'success') {
            return css`
                color: ${accent};
            `;
        }
        if (status === 'error') {
            return css`
                color: ${critical};
            `;
        }
        return '';
    }}

    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0.4;
        `}

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
export const TextField = React.forwardRef<HTMLInputElement, FieldProps>(
    ({ value, title, helperText, disabled, contentLeft, contentRight, status, style, className, ...rest }, ref) => (
        <StyledRoot
            status={status}
            disabled={disabled}
            style={style}
            className={className}
            isContentLeft={!!contentLeft}
            isContentRight={!!contentRight}
        >
            <StyledInputWrapper>
                {contentLeft && <StyledContent>{contentLeft}</StyledContent>}
                <StyledInput ref={ref} value={value} disabled={disabled} {...rest} />
                {title && <StyledLabel isValue={!!value}>{title}</StyledLabel>}
                {contentRight && <StyledContent>{contentRight}</StyledContent>}
            </StyledInputWrapper>
            {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
        </StyledRoot>
    ),
);
