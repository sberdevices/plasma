import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import { addFocus, FocusProps } from '../../mixins/addFocus';
import { applyView, ViewProps } from '../../mixins/applyView';
import { applyMotion, MotionProps } from '../../mixins/applyMotion';
import { applyDisabled, DisabledProps } from '../../mixins/applyDisabled';
import { convertPinsMatrix, PinProps } from '../../mixins/pins';
import { PickOptional } from '../../types/PickOptional';

import { SizeProps, buttonBase, buttonTypography, fontSizeL, fontSizeM, fontSizeS } from './ButtonBase';

/**
 * Размеры в пикселях по макету
 */
export const sizes = {
    l: {
        height: 56 / fontSizeL,
        paddingY: 16 / fontSizeL,
        paddingX: 26 / fontSizeL,
        squareRadius: 16 / fontSizeL,
        outline: 2 / fontSizeL,
    },
    m: {
        height: 48 / fontSizeM,
        paddingY: 12 / fontSizeM,
        paddingX: 22 / fontSizeM,
        squareRadius: 12 / fontSizeM,
        outline: 2 / fontSizeM,
    },
    s: {
        height: 40 / fontSizeS,
        paddingY: 8 / fontSizeS,
        paddingX: 18 / fontSizeS,
        squareRadius: 12 / fontSizeS,
        outline: 2 / fontSizeS,
    },
};

/**
 * Миксин размеров кнопки по параметрам
 */
const applySizes = ({ pin, size, outlined, focused, isTextOrChildren }: SizeProps & PinProps & FocusProps) => {
    const { height, paddingY, paddingX, squareRadius, outline } = sizes[size];
    const circleRadius = height / 2;
    const elemRadius = convertPinsMatrix(pin, `${squareRadius}em`, `${circleRadius}em`);
    const outlineRadius = convertPinsMatrix(pin, `${squareRadius + outline}em`, `${circleRadius + outline}em`);

    return css`
        height: ${height}em;
        padding-top: ${paddingY}em;
        padding-bottom: ${paddingY}em;
        border-radius: ${elemRadius};

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

        ${buttonTypography[size]}
        ${addFocus({
            focused,
            outlined,
            outlineSize: `${outline}em`,
            outlineRadius,
        })}
    `;
};

interface StyledButtonProps extends SizeProps, ViewProps, PinProps, MotionProps, FocusProps, DisabledProps {
    /**
     * Растянуть кнопку на всю ширину родителя (width=100%)
     */
    fullWidth?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
    ${buttonBase}
    ${applyView}
    ${applySizes}
    ${applyMotion}
    ${applyDisabled}

    ${({ fullWidth }) =>
        fullWidth &&
        css`
            width: 100%;
        `};
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
    extends PickOptional<
            StyledButtonProps,
            'fullWidth' | 'pin' | 'view' | 'size' | 'motion' | 'focused' | 'outlined' | 'disabled'
        >,
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
    style?: React.CSSProperties;
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
            outlined = true,
            ...rest
        },
        ref,
    ) => (
        <StyledButton
            view={view}
            size={size}
            pin={pin}
            motion={motion}
            outlined={outlined}
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
