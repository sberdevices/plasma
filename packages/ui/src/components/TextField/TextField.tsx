import React from 'react';
import styled, { css } from 'styled-components';
import {
    body1,
    caption,
    accent,
    critical,
    surfaceLiquid01,
    surfaceLiquid02,
    whitePrimary,
    whiteSecondary,
    scalingPixelBasis,
} from '@sberdevices/plasma-tokens';

import { DisabledProps } from '../../mixins';

/**
 * Значения в ремах храним тут,
 * чтобы не считать их каждый раз при перерисовке.
 * Числа в числителях соответствуют значениям в макетах.
 */
const paddingX = `${16 / scalingPixelBasis}rem`;
const paddingXWithContent = `${(16 * 2 + 24) / scalingPixelBasis}rem`;
const inputHeight = `${56 / scalingPixelBasis}rem`;
const inputPaddingT = `${26 / scalingPixelBasis}rem`;
const inputPaddingB = `${10 / scalingPixelBasis}rem`;
const inputBorderRadius = `${16 / scalingPixelBasis}rem`;
const labelTopEmpty = `${18 / scalingPixelBasis}rem`;
const labelTopFullfilled = `${6 / scalingPixelBasis}rem`;
const contentTop = `${16 / scalingPixelBasis}rem`;
const helperTop = `${4 / scalingPixelBasis}rem`;

interface ValidationProps {
    /**
     * Компонент заполнен успешно.
     */
    hasSuccess?: boolean;
    /**
     * Ошибки валидации.
     */
    hasError?: boolean;
}

interface IsContentProps {
    isContentLeft?: boolean;
    isContentRight?: boolean;
}

const StyledInputWrapper = styled.label`
    position: relative;
    cursor: pointer;
`;

const StyledInput = styled.input`
    ${body1};

    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    padding: ${inputPaddingT} ${paddingX} ${inputPaddingB};
    width: 100%;
    height: ${inputHeight};

    background-color: ${surfaceLiquid01};
    border: 0 none;
    border-radius: ${inputBorderRadius};
    color: ${whitePrimary};

    transition-duration: 0.1s;
    transition-property: background-color, color;
    transition-timing-function: ease-in-out;

    &:focus {
        background-color: ${surfaceLiquid02};
        outline: none;
    }

    &:disabled {
        color: ${whiteSecondary};
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
    top: ${labelTopEmpty};
    left: ${paddingX};
    right: ${paddingX};

    transition: all 0.1s ease-in-out;

    /* stylelint-disable-next-line selector-nested-pattern, selector-type-no-unknown */
    ${StyledInput}:focus ~ & {
        ${caption};

        top: ${labelTopFullfilled};
    }

    ${({ isValue }) =>
        isValue &&
        css`
            ${caption};

            top: ${labelTopFullfilled};
        `}
`;

const StyledContent = styled.div`
    position: absolute;
    top: ${contentTop};
    left: 0;
    margin: 0 ${paddingX};

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

    margin-top: ${helperTop};
    padding-left: ${paddingX};
    padding-right: ${paddingX};
`;

const StyledRoot = styled.div<ValidationProps & DisabledProps & IsContentProps>`
    display: flex;
    flex-direction: column;

    caret-color: ${accent};
    color: ${whiteSecondary};

    ${({ hasSuccess }) =>
        hasSuccess &&
        css`
            color: ${accent};
        `}

    ${({ hasError }) =>
        hasError &&
        css`
            color: ${critical};
        `}

    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0.4;
        `}

    ${({ isContentLeft }) =>
        isContentLeft &&
        css`
            & ${StyledInput} {
                padding-left: ${paddingXWithContent};
            }
            & ${StyledLabel} {
                left: ${paddingXWithContent};
            }
        `}

    ${({ isContentRight }) =>
        isContentRight &&
        css`
            & ${StyledInput} {
                padding-right: ${paddingXWithContent};
            }
            & ${StyledLabel} {
                right: ${paddingXWithContent};
            }
        `}
`;

export interface FieldProps extends ValidationProps, React.InputHTMLAttributes<HTMLInputElement> {
    /**
     * Надпись лейбла.
     */
    title?: string;
    /**
     * Слот для контента слева.
     */
    contentLeft?: React.ReactElement;
    /**
     * Слот для контента справа.
     */
    contentRight?: React.ReactElement;
    /**
     * Подсказка для поля ввода.
     */
    helperText?: string;
}

/**
 * Компонент ввода с подписью (caption) сверху.
 */
export const TextField = React.forwardRef<HTMLInputElement, FieldProps>(
    (
        {
            value,
            title,
            helperText,
            disabled,
            contentLeft,
            contentRight,
            hasSuccess,
            hasError,
            style,
            className,
            ...rest
        },
        ref,
    ) => (
        <StyledRoot
            hasSuccess={hasSuccess}
            hasError={hasError}
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
