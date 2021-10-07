import { humanizeColor } from './functions';
import { matchFontToWeight } from './normalizers';
import type { DesignLanguage, BaseColors, TypoSystem } from './types';

export const mapDesignToBaseColors = (ds: DesignLanguage): BaseColors => ({
    white: {
        value: humanizeColor(ds.colors.white.color),
        comment: 'Базовый белый цвет совпадает с whitePrimary',
    },
    whitePrimary: {
        value: humanizeColor(ds.colors.white_primary.color),
        comment: 'Первичный белый цвет',
    },
    whiteSecondary: {
        value: humanizeColor(ds.colors.white_secondary.color),
        comment: 'Вторичный белый цвет',
    },
    whiteTertiary: {
        value: humanizeColor(ds.colors.white_tertiary.color),
        comment: 'Третичный белый цвет',
    },

    black: {
        value: humanizeColor(ds.colors.black.color),
        comment: 'Базовый черный цвет совпадает с blackPrimary',
    },
    blackPrimary: {
        value: humanizeColor(ds.colors.black_primary.color),
        comment: 'Первичный черный цвет',
    },
    blackSecondary: {
        value: humanizeColor(ds.colors.black_secondary.color),
        comment: 'Вторичный черныйцвет',
    },
    blackTertiary: {
        value: humanizeColor(ds.colors.black_tertiary.color),
        comment: 'Третичный черный цвет',
    },

    dark01: {
        value: humanizeColor(ds.colors.dark01.color),
        comment: 'Чёрный непрозрачный, не зависит от темы',
    },
    dark02: {
        value: humanizeColor(ds.colors.dark02.color),
        comment: 'Чёрный непрозрачный, не зависит от темы',
    },
    dark03: {
        value: humanizeColor(ds.colors.dark03.color),
        comment: 'Чёрный непрозрачный, не зависит от темы',
    },

    transparent: {
        value: humanizeColor(ds.colors.transparent.color),
        comment: 'Прозрачный цвет',
    },

    buttonClear: {
        value: humanizeColor(ds.colors.button_black.color),
        comment: 'Второстепенная прозрачная',
    },

    buttonBlack: {
        value: humanizeColor(ds.colors.button_black.color),
        comment: 'Дефолтная чёрная, не зависит от темы',
    },
    buttonBlackSecondary: {
        value: humanizeColor(ds.colors.button_black_secondary.color),
        comment: 'Второстепенная чёрная, не зависит от темы',
    },
    buttonBlackTransparent: {
        value: humanizeColor(ds.colors.button_black_transparent.color),
        comment: 'Чёрная для использования поверх картинок',
    },

    buttonWhite: {
        value: humanizeColor(ds.colors.button_white.color),
        comment: 'Дефолтная белая, не зависит от темы',
    },
    buttonWhiteSecondary: {
        value: humanizeColor(ds.colors.button_white_secondary.color),
        comment: 'Второстепенная белая, не зависит от темы',
    },
});

export const mapDesignToTypography = <TK extends string, TV extends Record<string, any>>(
    ds: DesignLanguage,
    normalize?: Function,
): TypoSystem<TK> => {
    const text = {} as TV;
    const fonts = {} as Record<string, string>;
    const fontWeights = {} as Record<string, number>;
    const fontSizeSet = new Set<string>();
    const lineHeightSet = new Set<string>();
    const letterSpacingSet = new Set<string>();

    for (const [key, value] of Object.entries(ds.typography)) {
        const style = normalize?.(value.style);

        if (key === 'underline') {
            style.textTransform = 'uppercase';
        }

        const { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } = style;
        const fontType = matchFontToWeight(style);

        // https://system-ui.com/theme/
        fonts[fontType] = fontFamily;
        fontWeights[fontType] = fontWeight;

        fontSizeSet.add(fontSize);
        lineHeightSet.add(lineHeight || fontSize);
        letterSpacingSet.add(String(letterSpacing));

        text[key as TK] = style;
    }

    const fontSizes = Array.from(fontSizeSet).sort((a, b) => parseFloat(a) - parseFloat(b));
    const lineHeights = Array.from(lineHeightSet).sort((a, b) => parseFloat(a) - parseFloat(b));
    const letterSpacings = Array.from(letterSpacingSet).sort((a, b) => {
        // treat 'normal' as 0
        /* eslint-disable no-restricted-globals */
        const aa = isNaN(parseFloat(a)) ? 0 : parseFloat(a);
        const bb = isNaN(parseFloat(b)) ? 0 : parseFloat(b);
        /* eslint-enable no-restricted-globals */

        return aa - bb;
    });

    return {
        fontSizes,
        fonts,
        fontWeights,
        lineHeights,
        letterSpacings,

        text,
    };
};
