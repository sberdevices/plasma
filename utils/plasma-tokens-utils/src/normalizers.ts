import type { TypographStyle } from './types';

enum FontType {
    Regular = 'Regular',
    Medium = 'Medium',
    Semibold = 'Semibold',
    Bold = 'Bold',
    Unknown = 'Unknown',
}
enum FontTypeWeight {
    Regular = '400',
    Medium = '500',
    Semibold = '600',
    Bold = '700',
}

export const matchFontToWeight = (style: TypographStyle) => {
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

    return FontType.Unknown;
};

/**
 * Нормализаторы для работы с типографикой
 */
export const normalizeFontStyle = (style: TypographStyle) => {
    if (!style.fontStyle) {
        style.fontStyle = 'normal';
    }
    return style;
};
export const normalizeFontWeight = (style: TypographStyle) => {
    const type = matchFontToWeight(style);

    switch (type) {
        case FontType.Regular:
            style.fontWeight = FontTypeWeight.Regular.toString();
            return style;
        case FontType.Medium:
            style.fontWeight = FontTypeWeight.Medium.toString();
            return style;
        case FontType.Semibold:
            style.fontWeight = FontTypeWeight.Semibold.toString();
            return style;
        case FontType.Bold:
            style.fontWeight = FontTypeWeight.Bold.toString();
            return style;
        default:
            return style;
    }
};
export const normalizeLetterSpace = (style: TypographStyle) => {
    const fontSize = parseInt(String(style.fontSize), 10);
    const letterSpacing = parseFloat(String(style.letterSpacing));

    if (letterSpacing === 0) {
        style.letterSpacing = 'normal';
    } else {
        const letterSpacingInEm = (letterSpacing / fontSize).toPrecision(3);
        style.letterSpacing = `${letterSpacingInEm}em`;
    }

    return style;
};
export const normalizeFontNames = (style: TypographStyle) => {
    const type = matchFontToWeight(style);
    if (type === FontType.Unknown) {
        return style;
    }
    // TODO: sync this with "services/shared-static"
    style.fontFamily = style.fontFamily.replace(`SBSansText-${type}`, 'SB Sans Text');

    return style;
};
export const removeTypoUnnecessary = (style: TypographStyle) => {
    delete style.color;
    delete style.textAlign;
    delete style.textDecoration;
    return style;
};
