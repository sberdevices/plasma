import React from 'react';
import styled, { css } from 'styled-components';

import { addFocus, FocusProps, OutlinedProps } from '../../mixins/addFocus';
import { applyView, ViewProps } from '../../mixins/applyView';
import { applyInteraction, InteractionProps } from '../../mixins/applyInteraction';
import { applyDisabled, DisabledProps } from '../../mixins/applyDisabled';
import { convertRoundnessMatrix, PinProps } from '../../utils';
import { PickOptional } from '../../types/PickOptional';

import { SizeProps, buttonBase, buttonTypography, fontSizeL, fontSizeM, fontSizeS } from './ButtonBase';

/**
 * Размеры в пикселях по макету
 */
const sizes = {
    l: {
        width: 36 / fontSizeL,
        height: 36 / fontSizeL,
        outline: 2 / fontSizeL,
    },
    m: {
        width: 32 / fontSizeM,
        height: 32 / fontSizeM,
        outline: 2 / fontSizeM,
    },
    s: {
        width: 28 / fontSizeS,
        height: 28 / fontSizeS,
        outline: 2 / fontSizeS,
    },
};

interface StyledActionButtonsProps
    extends SizeProps,
        PinProps,
        FocusProps,
        OutlinedProps,
        ViewProps,
        InteractionProps,
        DisabledProps {}

/**
 * Миксин размеров кнопки по параметрам
 */
const applySizes = ({ pin, size, focused, outlined }: StyledActionButtonsProps) => {
    const { width, height, outline } = sizes[size];
    const radius = height / 2;
    const elemRadius = convertRoundnessMatrix(pin, `${radius}em`, `${radius}em`);
    const outlineRadius = convertRoundnessMatrix(pin, `${radius + outline}em`, `${radius + outline}em`);

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

const StyledActionButton = styled.button<StyledActionButtonsProps>`
    ${buttonBase}
    ${applyView}
    ${applySizes}
    ${applyInteraction}
    ${applyDisabled}
`;

export interface ActionButtonProps
    extends InteractionProps,
        FocusProps,
        OutlinedProps,
        DisabledProps,
        PickOptional<StyledActionButtonsProps, 'size' | 'view' | 'pin'>,
        React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ActionButton: React.FC<ActionButtonProps> = ({
    children,
    view = 'secondary',
    size = 'm',
    pin = 'square-square',
    scaleOnInteraction = true,
    outlined = true,
    ...rest
}) => {
    return (
        <StyledActionButton
            view={view}
            size={size}
            pin={pin}
            scaleOnInteraction={scaleOnInteraction}
            outlined={outlined}
            {...rest}
        >
            {children}
        </StyledActionButton>
    );
};
