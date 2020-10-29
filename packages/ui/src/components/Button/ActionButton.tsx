import React from 'react';
import styled, { css } from 'styled-components';
import { accent } from '@sberdevices/plasma-tokens';

import { applyView, View, ViewProps } from '../../mixins/applyView';
import { applyMotion, MotionProps } from '../../mixins/applyMotion';
import { applyDisabled, DisabledProps } from '../../mixins/applyDisabled';
import { convertPinsMatrix, PinProps } from '../../mixins/pins';
import { beforeFocusOutline } from '../../mixins/beforeFocusOutline';
import { PickOptional } from '../../types/PickOptional';

import { SizeProps, buttonBase, buttonTypography, fontSizeL, fontSizeM, fontSizeS } from './ButtonBase';

// Для совместимости. https://github.com/sberdevices/plasma/issues/12
export const colorsToViews = {
    active: 'primary',
    highlight: 'primary',
    blank: 'checked',
    accent: 'warning',
    index: 'secondary',
};

type CompatColor = keyof typeof colorsToViews;

/**
 * Размеры в пикселях по макету
 */
export const sizes = {
    l: {
        width: 36 / fontSizeL,
        height: 36 / fontSizeL,
        outline: 2 / fontSizeL,
    },
    m: {
        width: 28 / fontSizeM,
        height: 28 / fontSizeM,
        outline: 2 / fontSizeM,
    },
    s: {
        width: 20 / fontSizeS,
        height: 20 / fontSizeS,
        outline: 2 / fontSizeS,
    },
};

/**
 * Миксин размеров кнопки по параметрам
 */
const applySizes = ({ pin, size, focusable }: SizeProps & PinProps) => {
    const { width, height, outline } = sizes[size];
    const radius = height / 2;
    const elemRadius = convertPinsMatrix(pin, `${radius}em`, `${radius}em`);
    const outlineRadius = convertPinsMatrix(pin, `${radius + outline}em`, `${radius + outline}em`);

    return css`
        width: ${width}em;
        height: ${height}em;
        border-radius: ${elemRadius};

        ${buttonTypography[size]};
        ${focusable && beforeFocusOutline(`${outline}em`, `${outlineRadius}`, `${outline}em`, accent)};
    `;
};

interface StyledActionButtonsProps extends SizeProps, ViewProps, PinProps, MotionProps, DisabledProps {}

const StyledActionButton = styled.button<StyledActionButtonsProps>`
    ${buttonBase}
    ${applyView}
    ${applySizes}
    ${applyMotion}
    ${applyDisabled}
`;

export interface ActionButtonProps
    extends PickOptional<StyledActionButtonsProps, 'pin' | 'view' | 'size' | 'motion' | 'focusable' | 'disabled'>,
        React.ButtonHTMLAttributes<HTMLButtonElement> {
    style?: React.CSSProperties;
    className?: string;
    onFocus?: React.FocusEventHandler<HTMLButtonElement>;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    // Для совместимости. https://github.com/sberdevices/plasma/issues/12
    color?: CompatColor;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
    children,
    view,
    size = 'm',
    pin = 'square-square',
    motion = true,
    focusable = true,
    color = 'active',
    ...rest
}) => {
    return (
        <StyledActionButton
            view={view || (colorsToViews[color] as View)}
            size={size}
            pin={pin}
            motion={motion}
            focusable={focusable}
            {...rest}
        >
            {children}
        </StyledActionButton>
    );
};
