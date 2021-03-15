import React from 'react';
import styled, { css } from 'styled-components';

import { addFocus } from '../../mixins/addFocus';
import type { FocusProps, OutlinedProps, OutlineProps } from '../../mixins/addFocus';
import { applyDisabled } from '../../mixins/applyDisabled';
import type { DisabledProps } from '../../mixins/applyDisabled';
import { views as baseViews } from '../../mixins/applyView';
import { button1, button2 } from '../../tokens';
import type { AsProps, ShiftProps } from '../../types';
import { convertRoundnessMatrix } from '../../utils';
import type { PinProps } from '../../utils';

/**
 * Размерные параметры шрифта
 */
const buttonTypography = {
    l: button1,
    m: button1,
    s: button2,
};

/**
 * Размеры.
 */
const buttonSizes = {
    l: {
        height: '3.5rem',
        paddingY: '1rem',
        paddingX: '1.625rem',
        paddingXResizible: '1.25rem',
    },
    m: {
        height: '3rem',
        paddingY: '0.75rem',
        paddingX: '1.375rem',
        paddingXResizible: '1.25rem',
    },
    s: {
        height: '2.5rem',
        paddingY: '0.5rem',
        paddingX: '1.125rem',
        paddingXResizible: '1.25rem',
    },
};

/**
 * Скругления.
 */
const buttonRadiuses = {
    l: {
        squareRadius: '1rem',
        sOutlineRadius: '1.125rem',
        circleRadius: '1.75rem',
        cOutlineRadius: '1.875rem',
    },
    m: {
        squareRadius: '0.75rem',
        sOutlineRadius: '0.875rem',
        circleRadius: '1.5rem',
        cOutlineRadius: '1.625rem',
    },
    s: {
        squareRadius: '0.75rem',
        sOutlineRadius: '0.875rem',
        circleRadius: '1.25rem',
        cOutlineRadius: '1.375rem',
    },
};

/**
 * Размеры кнопки
 */
interface SizeProps {
    /**
     * Размер кнопки
     */
    size: keyof typeof buttonSizes;
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
    primary: baseViews.primary,
    secondary: baseViews.secondary,
    warning: baseViews.warning,
    critical: baseViews.critical,
    checked: baseViews.checked,
    overlay: baseViews.overlay,
    clear: baseViews.clear,
};

/**
 * Виды кнопки
 */
interface ViewProps {
    /**
     * Вид кнопки
     */
    view: keyof typeof buttonViews;
}

/**
 * Интерфейс для обхода контентных опций
 */
export type ButtonContentProps =
    | {
          /**
           * Контент кнопки. При указании этого свойства contentLeft, contentRight и text не применяются
           */
          children?: React.ReactNode;
          /**
           * Текстовая надпись на кнопке
           */
          text?: never;
          /**
           * Слот для контента слева, например Icon
           */
          contentLeft?: never;
          /**
           * Слот для контента справа, например Icon
           */
          contentRight?: never;
      }
    | {
          children?: never;
          text?: string | number;
          contentLeft?: React.ReactNode;
          contentRight?: never;
      }
    | {
          children?: never;
          text?: string | number;
          contentRight?: React.ReactNode;
          contentLeft?: never;
      };

/**
 * Интерфейс для стилизованного компонента, не включая контентных свойств
 */
export interface StyledButtonProps
    extends SizeProps,
        ViewProps,
        PinProps,
        FocusProps,
        OutlinedProps,
        ShiftProps,
        DisabledProps {}

/**
 * Интерфейс кнопки.
 */
export type ButtonProps = Partial<StyledButtonProps> &
    AsProps &
    (JSX.IntrinsicElements['button'] & Omit<JSX.IntrinsicElements['a'], 'type'> & JSX.IntrinsicElements['span']) &
    ButtonContentProps;

/**
 * Миксин размеров кнопки по параметрам
 */
export const getSizesMixin = (sizes: any, typography: any) => ({
    size,
    shiftLeft,
    shiftRight,
    square,
    resizible,
}: StyledButtonProps) => {
    // eslint-disable-next-line no-nested-ternary
    const paddingX = square ? sizes[size].paddingY : resizible ? sizes[size].paddingXResizible : sizes[size].paddingX;
    const padding = `${sizes[size].paddingY} ${paddingX}`;

    return css`
        height: ${sizes[size].height};
        padding: ${padding};

        ${resizible && 'width: 100%;'}
        ${square && ` width: ${sizes[size].height};`}
        ${shiftLeft && `margin-left: -${paddingX};`}
        ${shiftRight && `margin-right: -${paddingX};`}
        ${typography[size]}
    `;
};
const applySizes = getSizesMixin(buttonSizes, buttonTypography);

/**
 * Миксин для скругления кнопки.
 */
export const getRadiusesMixin = (radiuses: any) => ({ size, pin, outlined, focused }: StyledButtonProps) => css`
    border-radius: ${convertRoundnessMatrix(pin, radiuses[size].squareRadius, radiuses[size].circleRadius)};

    ${addFocus({
        focused,
        outlined,
        outlineRadius: convertRoundnessMatrix(pin, radiuses[size].sOutlineRadius, radiuses[size].cOutlineRadius),
    } as FocusProps & OutlinedProps & OutlineProps)}
`;
const applyRadiuses = getRadiusesMixin(buttonRadiuses);

/**
 * Миксин внешнего вида.
 */
const applyViews = ({ view }: StyledButtonProps) => buttonViews[view];

export const ButtonText = styled.span<{
    isContentLeft?: boolean;
    isContentRight?: boolean;
}>`
    box-sizing: border-box;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    user-select: no-select;

    ${({ isContentLeft }) => isContentLeft && 'margin-left: 0.375rem;'}
    ${({ isContentRight }) => isContentRight && 'margin-right: 0.375rem;'}
`;

export const Button = styled.button<StyledButtonProps>`
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

    ${applySizes}
    ${applyRadiuses}
    ${applyViews}
    ${applyDisabled}
`;

export type AsElement = HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement;
