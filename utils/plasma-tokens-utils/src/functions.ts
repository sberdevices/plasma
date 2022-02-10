import Color from 'color';

import type { TypographStyle } from './types';
import { escapeValue, getCSSVariableName } from './utils';

/**
 * Convert color to hex or rgba for alpha channel
 *
 * @param clr color string to convert
 */
export const humanizeColor = (clr: string) => {
    const color = Color(clr);
    const hue = Number(color.hue().toPrecision(3));
    const saturatione = Number(color.saturationl().toPrecision(3));
    const lightness = Number(color.lightness().toPrecision(3));
    const alpha = Number(color.alpha().toPrecision(3));
    const hslColor = Color.hsl(hue, saturatione, lightness, alpha);

    if (alpha === 1) {
        return hslColor.hex().toString();
    }
    return hslColor.rgb().toString();
};

/**
 * Осветлить/затемнить на x процентных пунктов.
 */
export const lightenColor = (color: string, value: number) => {
    const hsl = Color(color).hsl();
    const res = hsl.lightness(hsl.lightness() + value);

    if (res.alpha() === 1) {
        return res.hex().toString();
    }
    return res.rgb().toString();
};

/**
 * Изменить непрозрачность цвета на x.
 */
export const alphenColor = (color: string, value: number) => {
    const rgb = Color(color).rgb();
    return humanizeColor(rgb.alpha(rgb.alpha() + value).toString());
};

/**
 * Переведет пиксели в ремы.
 * @param {string} value
 * @param {number} basis По-умолчанию взято 16, потому что предполагается скалирование
 * на уровне тега html, кратное 16.
 * @return {string}
 */
const toRem = (value: string | number, basis = 16): string => {
    if (typeof value === 'string') {
        value = parseInt(value.replace(/\D+$/, ''), 10);
    }
    return `${value / basis}rem`;
};

/**
 * Преобразует название и значение токена в CSS Var.
 * @param {string} name
 * @param {string|number} value
 * @return {string}
 */
export const toCSSVarTokenWithValue = (name: string, value: string | number) =>
    value ? `var(${getCSSVariableName(name)}, ${escapeValue(value)})` : `var(${getCSSVariableName(name)})`;

// ToDo: перенести в новый пакет, plasma-utils, где шарится код между всеми компонентами, токенами, утилитами
export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

/**
 * Конвертация значений fontSize и lineHeight из пикселей в ремы.
 * @param {TypographStyle} style
 * @return {TypographStyle}
 */
export const convertPixelsToRems = (style: TypographStyle) => {
    if (style.fontSize.indexOf('px') !== -1) {
        style.fontSize = toRem(style.fontSize);
    }
    if (style.lineHeight && style.lineHeight.indexOf('px') !== -1) {
        style.lineHeight = toRem(style.lineHeight);
    }
    return style;
};

/**
 * Композиция функций.
 */
export const compose = (...fns: Array<(s: TypographStyle) => TypographStyle>) =>
    fns.reduceRight(
        (prevFn, nextFn) => (...args) => nextFn(prevFn(...args)),
        (value) => value,
    );
