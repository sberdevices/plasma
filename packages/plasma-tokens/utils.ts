import Color from 'color';
import * as CSS from 'csstype';
import { css } from '@theme-ui/css'
// import { serializeStyles } from '@emotion/serialize';
import { ThemeTokens, TokenGroup } from './generate';


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

    const humanizeColor = Color.hsl(hue, saturatione, lightness, alpha);
    if (alpha === 1) {
        return humanizeColor.hex().toString();
    } else {
        return humanizeColor.rgb().toString();
    }
}

// export const toLGRgba = (linearGradient: string) => {
//     return linearGradient.replace(/hsla\([^)]*\)/g, humanizeColor);
// }


export type TypographStyle = {
    color?: string,
    fontSize: string,
    fontFamily: string,
    fontWeight: number,
    fontStyle?: string,
    lineHeight?: string,
    letterSpacing: string | number,
    textAlign?: CSS.Properties['textAlign'],
    textDecoration?: string,
    textTransform?: CSS.Properties['textTransform'],
};

export const normalizeLetterSpace = (style: TypographStyle) => {
    const fontSize = parseInt(String(style.fontSize));
    const letterSpacing = parseFloat(String(style.letterSpacing));

    if (letterSpacing === 0) {
        style.letterSpacing = 'normal';
    } else {
        const letterSpacingInEm = (letterSpacing / fontSize).toPrecision(3);
        style.letterSpacing= `${letterSpacingInEm}em`;
    }

    return style;
};

export const removeUnnecessary = (style: TypographStyle) => {
    delete style.color;
    delete style.textAlign;
    delete style.textDecoration;
    if (!style.fontStyle) {
        style.fontStyle = 'normal';
    }

    return style;
};

export enum FontType {
    Regular = 'Regular',
    Medium = 'Medium',
    Semibold = 'Semibold',
    Bold = 'Bold',
    Unwnown = 'Unwnown'
};

export enum FontTypeWeight {
    Regular = 400,
    Medium = 500,
    Semibold = 600,
    Bold = 700,
};

export const matchFont = (style: TypographStyle) => {
    const { fontFamily, fontWeight } = style;
    if (fontFamily.includes('Regular') || fontWeight === FontTypeWeight.Regular) {
        return FontType.Regular;
    }
    if (fontFamily.includes('Medium') || fontWeight === FontTypeWeight.Medium) {
        return FontType.Medium;
    }
    if (fontFamily.includes('Semibold') || fontWeight === FontTypeWeight.Semibold) {
        return FontType.Semibold;
    }
    if (fontFamily.includes('Bold') || fontWeight === FontTypeWeight.Bold) {
        return FontType.Bold;
    }

    return FontType.Unwnown;
}

export const normalizeFontWeight = (style: TypographStyle) => {
    const type = matchFont(style);

    switch (type) {
        case FontType.Regular:
            style.fontWeight = FontTypeWeight.Regular;
            return style
        case FontType.Medium:
            style.fontWeight = FontTypeWeight.Medium;
            return style;
        case FontType.Semibold:
            style.fontWeight = FontTypeWeight.Semibold;
            return style;
        case FontType.Bold:
            style.fontWeight = FontTypeWeight.Bold;
            return style;
    }

    return style;
};


export const scaleTypograpyForDevices = (style: TypographStyle) => {
    const fontSize = parseInt(String(style.fontSize));
    const lineHeight = parseInt(String(style.lineHeight || style.fontSize));

    style.fontSize = `${fontSize * 2}px`;
    style.lineHeight = `${lineHeight * 2}px`;

    return style;
};

export const normalizeFontNames = (style: TypographStyle) => {
    const type = matchFont(style);
    if (type === FontType.Unwnown) {
        return style;
    }
    // TODO: sync this with "services/shared-static"
    style.fontFamily = style.fontFamily.replace(`SBSansText-${type}`, 'SB Sans Text');

    return style;
};

export const normalizeTypographyStyle = (style: TypographStyle) => {
    // right to left: first we transform "LetterSpace" only then we scale "fontSize"
    return _c(
        normalizeFontNames,
        removeUnnecessary,
        // scaleTypograpyForDevices,
        normalizeFontWeight,
        normalizeLetterSpace,
    )(style);
};

type tfn = (s: TypographStyle) => TypographStyle;
function _c(...funcs: Array<tfn>) {
    return funcs.reduceRight((prev, curr) => (...values) => curr(prev(...values)));
} 



const toVarName = (key: string) => `--theme-${key}`
export const toVarValue = (key: string, value: string | number) =>
    `var(${toVarName(key)}, ${value})`

const join = (...args: (string | undefined)[]) => args.filter(Boolean).join('-')

const numberScales = {
    fontWeights: true,
    lineHeights: true,
}
const reservedKeys = {
    modes: true,
}

const toPixel = (key: string, value: string | number) => {
    if (typeof value !== 'number') return value
    if (numberScales[key as keyof typeof numberScales]) return value
    return value + 'px'
}

// convert theme values to custom properties
export const toCustomProperties = <R>(
    obj: Record<string, any> | undefined,
    parent?: string,
    themeKey?: string
) => {
    const next: Record<string, any> = Array.isArray(obj) ? [] : {}

    for (let key in obj) {
        const value = obj[key]
        const name = join(parent, key)

        if (reservedKeys[key as keyof typeof reservedKeys]) {
            next[key] = value
            continue
        }

        if (value && typeof value === 'object') {
            next[key] = toCustomProperties(value, name, key)
            continue
        }

        const val = toPixel(themeKey || key, value)
        next[key] = toVarValue(name, val)
    }

    return next as R;
}

export const objectToVars = (parent: string, obj: Record<string, any>) => {
    let vars: Record<string, object> = {}
    for (let key in obj) {
        if (key === 'modes' || key === 'comment') continue
        const name = join(parent, key)
        const value = obj[key]
        if (value && typeof value === 'object') {
            vars = {
                ...vars,
                ...objectToVars(name, value),
            }
        } else {
            vars[toVarName(name)] = value
        }
    }
    return vars
}

// // TODO: Export to pure CSS
// export const toCSS = (style: any = {}) => {
//     return serializeStyles([style], {}).styles;
// };

export const createColorStyles = (theme: any = {}) => {
    const { colors } = theme
    const modes = colors.modes || {}
    const styles = objectToVars('colors', colors)

    Object.keys(modes).forEach((mode) => {
        const key = `&[theme="${mode}"]`;
        styles[key] = {
            ...objectToVars('colors', modes[mode]),
        };
    })

    return css({
        body: {
            ...styles,
            color: 'text',
            bg: 'background',
        },
    })(theme)
};


export type SimpleTokens = {
    [key in keyof ThemeTokens]: ThemeTokens[key]['value'];
};

export const createThemeStyles = (theme: SimpleTokens) => {
    return css({
        ':root': {
            ...objectToVars('colors', theme),
            color: 'text',
            bg: 'background',
        },
    })({ colors: theme }) as {};
};


export const withOutComments = <T extends TokenGroup = TokenGroup>(theme: T) => {
    return Object.entries(theme).reduce((acc, [key, token]) => {
        acc[key as keyof T] = token.value;
        return acc;
    }, {} as { [key in keyof T]: T[key]["value"]});
};