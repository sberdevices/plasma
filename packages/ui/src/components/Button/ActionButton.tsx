import React from 'react';
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
const applySizes = ({ pin, size, focused, outlined }: SizeProps & PinProps & FocusProps) => {
    const { width, height, outline } = sizes[size];
    const radius = height / 2;
    const elemRadius = convertPinsMatrix(pin, `${radius}em`, `${radius}em`);
    const outlineRadius = convertPinsMatrix(pin, `${radius + outline}em`, `${radius + outline}em`);

    return css`
        width: ${width}em;
        height: ${height}em;
        border-radius: ${elemRadius};

        ${buttonTypography[size]};
        ${addFocus({
            focused,
            outlined,
            outlineSize: `${outline}em`,
            outlineRadius,
        })}
    `;
};

interface StyledActionButtonsProps extends SizeProps, ViewProps, PinProps, MotionProps, FocusProps, DisabledProps {}

const StyledActionButton = styled.button<StyledActionButtonsProps>`
    ${buttonBase}
    ${applyView}
    ${applySizes}
    ${applyMotion}
    ${applyDisabled}
`;

export interface ActionButtonProps
    extends PickOptional<
            StyledActionButtonsProps,
            'pin' | 'view' | 'size' | 'motion' | 'focused' | 'outlined' | 'disabled'
        >,
        React.ButtonHTMLAttributes<HTMLButtonElement> {
    style?: React.CSSProperties;
    className?: string;
    onFocus?: React.FocusEventHandler<HTMLButtonElement>;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
    children,
    view = 'secondary',
    size = 'm',
    pin = 'square-square',
    motion = true,
    outlined = true,
    ...rest
}) => {
    return (
        <StyledActionButton view={view} size={size} pin={pin} motion={motion} outlined={outlined} {...rest}>
            {children}
        </StyledActionButton>
    );
};
