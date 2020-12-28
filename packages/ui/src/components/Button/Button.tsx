import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { scalingPixelBasis } from '@sberdevices/plasma-tokens';

import { addFocus, FocusProps } from '../../mixins/addFocus';
import { applyView, ViewProps } from '../../mixins/applyView';
import { applyMotion, MotionProps } from '../../mixins/applyMotion';
import { applyDisabled, DisabledProps } from '../../mixins/applyDisabled';
import { convertRoundnessMatrix, PinProps } from '../../utils';
import { PickOptional, ShiftProps } from '../../types';

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

interface StyledButtonProps extends SizeProps, ViewProps, PinProps, MotionProps, FocusProps, DisabledProps, ShiftProps {
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
            margin-left: ${iconMargin};
        `}

    ${({ isContentRight }) =>
        isContentRight &&
        css`
            margin-right: ${iconMargin};
        `}
`;

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        PickOptional<StyledButtonProps, 'fullWidth' | 'size' | 'view' | 'pin'>,
        MotionProps,
        FocusProps,
        DisabledProps,
        ShiftProps {
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
    /**
     * Сменить рендер на другой тип компонента
     */
    as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    // eslint-disable-next-line prefer-arrow-callback
    function Button(
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
    ) {
        return (
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
        );
    },
);
