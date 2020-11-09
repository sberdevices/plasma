import React, { forwardRef, useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { colors, scalingPixelBasis } from '@sberdevices/plasma-tokens';

import { StyledInputRoot, StyledInput, InputProps } from '../Input/Input';

// В этих константах задаем размеры в em, чтобы не зависеть напрямую от пикселей
// В то же время в числителях - значения в пикселях, взятые из макета
const rootHeight = 56 / scalingPixelBasis;
const rootBorderRadius = 12 / scalingPixelBasis;
const rootPaddingX = 16 / scalingPixelBasis;
const linePaddingT = 24 / scalingPixelBasis;
const linePaddingX = rootPaddingX;
const linePaddingCompactX = 12 / scalingPixelBasis;
const titleMarginX = linePaddingX * 2;
const titleTranslateYSmall = 4 / scalingPixelBasis;
const titleTranslateY = 18 / scalingPixelBasis;
const titleFontSize = 12 / scalingPixelBasis;
const inputHeight = 22 / scalingPixelBasis;

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

interface StyledRootProps extends ValidationProps {
    disabled?: boolean;
    isIconLeft?: boolean;
    isIconRight?: boolean;
}

const StyledRoot = styled(StyledInputRoot)<StyledRootProps>`
    box-sizing: border-box;
    height: ${rootHeight}rem;

    border-radius: ${rootBorderRadius}rem;

    ${({ isIconLeft }) =>
        isIconLeft &&
        css`
            padding-left: ${rootPaddingX}rem;
        `}

    ${({ isIconRight }) =>
        isIconRight &&
        css`
            padding-right: ${rootPaddingX}rem;
        `}

    ${({ disabled }) =>
        disabled &&
        css`
            background: ${colors.surfaceLiquid01};
        `}

    ${({ hasSuccess }) =>
        hasSuccess &&
        css`
            background-color: #12a55716;
        `}

    ${({ hasError }) =>
        hasError &&
        css`
            background-color: #dc283a16;
        `}
`;

interface StyledInputLinePros {
    isIconLeft?: boolean;
    isIconRight?: boolean;
}

const StyledInputLine = styled.div<StyledInputLinePros>`
    position: relative;
    box-sizing: border-box;

    width: 100%;
    height: 100%;
    padding: ${linePaddingT}rem ${linePaddingX}rem 0;

    ${({ isIconLeft }) =>
        isIconLeft &&
        css`
            padding-left: ${linePaddingCompactX}rem;
        `}

    ${({ isIconRight }) =>
        isIconRight &&
        css`
            padding-right: ${linePaddingCompactX}rem;
        `}
`;

interface StyledTitleProps extends ValidationProps {
    disabled?: boolean;
    focused?: boolean;
    isValue?: boolean;
}

const StyledTitle = styled.span<StyledTitleProps>`
    position: absolute;
    top: 0;

    width: calc(100% - ${titleMarginX}rem);

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    transform: translateY(${titleTranslateY}rem);
    transition: all 0.1s ease-in-out;

    ${({ disabled }) =>
        disabled &&
        css`
            color: ${colors.whiteSecondary};
        `}

    ${({ focused }) =>
        focused &&
        css`
            color: ${colors.accent};
        `}

    ${({ isValue, focused }) =>
        (isValue || focused) &&
        css`
            transform: translateY(${titleTranslateYSmall}rem);
            font-size: ${titleFontSize}rem;
        `}

    ${({ hasSuccess }) =>
        hasSuccess &&
        css`
            color: ${colors.accent};
        `}

    ${({ hasError }) =>
        hasError &&
        css`
            color: ${colors.critical};
        `}
`;

const StyledFieldInput = styled(StyledInput)`
    height: ${inputHeight}rem;
    padding: 0;

    color: ${colors.whitePrimary};
`;

export interface FieldProps extends Omit<InputProps, 'iconName' | 'placeholder' | 'onResetClick'>, ValidationProps {
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
    style?: React.CSSProperties;
    className?: string;
}

export const TextField = forwardRef<HTMLInputElement, FieldProps>(
    (
        { value, title, disabled, contentLeft, contentRight, onFocus, onBlur, hasSuccess, hasError, style, ...rest },
        ref,
    ) => {
        const [focused, setFocused] = useState(false);
        const handleFocus = useCallback(
            (e) => {
                setFocused(true);
                onFocus?.(e);
            },
            [onFocus],
        );
        const handleBlur = useCallback(
            (e) => {
                setFocused(false);
                onBlur?.(e);
            },
            [onBlur],
        );

        return (
            <StyledRoot
                disabled={disabled}
                isIconLeft={!!contentLeft}
                isIconRight={!!contentRight}
                hasSuccess={hasSuccess}
                hasError={hasError}
                style={style}
            >
                {contentLeft}
                <StyledInputLine>
                    {title && (
                        <StyledTitle
                            focused={focused}
                            disabled={disabled}
                            isValue={!!value}
                            hasSuccess={hasSuccess}
                            hasError={hasError}
                        >
                            {title}
                        </StyledTitle>
                    )}
                    <StyledFieldInput
                        ref={ref}
                        value={value}
                        disabled={disabled}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        {...rest}
                    />
                </StyledInputLine>
                {contentRight}
            </StyledRoot>
        );
    },
);
