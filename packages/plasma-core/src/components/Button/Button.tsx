import React from 'react';
import styled, { css } from 'styled-components';

import { views, applyView, applyDisabled, addFocus } from '../../mixins';
import { button1, button2, caption } from '../../tokens';
import { convertRoundnessMatrix } from '../../utils';

import type {
    WithTextAndContentLeft,
    WithTextAndContentRight,
    WithContentLeft,
    WithChildren,
    AllContentProps,
    StyledButtonProps,
} from './Button.types';

/**
 * Размерные параметры шрифта
 */
const buttonTypography = {
    l: button1,
    m: button1,
    s: button2,
    xs: button2,
    xxs: caption,
    xxxs: caption,
};

/**
 * Размеры в пикселях по макету
 */
const buttonSizes = {
    l: {
        height: '3.5rem',
        paddingY: '1rem',
        paddingX: '1.625rem',
        paddingXResizible: '1.25rem',
        squareRadius: '1rem',
        sOutlineRadius: '1.125rem',
        circleRadius: '1.75rem',
        cOutlineRadius: '1.875rem',
    },
    m: {
        height: '3rem',
        paddingY: '0.75rem',
        paddingX: '1.375rem',
        paddingXResizible: '1.25rem',
        squareRadius: '0.75rem',
        sOutlineRadius: '0.875rem',
        circleRadius: '1.5rem',
        cOutlineRadius: '1.625rem',
    },
    s: {
        height: '2.5rem',
        paddingY: '0.5rem',
        paddingX: '1.125rem',
        paddingXResizible: '1.25rem',
        squareRadius: '0.75rem',
        sOutlineRadius: '0.875rem',
        circleRadius: '1.25rem',
        cOutlineRadius: '1.375rem',
    },
    xs: {
        height: '2.25rem',
        paddingY: '0.5rem',
        paddingX: '0.625rem',
        paddingXResizible: '1.25',
        squareRadius: '0.625rem',
        sOutlineRadius: '0.75rem',
        circleRadius: '1.125rem',
        cOutlineRadius: '1.25rem',
    },
    xxs: {
        height: '2rem',
        paddingY: '0.4375rem',
        paddingX: '0.5rem',
        paddingXResizible: '0.875rem',
        squareRadius: '0.5625rem',
        sOutlineRadius: '0.6875rem',
        circleRadius: '1rem',
        cOutlineRadius: '1.125rem',
    },
    xxxs: {
        height: '1.75rem',
        paddingY: '0.3125rem',
        paddingX: '0.375rem',
        paddingXResizible: '0.875rem',
        squareRadius: '0.5rem',
        sOutlineRadius: '0.625rem',
        circleRadius: '0.875rem',
        cOutlineRadius: '1rem',
    },
};

type ButtonSize = keyof typeof buttonSizes;

/**
 * Цветовые стили
 */
export const buttonViews = {
    primary: views.primary,
    secondary: views.secondary,
    warning: views.warning,
    critical: views.critical,
    checked: views.checked,
    clear: views.clear,
};

type ButtonView = keyof typeof buttonViews;

/**
 * Интерфейс кнопки.
 */
export type ButtonProps<S = ButtonSize, V = ButtonView> = (
    | WithTextAndContentLeft
    | WithTextAndContentRight
    | WithContentLeft
    | WithChildren
) &
    Partial<StyledButtonProps<S, V>> &
    React.ButtonHTMLAttributes<HTMLButtonElement>;

interface StyledTextProps {
    isContentLeft?: boolean;
    isContentRight?: boolean;
}

const StyledText = styled.span<StyledTextProps>`
    box-sizing: border-box;

    ${({ isContentLeft }) => isContentLeft && 'margin-left: 0.375rem;'}
    ${({ isContentRight }) => isContentRight && 'margin-right: 0.375rem;'}
`;

/**
 * Миксин размеров кнопки по параметрам
 */
const applySizes = ({
    size,
    pin,
    outlined,
    focused,
    shiftLeft,
    shiftRight,
    square,
    resizible,
}: StyledButtonProps<ButtonSize, ButtonView>) => {
    const sizes = buttonSizes[size];
    // eslint-disable-next-line no-nested-ternary
    const paddingX = square ? sizes.paddingY : resizible ? sizes.paddingXResizible : sizes.paddingX;
    const padding = `${sizes.paddingY} ${paddingX}`;

    return css`
        height: ${sizes.height};
        padding: ${padding};
        border-radius: ${convertRoundnessMatrix(pin, sizes.squareRadius, sizes.circleRadius)};

        ${resizible && 'width: 100%;'}
        ${square && ` width: ${sizes.height};`}
        ${shiftLeft && `margin-left: -${paddingX};`}
        ${shiftRight && `margin-right: -${paddingX};`}
        ${buttonTypography[size]}
        ${addFocus({
            focused,
            outlined,
            outlineRadius: convertRoundnessMatrix(pin, sizes.sOutlineRadius, sizes.cOutlineRadius),
        })}
    `;
};

const StyledButton = styled.button<StyledButtonProps<ButtonSize, ButtonView>>`
    position: relative;

    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;

    appearance: none;
    border: none;
    cursor: pointer;

    &:focus {
        outline: none;
    }

    ${applyView}
    ${applySizes}
    ${applyDisabled}
`;

/**
 * Базовая кнопка.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    // eslint-disable-next-line prefer-arrow-callback
    function Button({ square, ...props }, ref) {
        const { text, contentLeft, contentRight, children, ...rest } = props as AllContentProps;

        return (
            <StyledButton
                square={square !== undefined ? square : !text && !children}
                ref={ref}
                {...(rest as StyledButtonProps<ButtonSize, ButtonView>)}
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

Button.defaultProps = {
    view: 'secondary',
    size: 'l',
    pin: 'square-square',
};
