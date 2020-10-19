import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { typography, colors } from 'plasma-tokens';

import { Icon, IconName } from '../Icon/Icon';
import type { PickOptional } from '../../types/PickOptional';

// В этих константах задаем размеры в em, чтобы не зависеть напрямую от пикселей
// В то же время в числителях - значения в пикселях, взятые из макета
const fontSize = 16;
const rootHeight = 36 / fontSize;
const rootBorderWidth = 1 / fontSize;
const rootBorderRadius = 2;
const inputPaddingY = 8 / fontSize - rootBorderWidth;
const inputPaddingX = 1 - rootBorderWidth;
const inputPaddingCompactX = 12 / fontSize;

interface StyledRootProps {
    disabled?: boolean;
    isIcon?: boolean;
}

export const StyledRoot = styled.label<StyledRootProps>`
    width: 100%;
    height: ${rootHeight}em;

    display: flex;
    align-items: center;
    box-sizing: border-box;

    background: ${colors.surfaceLiquid03};
    border: ${rootBorderWidth}em solid transparent;
    border-radius: ${rootBorderRadius}em;
    color: ${colors.whiteSecondary};

    ${typography.body1};

    ${({ isIcon }) =>
        isIcon &&
        css`
            padding-right: ${inputPaddingCompactX}em;
        `}

    ${({ disabled }) =>
        disabled &&
        css`
            background: none;
            border-color: ${colors.surfaceLiquid03};
        `}
`;

const StyledResetButton = styled.button`
    appearance: none;
    background: none;
    border: 0 none;

    &:focus {
        outline: none;
    }
`;

const StyledIcon = styled(Icon)`
    opacity: 0.5;
`;

interface StyledInputProps {
    isIcon?: boolean;
}

export const StyledInput = styled.input<StyledInputProps>`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: ${inputPaddingY}em ${inputPaddingX}em;

    appearance: none;
    background: none;
    border: 0 none;
    color: inherit;

    font: inherit;
    letter-spacing: inherit;

    transition: color 0.1s ease-in-out;

    &:focus {
        color: ${colors.whitePrimary};
        outline: none;
    }

    &:disabled {
        color: ${colors.whiteTertiary};
    }

    &::placeholder {
        color: ${colors.whiteTertiary};
    }

    ${({ isIcon }) =>
        isIcon &&
        css`
            padding-right: ${inputPaddingCompactX}em;
        `}
`;

type InputAttributes = PickOptional<HTMLInputElement, 'type' | 'name' | 'value' | 'disabled' | 'placeholder'>;
type InputHandlers = PickOptional<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onFocus' | 'onBlur'>;

export interface InputProps extends InputAttributes, InputHandlers {
    /**
     * Название иконки.
     */
    iconName?: IconName;
    /**
     * Обработчик клика по кнопке сброса.
     */
    onResetClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ value, disabled, iconName, onResetClick, ...rest }, ref) => {
        return (
            <StyledRoot disabled={disabled} isIcon={!!iconName || !!value}>
                <StyledInput ref={ref} value={value} disabled={disabled} isIcon={!!value} {...rest} />
                {value && !iconName && !disabled && (
                    <StyledResetButton onClick={onResetClick}>
                        <StyledIcon icon="remove" size="s" />
                    </StyledResetButton>
                )}
                {iconName && <StyledIcon icon={iconName} size="m" />}
            </StyledRoot>
        );
    },
);
