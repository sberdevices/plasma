import Color from 'color';
import { css } from '@theme-ui/css';

import { HTML_FONT_SIZE } from './generation';
import type { TypographStyle, TokenGroup, TypoStyles, TypoSystem, ThemeCSSObject } from './types';

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
 * В строковых значениях токенов встречаются нежелательные символы,
 * их нужно очищать перед размещением в CSS Var или JSON.
 * @param {string|number} value
 * @return {string|number}
 */
export const escapeValue = <T = string | number>(value: T) => {
    if (typeof value === 'string') {
        return value.replace(/\s+/g, ' ');
    }
    return value;
};
const toVarName = (key: string) => `--plasma-${key}`;

/**
 * Преобразует название и значение токена в CSS Var.
 * @param {string} name
 * @param {string|number} value
 * @return {string}
 */
export const toCSSVarTokenWithValue = (name: string, value: string | number) =>
    value ? `var(${toVarName(name)}, ${escapeValue(value)})` : `var(${toVarName(name)})`;

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

const join = (...args: (string | undefined)[]) => args.filter(Boolean).join('-');

/**
 * Преобразовать объект токенов в плоский объект,
 * где ключом выступает название CSS переменной, значением - значение переменной.
 * @param {string} namespace
 * @param {object} obj
 * @return {object}
 */
const objectToCSSVars = (namespace: string, obj: Record<string, any>) => {
    let vars: Record<string, string | number> = {};
    for (const key in obj) {
        if (key !== 'modes' && key !== 'comment') {
            const name = join(namespace, key);
            const value = obj[key];

            if (value && typeof value === 'object') {
                vars = {
                    ...vars,
                    ...objectToCSSVars(name, value),
                };
            } else {
                vars[toVarName(name)] = escapeValue(value);
            }
        }
    }
    return vars;
};

export const createThemeStyles = (theme: object) => {
    return css({
        ':root': {
            ...objectToCSSVars('colors', theme),
            color: 'text',
            bg: 'background',
        },
    })({ colors: theme }) as {};
};
/* eslint-disable @typescript-eslint/ban-ts-ignore */
export const createTypoStyles = <TK extends string>(typoSystem: TypoSystem<TK>, typoScale = 1): ThemeCSSObject => {
    const typoText = Object.entries(typoSystem.text).reduce((textAcc, [text, styles]) => {
        // @ts-ignore
        styles = Object.entries(styles).reduce((stylesAcc, [key, prop]) => {
            if (
                key === 'fontFamily' ||
                key === 'fontSize' ||
                key === 'fontStyle' ||
                key === 'fontWeight' ||
                key === 'letterSpacing' ||
                key === 'lineHeight'
            ) {
                // @ts-ignore
                stylesAcc[key] = prop;
            }

            return stylesAcc;
        }, {} as typeof styles);

        // @ts-ignore
        textAcc[text as keyof TypoStyles<TK>] = styles;

        return textAcc;
    }, {} as TypoStyles<TK>);

    return css({
        ':root': {
            'font-size': `${HTML_FONT_SIZE * typoScale}px`,
            ...objectToCSSVars('typo', typoText),
        },
    })();
};
/* eslint-enable @typescript-eslint/ban-ts-ignore */

export const flattenTokenData = <T extends TokenGroup = TokenGroup>(theme: T) => {
    return Object.entries(theme).reduce((acc, [key, token]) => {
        acc[key as keyof T] = token.value;
        return acc;
    }, {} as { [key in keyof T]: T[key]['value'] });
};
