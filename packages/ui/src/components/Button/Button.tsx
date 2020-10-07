import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { typography, colors } from 'plasma-tokens';

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

export const viewToColors = {
    primary: css`
        background-color: ${colors.buttonAccent};
        color: ${colors.text};
    `,
    secondary: css`
        background-color: ${colors.buttonSecondary};
        color: ${colors.text};
    `,
    checked: css`
        background-color: ${colors.buttonChecked};
        color: ${colors.black};
    `,
    warning: css`
        background-color: ${colors.buttonWarning};
        color: ${colors.text};
    `,
    critical: css`
        background-color: ${colors.buttonCritical};
        color: ${colors.text};
    `,
    clear: css`
        background-color: ${colors.transparent};
        color: ${colors.text};
    `,
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

export type Sizes = keyof typeof sizesToTypography;

export type Views = keyof typeof viewToColors;

export type Pins = keyof typeof pinsMatrix;

export interface SizesModel {
    size?: Sizes;
    pin?: Pins;
    isText?: boolean;
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
const getSizes = ({ size = 'l', pin = 'square-square', isText = false }: SizesModel) => {
    const fontSize = sizes[size].fontSize;
    const height = sizes[size].height / fontSize;
    const paddingY = sizes[size].paddingY / fontSize;
    const paddingX = sizes[size].paddingX / fontSize;
    const squareRadius = sizes[size].squareRadius / fontSize;
    const circleRadius = height / 2;
    const outline = sizes[size].outline / fontSize;
    const elemRadius = convertMatrix(pinsMatrix[pin], `${squareRadius}em`, `${circleRadius}em`);
    const beforeRadius = convertMatrix(pinsMatrix[pin], `${squareRadius + outline}em`, `${circleRadius + outline}em`);

    let sizesIfText;

    if (isText) {
        sizesIfText = css`
            padding-left: ${paddingX}em;
            padding-right: ${paddingX}em;
        `;
    } else {
        sizesIfText = css`
            width: ${height}em;
            padding-left: ${paddingY}em;
            padding-right: ${paddingY}em;
        `;
    }

    return css`
        ${sizesIfText};

        height: ${height}em;
        padding-top: ${paddingY}em;
        padding-bottom: ${paddingY}em;
        border-radius: ${elemRadius};

        ${sizesToTypography[size]}

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

interface StyledButtonProps extends SizesModel {
    view?: Views;
    disabled?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
    position: relative;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    appearance: none;
    border: none;

    transition: transform 0.1s ease-in-out;

    &:focus {
        outline: none;
    }

    &:hover {
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.926);
    }

    ${({ view = 'secondary' }) => css`
        ${viewToColors[view]}
    `}

    ${getSizes}

    &[disabled] {
        opacity: 0.4;

        &:hover,
        &:active {
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
    isIconLeft?: boolean;
    isIconRight?: boolean;
}

const StyledText = styled.span<StyledTextProps>`
    ${({ isIconLeft }) =>
        isIconLeft &&
        css`
            margin-left: 0.25em;
        `}

    ${({ isIconRight }) =>
        isIconRight &&
        css`
            margin-right: 0.25em;
        `}
`;

export interface ButtonProps
    extends Pick<StyledButtonProps, 'pin' | 'view' | 'size' | 'disabled'>,
        React.ButtonHTMLAttributes<HTMLButtonElement> {
    iconLeft?: React.ReactElement;
    iconRight?: React.ReactElement;
    children?: string;
    className?: string;
    onFocus?: React.FocusEventHandler<HTMLButtonElement>;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ view, size, pin, disabled, children, iconLeft, iconRight, className, style, onFocus, onBlur, onClick }, ref) => (
        <StyledButton
            className={className}
            style={style}
            view={view}
            size={size}
            pin={pin}
            disabled={disabled}
            isText={!!children}
            onFocus={onFocus}
            onBlur={onBlur}
            onClick={onClick}
            ref={ref}
        >
            {iconLeft}
            {children && (
                <StyledText isIconLeft={!!iconLeft} isIconRight={!!iconRight}>
                    {children}
                </StyledText>
            )}
            {iconRight}
        </StyledButton>
    ),
);
