import React from 'react';
import styled, { css } from 'styled-components';
import { typography, colors } from 'plasma-tokens';

const sizesToTypography = {
    l: typography.button1,
    m: typography.button1,
    s: typography.button2
};

const sizes = {
    l: css`
        height: 3.5em;
        padding: 1em 1.625em;
        border-radius: 1em;`,
    m: css`
        height: 3em;
        padding: 0.75em 1.375em;
        border-radius: 0.75em;`,
    s:  css`
        // Тут у нас жуткие дроби получаются, спрячем их
        height: ${40/14}em; // 40px@x1
        padding: ${8/14}em ${18/14}em; // (8px 18px)@x1
        border-radius: ${12/14}em; // 12px@x1
`
};

const sizesIfSquare = {
    l: css`
        width: 3.5em;
        padding-left: 1em;
        padding-right: 1em;`,
    m: css`
        width: 3em;
        padding-left: 1em;
        padding-right: 1em;`,
    s: css`
        width: ${40/14}em; // 40px@x1
        padding-left: 1em;
        padding-right: 1em;`
};

const viewToColors = {
    primary: css`
        background-color: ${colors.accent};
        color: ${colors.text};

        &:focus {
            box-shadow: 0 0 0 3px ${colors.background}, 0 0 0 6px ${colors.accent};
        }`,
    secondary: css`
        background-color: ${colors.buttonSecondary};
        color: ${colors.text};

        &:focus {
            box-shadow: 0 0 0 3px ${colors.background}, 0 0 0 6px ${colors.accent};
        }`,
    checked: css`
        background-color: ${colors.buttonChecked};
        color: ${colors.black};

        &:focus {
            box-shadow: 0 0 0 3px ${colors.background}, 0 0 0 6px ${colors.buttonChecked};
        }`,
    warning: css`
        background-color: ${colors.buttonWarning};
        color: ${colors.text};

        &:focus {
            box-shadow: 0 0 0 3px ${colors.background}, 0 0 0 6px ${colors.buttonWarning};
        }`,
    critical: css`
        background-color: ${colors.buttonCritical};
        color: ${colors.text};

        &:focus {
            box-shadow: 0 0 0 3px ${colors.background}, 0 0 0 6px ${colors.buttonCritical};
        }`,
    clear: css`
        background-color: transparent;
        color: ${colors.text};

        &:focus {
            box-shadow: 0 0 0 3px ${colors.background}, 0 0 0 6px ${colors.buttonSecondary};
        }`
};

const pins = {
    'clear-clear': css`
        border-radius: 0;`,
    'square-square': css``,
    'clear-square': css`
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;`,
    'square-clear': css`
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;`,
    'circle-circle': css`
        border-radius: 1.75em;`,
    'clear-circle': css`
        border-radius: 0 1.75em 1.75em 0;`,
    'circle-clear': css`
        border-radius: 1.75em 0 0 1.75em;`
};

export type Sizes = keyof typeof sizesToTypography;

export type Views = keyof typeof viewToColors;

export type Pins = keyof typeof pins;

interface StyledButtonProps {
    isText?: boolean;
    pin?: Pins;
    view?: Views;
    size?: Sizes;
    disabled?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
    position: relative;

    display: inline-flex;
    justify-content: center;
    align-items: center;

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

    ${({ size = 'l', isText }) => css`
        ${sizes[size]}
        ${sizesToTypography[size]}
        ${!isText && sizesIfSquare[size]}
    `}

    ${({ pin }) => pin && css`
        ${pins[pin]};
    `}

    ${({ disabled }) => disabled && css`
        opacity: 0.4;

        &:hover, &:active {
            transform: none;
        }
    `}

    &[disabled] {
        opacity: 0.4;

        &:hover, &:active {
            transform: none;
        }
    }
`;

interface StyledTextProps {
    isIconLeft?: boolean;
    isIconRight?: boolean;
}

const StyledText = styled.span<StyledTextProps>`
    ${({ isIconLeft }) => isIconLeft && css`
        margin-left: 0.25em;
    `}

    ${({ isIconRight }) => isIconRight && css`
        margin-right: 0.25em;
    `}
`;

export interface ButtonProps extends Pick<StyledButtonProps, 'pin' | 'view' | 'size' | 'disabled'>, React.HTMLAttributes<HTMLElement> {
    iconLeft?: React.ReactElement;
    iconRight?: React.ReactElement;
    children?: string;
    className?: string;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onClick?: React.MouseEventHandler<HTMLElement>;
}

export const Button: React.FC<ButtonProps> = ({
    view,
    size,
    pin,
    disabled,
    children,
    iconLeft,
    iconRight,
    className,
    style,
    onFocus,
    onBlur,
    onClick
}) => (
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
    >
        {iconLeft}
        {children && (
            <StyledText
                isIconLeft={!!iconLeft}
                isIconRight={!!iconRight}
            >
                {children}
            </StyledText>
        )}
        {iconRight}
    </StyledButton>
);
