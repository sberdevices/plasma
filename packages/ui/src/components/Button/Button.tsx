import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { typography, colors } from '@sberdevices/plasma-tokens';

import { views, View } from '../../mixins/views';
import { PickOptional } from '../../types/PickOptional';

const sizesToTypography = {
    l: typography.button1,
    m: typography.button1,
    s: typography.button2,
};

// Размеры в пикселях по макету
const sizes = {
    l: {
        fontSize: 16,
        height: 56,
        paddingY: 16,
        paddingX: 26,
        squareRadius: 16,
        outline: 2,
    },
    m: {
        fontSize: 16,
        height: 48,
        paddingY: 12,
        paddingX: 22,
        squareRadius: 12,
        outline: 2,
    },
    s: {
        fontSize: 14,
        height: 40,
        paddingY: 8,
        paddingX: 18,
        squareRadius: 12,
        outline: 2,
    },
};

// Матрица радиусов. r - радиус стандартный, h - радиус округлый (вычисляемый из высоты)
const pinsMatrix = {
    'square-square': 'r r r r',
    'square-clear': 'r 0 0 r',
    'clear-square': '0 r r 0',
    'clear-clear': '0 0 0 0',
    'clear-circle': '0 h h 0',
    'circle-clear': 'h 0 0 h',
    'circle-circle': 'h h h h',
};

export type Size = keyof typeof sizesToTypography;

export type Pin = keyof typeof pinsMatrix;

export interface Sized {
    /**
     * Размер кнопки
     */
    size: Size;
    /**
     * Границы кнопки
     */
    pin: Pin;
    /**
     * Растянуть кнопку на всю ширину родителя (width=100%)
     */
    fullWidth?: boolean;
    isTextOrChildren?: boolean;
}

// Преобразовывает матрицу радиусов с указанными размерами
const convertMatrix = (matrix: string, r: string, h: string): string => {
    return matrix
        .split(' ')
        .map((char) => {
            switch (char) {
                case 'r':
                    return r;
                case 'h':
                    return h;
                default:
                    return char;
            }
        })
        .join(' ');
};

// Возвращает стили размеров по параметрам
const getSizes = ({ pin, size, fullWidth = false, isTextOrChildren = false }: Sized) => {
    const { fontSize } = sizes[size];
    const height = sizes[size].height / fontSize;
    const paddingY = sizes[size].paddingY / fontSize;
    const paddingX = sizes[size].paddingX / fontSize;
    const squareRadius = sizes[size].squareRadius / fontSize;
    const circleRadius = height / 2;
    const outline = sizes[size].outline / fontSize;
    const elemRadius = convertMatrix(pinsMatrix[pin], `${squareRadius}em`, `${circleRadius}em`);
    const beforeRadius = convertMatrix(pinsMatrix[pin], `${squareRadius + outline}em`, `${circleRadius + outline}em`);

    return css`
        height: ${height}em;
        padding-top: ${paddingY}em;
        padding-bottom: ${paddingY}em;
        border-radius: ${elemRadius};

        ${sizesToTypography[size]}

        ${isTextOrChildren
            ? css`
                  padding-left: ${paddingX}em;
                  padding-right: ${paddingX}em;
              `
            : css`
                  width: ${height}em;
                  padding-left: ${paddingY}em;
                  padding-right: ${paddingY}em;
              `};

        ${fullWidth &&
        css`
            width: 100%;
        `};

        &::before {
            top: -${outline}em;
            left: -${outline}em;
            border-radius: ${beforeRadius};
            border-width: ${outline}em;
        }

        &:focus::before {
            box-shadow: 0 0 0 ${outline}em ${colors.buttonFocused};
        }
    `;
};

interface StyledButtonProps extends Sized {
    /**
     * Вид кнопки
     */
    view: View;
    /**
     * Увеличение по нажатию и ховеру, по умолчанию включено
     */
    motion?: boolean;
    disabled?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
    position: relative;

    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;

    appearance: none;
    border: none;

    transition: transform 0.1s ease-in-out;

    ${({ motion }) =>
        motion &&
        css`
            &:hover {
                transform: scale(1.1);
            }
            &:active {
                transform: scale(0.926);
            }
        `}

    ${({ view }) => css`
        ${views[view]}
    `}

    ${getSizes}

    &:focus {
        outline: none;
    }

    &:disabled {
        opacity: 0.4;

        &:hover, &:active {
            transform: none;
        }
    }

    &::before {
        position: absolute;

        width: 100%;
        height: 100%;

        border-color: transparent;
        border-style: solid;
        content: '';

        transition: box-shadow 0.2s ease-in-out;
    }
`;

interface StyledTextProps {
    isContentLeft?: boolean;
    isContentRight?: boolean;
}

const StyledText = styled.span<StyledTextProps>`
    box-sizing: border-box;

    ${({ isContentLeft }) =>
        isContentLeft &&
        css`
            margin-left: 0.25em;
        `}

    ${({ isContentRight }) =>
        isContentRight &&
        css`
            margin-right: 0.25em;
        `}
`;

export interface ButtonProps
    extends PickOptional<StyledButtonProps, 'fullWidth' | 'pin' | 'view' | 'size' | 'motion' | 'disabled'>,
        React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Слот для контента слева, например <Icon/>
     */
    contentLeft?: React.ReactNode;
    /**
     * Слот для контента справа, например <Icon/>
     */
    contentRight?: React.ReactNode;
    /**
     * Текстовая надпись на кнопке
     */
    text?: string;
    /**
     * Кастомный контент кнопки. При указании этого свойства contentLeft, contentRight и text не применяются
     */
    children?: React.ReactNode;
    className?: string;
    onFocus?: React.FocusEventHandler<HTMLButtonElement>;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            text,
            children,
            contentLeft,
            contentRight,
            view = 'secondary',
            size = 'l',
            pin = 'square-square',
            motion = true,
            ...rest
        },
        ref,
    ) => (
        <StyledButton
            view={view}
            size={size}
            pin={pin}
            motion={motion}
            isTextOrChildren={!!text || !!children}
            ref={ref}
            {...rest}
        >
            {children}
            {!children && contentLeft}
            {!children && text && (
                <StyledText isContentLeft={!!contentLeft} isContentRight={!!contentRight}>
                    {text}
                </StyledText>
            )}
            {!children && contentRight}
        </StyledButton>
    ),
);
