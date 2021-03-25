import React from 'react';
import styled, { css } from 'styled-components';

import { views, applyView, applyDisabled, addFocus, applyBlur } from '../../mixins';
import { button1, button2, caption } from '../../tokens';
import { convertRoundnessMatrix } from '../../utils';
import type { DisabledProps, FocusProps, OutlinedProps, BlurProps } from '../../mixins';
import type { ShiftProps, AsProps } from '../../types';
import type { PinProps } from '../../utils';

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
const sizes = {
    l: {
        height: '3.5rem',
        paddingY: '1rem',
        paddingX: '1.625rem',
        paddingXContent: '1.625rem',
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
        paddingXContent: '1.5rem',
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
        paddingXContent: '1.25rem',
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
        paddingXContent: '0.625rem',
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
        paddingXContent: '0.5rem',
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
        paddingXContent: '0.375rem',
        paddingXResizible: '0.875rem',
        squareRadius: '0.5rem',
        sOutlineRadius: '0.625rem',
        circleRadius: '0.875rem',
        cOutlineRadius: '1rem',
    },
};

/**
 * Размеры кнопки
 */
export interface SizeProps<S = keyof typeof sizes> {
    /**
     * Размер кнопки
     */
    size: S;
}

interface FlowProps {
    /**
     * Квадратная кнопка (со сторанами 1:1)
     */
    square?: boolean;
    /**
     * Растягиваемость кнопки
     */
    resizible?: boolean;
}

/**
 * Цветовые стили
 */
export const buttonViews = {
    primary: views.primary,
    secondary: views.secondary,
    warning: views.warning,
    critical: views.critical,
    checked: views.checked,
    overlay: views.overlay,
    clear: views.clear,
};

/**
 * Виды кнопки
 */
export interface ViewProps<V = keyof typeof buttonViews> {
    /**
     * Вид кнопки
     */
    view: V;
}

export type ButtonContentProps =
    /**
     * С текстом и/или контентом слева.
     */
    | {
          /**
           * Текстовая надпись на кнопке
           */
          text?: React.ReactNode;
          /**
           * Слот для контента слева, например `Icon`
           */
          contentLeft?: React.ReactNode;
          /**
           * Слот для контента справа, например `Icon`
           */
          contentRight?: never;
          /**
           * Кастомный контент кнопки.
           * При указании этого свойства `contentLeft`, `contentRight` и `text` не применяются.
           */
          children?: never;
      }
    /**
     * С текстом и/или контентом справа.
     */
    | {
          text?: React.ReactNode;
          contentLeft?: never;
          contentRight?: React.ReactNode;
          children?: never;
      }
    /**
     * Через ``children``.
     */
    | {
          text?: never;
          contentLeft?: never;
          contentRight?: never;
          children?: React.ReactNode;
      };

/**
 * Интерфейс для обхода контентных опций
 */
interface AllContentProps {
    text?: React.ReactNode;
    contentLeft?: React.ReactNode;
    contentRight?: React.ReactNode;
    children?: React.ReactNode;
}

interface IsContentProps {
    isContentLeft?: boolean;
    isContentRight?: boolean;
}

/**
 * Интерфейс для стилизованного компонента, не включая контентных
 */
interface StyledButtonProps
    extends ViewProps,
        SizeProps,
        PinProps,
        FlowProps,
        FocusProps,
        OutlinedProps,
        DisabledProps,
        ShiftProps,
        BlurProps,
        IsContentProps {}

/**
 * Интерфейс кнопки.
 */
export interface ButtonProps
    extends Partial<PinProps>,
        FlowProps,
        FocusProps,
        OutlinedProps,
        DisabledProps,
        ShiftProps,
        BlurProps,
        AsProps,
        Omit<React.AnchorHTMLAttributes<HTMLElement>, 'type'>,
        React.ButtonHTMLAttributes<HTMLElement> {}

const StyledText = styled.span<IsContentProps>`
    box-sizing: border-box;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

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
    isContentLeft,
    isContentRight,
    shiftLeft,
    shiftRight,
    square,
    resizible,
}: StyledButtonProps) => {
    let { paddingX } = sizes[size];

    if (square) {
        paddingX = sizes[size].paddingY;
    } else if (resizible) {
        paddingX = sizes[size].paddingXResizible;
    } else if (isContentLeft || isContentRight) {
        paddingX = sizes[size].paddingXContent;
    }

    return css`
        height: ${sizes[size].height};
        padding: ${sizes[size].paddingY} ${paddingX};
        border-radius: ${convertRoundnessMatrix(pin, sizes[size].squareRadius, sizes[size].circleRadius)};

        ${resizible && 'width: 100%;'}
        ${square && ` width: ${sizes[size].height};`}
        ${shiftLeft && `margin-left: -${paddingX};`}
        ${shiftRight && `margin-right: -${paddingX};`}
        ${buttonTypography[size]}
        ${addFocus({
            focused,
            outlined,
            outlineRadius: convertRoundnessMatrix(pin, sizes[size].sOutlineRadius, sizes[size].cOutlineRadius),
        })}
    `;
};

const StyledButton = styled.button<StyledButtonProps>`
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
    ${applyBlur}
`;

/**
 * Базовая кнопка.
 */
export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement, ButtonProps>(
    // eslint-disable-next-line prefer-arrow-callback
    function Button({ square, ...props }, ref) {
        const { text, contentLeft, contentRight, children, ...rest } = props as StyledButtonProps & AllContentProps;
        const isContentLeft = Boolean(contentLeft);
        const isContentRight = Boolean(contentRight);

        return (
            <StyledButton
                isContentLeft={isContentLeft}
                isContentRight={isContentRight}
                square={square !== undefined ? square : !text && !children}
                ref={ref as React.MutableRefObject<HTMLButtonElement>}
                {...rest}
            >
                {children}
                {!children && contentLeft}
                {!children && text && (
                    <StyledText isContentLeft={isContentLeft} isContentRight={isContentRight}>
                        {text}
                    </StyledText>
                )}
                {!children && contentRight}
            </StyledButton>
        );
    },
);

Button.defaultProps = {
    pin: 'square-square',
    outlined: false,
};
