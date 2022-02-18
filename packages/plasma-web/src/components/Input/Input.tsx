import React, { FC, forwardRef } from 'react';
import styled, { css, InterpolationFunction } from 'styled-components';
import type { InputHTMLAttributes } from '@sberdevices/plasma-core';

import {
    inputTypo,
    inputLabelTypo,
    inputBackground,
    inputBackgroundHover,
    inputBackgroundFocus,
    inputColor,
    inputCaretColor,
    inputPlaceholderColor,
    inputFocusPlaceholderColor,
    inputBorder,
    inputBorderHover,
    inputBorderFocus,
    inputBorderRadius,
    inputBorderWidth,
    inputLabelColor,
    inputLabelMarginTop,
} from '../../tokens';

import { sizes, statuses } from './Input.props';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * Размер контрола.
     */
    size?: keyof typeof sizes;
    /**
     * Статус компонента: заполнен успешно / с ошибкой.
     */
    status?: keyof typeof statuses;
    /**
     * Анимированные подсказки внутри инпута. Отображается только в размере `l`.
     */
    animatedHint?: 'label' | 'placeholder';
    /**
     * Лейбл сверху. Отображается только в размере `l`.
     */
    label?: string | number;
    hasContentLeft?: boolean;
    hasContentRight?: boolean;
}

const StyledHint = styled.span`
    display: flex;
    align-items: center;
    transition: all 0.1s ease-in-out;

    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;

    color: ${inputLabelColor};
`;
const StyledLabel = styled(StyledHint)`
    ${inputTypo}

    input:focus + &,
    input:not(:placeholder-shown) + & {
        ${inputLabelTypo}
    }
`;
const StyledPlaceholder = styled(StyledHint)`
    ${inputLabelTypo}

    input:placeholder-shown + & {
        ${inputTypo}
    }

    input:focus + & {
        color: ${inputFocusPlaceholderColor};
    }
`;

interface StyledInputProps {
    $size: keyof typeof sizes;
    $status?: keyof typeof statuses;
    $hasHint?: boolean;
    $hasContentLeft?: boolean;
    $hasContentRight?: boolean;
    $animatedHint?: InputProps['animatedHint'];
}

const getPadding = (
    paddingTop: string,
    paddingBottom: string,
    paddingLeft: string,
    paddingRight: string,
    paddingY: string,
    paddingX: string,
) => {
    switch (true) {
        case paddingTop !== paddingBottom && paddingLeft !== paddingRight:
            return `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`;
        case paddingTop !== paddingBottom:
            return `${paddingTop} ${paddingX} ${paddingBottom}`;
        case paddingLeft !== paddingRight:
            return `${paddingY} ${paddingRight} ${paddingY} ${paddingLeft}`;
        default:
            return `${paddingY} ${paddingX}`;
    }
};

const applySizes: InterpolationFunction<StyledInputProps> = () => ({
    $size,
    $hasHint,
    $hasContentLeft,
    $hasContentRight,
    $animatedHint,
}) => {
    const {
        height,
        paddingY,
        paddingX,
        hasLabelPaddingTop,
        hasContentPaddingLeft,
        hasContentPaddingRight,
        hasLabelPaddingBottom,
    } = sizes[$size];
    const paddingTop = $hasHint ? hasLabelPaddingTop : paddingY;
    const paddingBottom = $hasHint ? hasLabelPaddingBottom : paddingY;
    const paddingLeft = $hasContentLeft ? hasContentPaddingLeft : paddingX;
    const paddingRight = $hasContentRight ? hasContentPaddingRight : paddingX;
    const padding = getPadding(paddingTop, paddingBottom, paddingLeft, paddingRight, paddingY, paddingX);

    return css`
        height: ${height};
        padding: ${padding};

        ${
            $animatedHint === 'placeholder' &&
            css`
                &:placeholder-shown {
                    padding-top: ${paddingY};
                    padding-bottom: ${paddingY};
                }
            `
        }

        & + ${StyledHint} {
            height: ${height};
            padding: ${paddingY} ${paddingLeft} ${paddingY} ${paddingRight};
        }

        &:focus + ${StyledLabel},
        &:not(:placeholder-shown) + ${StyledLabel},
        &:not(:placeholder-shown) + ${StyledPlaceholder} {
            height: auto;
            padding-top: ${inputLabelMarginTop};
        }
    `;
};

const StyledInput = styled.input<StyledInputProps>`
    ${applySizes}
    ${inputTypo}

    box-sizing: border-box;
    width: 100%;

    background-color: ${inputBackground};
    color: ${inputColor};
    caret-color: ${inputCaretColor};
    border: 0 none;
    border-radius: ${inputBorderRadius};
    box-shadow: inset 0 0 0 ${inputBorderWidth} ${inputBorder};

    transition: box-shadow 0.1s ease-in, background-color 0.1s ease-in, color 0.1s ease-in;

    &:hover {
        background-color: ${inputBackgroundHover};
        box-shadow: inset 0 0 0 ${inputBorderWidth} ${inputBorderHover};
    }

    &:disabled {
        box-shadow: inset 0 0 0 ${inputBorderWidth} ${inputBorder};
        cursor: inherit;
    }

    &::placeholder {
        color: ${inputPlaceholderColor};
    }

    ${({ $status }) => $status && statuses[$status]}

    &:focus,
    &:hover:focus {
        background-color: ${inputBackgroundFocus};
        box-shadow: inset 0 0 0 ${inputBorderWidth} ${inputBorderFocus};
        outline: 0 none;
    }

    &:focus::placeholder {
        color: ${inputFocusPlaceholderColor};
    }

    ${({ $animatedHint }) =>
        $animatedHint === 'placeholder' &&
        css`
            &::placeholder,
            &:focus::placeholder {
                color: transparent;
            }
        `}

    ${({ $hasHint: $hasLabel }) =>
        $hasLabel &&
        css`
            &::placeholder {
                color: transparent;
            }
        `}
`;

const InputPlaceLabel: FC<Pick<InputProps, 'animatedHint' | 'placeholder' | 'label'>> = ({
    animatedHint,
    placeholder,
    label,
}) => {
    if (animatedHint === 'placeholder' && placeholder) {
        return <StyledPlaceholder>{placeholder}</StyledPlaceholder>;
    }
    if (animatedHint === 'label' && label) {
        return <StyledLabel>{label}</StyledLabel>;
    }
    return null;
};

/**
 * Поле ввода текста без подсказки и лейбла.
 * @private
 */
// eslint-disable-next-line prefer-arrow-callback
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { size = 'l', disabled, status, placeholder, label, animatedHint, hasContentLeft, hasContentRight, ...rest },
    ref,
) {
    return (
        <>
            <StyledInput
                ref={ref}
                disabled={disabled}
                placeholder={placeholder}
                $size={size}
                $status={status}
                $hasHint={animatedHint && Boolean(label || placeholder)}
                $hasContentLeft={hasContentLeft}
                $hasContentRight={hasContentRight}
                $animatedHint={animatedHint}
                {...rest}
            />
            {size === 'l' && animatedHint && (
                <InputPlaceLabel animatedHint={animatedHint} placeholder={placeholder} label={label} />
            )}
        </>
    );
});
