import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { scalingPixelBasis } from '@sberdevices/plasma-tokens';
import { addFocus, applyView, applyDisabled } from '@sberdevices/plasma-core/mixins';
import type { FocusProps, OutlinedProps, ViewProps, DisabledProps } from '@sberdevices/plasma-core/mixins';
import { convertRoundnessMatrix } from '@sberdevices/plasma-core/utils';
import type { PinProps } from '@sberdevices/plasma-core/utils';
import type { PickOptional, ShiftProps, AsProps } from '@sberdevices/plasma-core/types';

import { applyInteraction } from '../../mixins';
import type { InteractionProps } from '../../mixins';

import { SizeProps, buttonBase, buttonTypography, fontSizeL, fontSizeM, fontSizeS } from './ButtonBase';

/**
 * Размеры в ремах
 */
const iconMargin = `${6 / scalingPixelBasis}rem`;

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

interface StyledButtonProps
    extends SizeProps,
        ViewProps,
        PinProps,
        InteractionProps,
        FocusProps,
        OutlinedProps,
        DisabledProps,
        ShiftProps {
    /**
     * Растянуть кнопку на всю ширину родителя (width=100%)
     */
    fullWidth?: boolean;
}

/**
 * Миксин размеров кнопки по параметрам
 */
const applySizes = ({ pin, size, outlined, focused, shiftLeft, shiftRight, isTextOrChildren }: StyledButtonProps) => {
    const { height, paddingY, paddingX: paddingXWithText, squareRadius, outline } = sizes[size];
    const circleRadius = height / 2;
    const elemRadius = convertRoundnessMatrix(pin, `${squareRadius}em`, `${circleRadius}em`);
    const outlineRadius = convertRoundnessMatrix(pin, `${squareRadius + outline}em`, `${circleRadius + outline}em`);
    const paddingX = isTextOrChildren ? paddingXWithText : paddingY;

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

        ${shiftLeft &&
        css`
            margin-left: -${paddingX}em;
        `};

        ${shiftRight &&
        css`
            margin-right: -${paddingX}em;
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

const StyledButton = styled.button<StyledButtonProps>`
    ${buttonBase}
    ${applyView}
    ${applySizes}
    ${applyInteraction}
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
            margin-left: ${iconMargin};
        `}

    ${({ isContentRight }) =>
        isContentRight &&
        css`
            margin-right: ${iconMargin};
        `}
`;

/**
 * С текстом и/или контентом слева.
 */
interface TextAndLeftProps {
    /**
     * Текстовая надпись на кнопке
     */
    text: string | number;
    /**
     * Кастомный контент кнопки. При указании этого свойства contentLeft, contentRight и text не применяются
     */
    children?: never;
    /**
     * Слот для контента слева
     */
    contentLeft?: React.ReactNode;
}
/**
 * С текстом и/или контентом справа.
 */
interface TextAndRightProps {
    text: string | number;
    children?: never;
    /**
     * Слот для контента справа
     */
    contentRight?: React.ReactNode;
}
/**
 * С контентом слева.
 */
interface LeftProps {
    children?: never;
    contentLeft: React.ReactNode;
}
/**
 * Через ``children``.
 */
interface ChildrenProps {
    children: React.ReactNode;
}
/**
 * Для внутреннего использования.
 */
interface AllContentProps
    extends TextAndLeftProps,
        Pick<TextAndRightProps, 'contentRight'>,
        Pick<TextAndRightProps, 'children'> {}

export type ButtonProps = PickOptional<StyledButtonProps, 'fullWidth' | 'size' | 'view' | 'pin'> &
    (TextAndLeftProps | TextAndRightProps | LeftProps | ChildrenProps) &
    InteractionProps &
    FocusProps &
    OutlinedProps &
    DisabledProps &
    ShiftProps &
    AsProps &
    React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Основной компонент для создания кнопок.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    // eslint-disable-next-line prefer-arrow-callback
    function Button(
        { view = 'secondary', size = 'l', pin = 'square-square', scaleOnInteraction = true, outlined = true, ...props },
        ref,
    ) {
        const { text, contentLeft, contentRight, children, ...rest } = props as AllContentProps;

        return (
            <StyledButton
                view={view}
                size={size}
                pin={pin}
                scaleOnInteraction={scaleOnInteraction}
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
        );
    },
);
