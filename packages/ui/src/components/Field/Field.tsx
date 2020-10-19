import React, { forwardRef, useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { colors } from 'plasma-tokens';

import { StyledRoot as Root, StyledInput as Input, InputProps } from '../Input/Input';

// В этих константах задаем размеры в em, чтобы не зависеть напрямую от пикселей
// В то же время в числителях - значения в пикселях, взятые из макета
const fontSize = 16;
const rootHeight = 56 / fontSize;
const rootBorderWidth = 1 / fontSize;
const rootBorderRadius = 6 / fontSize;
const rootPaddingX = 1 - rootBorderWidth;
const linePaddingX = rootPaddingX;
const linePaddingT = 26 / fontSize;
const linePaddingB = 10 / fontSize - rootBorderWidth;
const linePaddingCompactX = 12 / fontSize;
const titleMarginX = linePaddingX * 2;
const titleTopEmpty = 18 / fontSize;
const titleTop = 3 / 12;
const titleFontSize = 12 / 16;

interface StyledRootProps {
    disabled?: boolean;
    isIconLeft?: boolean;
    isIconRight?: boolean;
}

const StyledRoot = styled(Root)<StyledRootProps>`
    position: relative;
    box-sizing: border-box;
    height: ${rootHeight}em;

    border-radius: ${rootBorderRadius}em;

    ${({ isIconLeft }) =>
        isIconLeft &&
        css`
            padding-left: ${rootPaddingX}em;
        `}

    ${({ isIconRight }) =>
        isIconRight &&
        css`
            padding-right: ${rootPaddingX}em;
        `}

    ${({ disabled }) =>
        disabled &&
        css`
            background: none;
        `}
`;

interface StyledInputLinePros {
    isIconLeft?: boolean;
    isIconRight?: boolean;
}

const StyledInputLine = styled.div<StyledInputLinePros>`
    box-sizing: border-box;
    width: 100%;
    padding: ${linePaddingT}em ${linePaddingX}em ${linePaddingB}em;

    ${({ isIconLeft }) =>
        isIconLeft &&
        css`
            padding-left: ${linePaddingCompactX}em;
        `}

    ${({ isIconRight }) =>
        isIconRight &&
        css`
            padding-right: ${linePaddingCompactX}em;
        `}
`;

interface StyledTitleProps {
    disabled?: boolean;
    focused?: boolean;
    isValue?: boolean;
}

const StyledTitle = styled.span<StyledTitleProps>`
    position: absolute;
    top: 0;

    width: calc(100% - ${titleMarginX}em);

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    transform: translateY(${titleTopEmpty}em);
    transition: all 0.1s ease-in-out;

    ${({ disabled }) =>
        disabled &&
        css`
            color: ${colors.whiteTertiary};
        `}

    ${({ focused }) =>
        focused &&
        css`
            color: ${colors.accent};
        `}

    ${({ isValue, focused }) =>
        (isValue || focused) &&
        css`
            transform: translateY(${titleTop}em);
            font-size: ${titleFontSize}em;
        `}
`;

const StyledInput = styled(Input)`
    padding-left: 0;
    padding-right: 0;

    color: ${colors.whitePrimary};
`;

export interface FieldProps extends Omit<InputProps, 'iconName' | 'placeholder' | 'onResetClick'> {
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
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
    ({ value, title, disabled, contentLeft, contentRight, onFocus, onBlur, ...rest }, ref) => {
        const [focused, setFocused] = useState(false);
        const handleFocus = useCallback((e) => {
            setFocused(true);
            onFocus?.(e);
        }, []);
        const handleBlur = useCallback((e) => {
            setFocused(false);
            onBlur?.(e);
        }, []);

        return (
            <StyledRoot disabled={disabled} isIconLeft={!!contentLeft} isIconRight={!!contentRight}>
                {contentLeft}
                <StyledInputLine>
                    {title && (
                        <StyledTitle focused={focused} disabled={disabled} isValue={!!value}>
                            {title}
                        </StyledTitle>
                    )}
                    <StyledInput
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
