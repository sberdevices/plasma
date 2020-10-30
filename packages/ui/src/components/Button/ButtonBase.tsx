import { css } from 'styled-components';
import { typography } from '@sberdevices/plasma-tokens';

/**
 * Размерные параметры шрифта
 */
export const buttonTypography = {
    l: typography.button1,
    m: typography.button1,
    s: typography.button2,
};

export const fontSizeL = 16;
export const fontSizeM = 16;
export const fontSizeS = 14;

export type ButtonSize = keyof typeof buttonTypography;
export interface SizeProps {
    /**
     * Размер кнопки
     */
    size: ButtonSize;
    isTextOrChildren?: boolean;
}

/**
 * Базовый миксин кнопки
 */
export const buttonBase = () => css`
    position: relative;

    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;

    appearance: none;
    border: none;

    &:focus {
        outline: none;
    }
`;
