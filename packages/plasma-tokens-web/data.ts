import type { TokenData, TColor } from '@sberdevices/plasma-tokens-utils';
import {
    mapDesignToBaseColors,
    mapDesignToTypography,
    humanizeColor,
    compose,
    normalizeFontNames,
    removeTypoUnnecessary,
    convertPixelsToRems,
    normalizeFontStyle,
    normalizeFontWeight,
    normalizeLetterSpace,
    ThemeColorsList,
} from '@sberdevices/plasma-tokens-utils';

import { DesignLanguage } from './design-language/build/diez-plasma-tokens-web-web';
import type {
    Typography as TypographySet,
    Typograph as TypographyData,
} from './design-language/build/diez-plasma-tokens-web-web';

const ds = new DesignLanguage();

// because diez/ds needs document =(
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('jsdom-global')();

/* ============================================ */
/* =                 COLORS                   = */
/* ============================================ */

const baseColors = mapDesignToBaseColors(ds);

/* ======================================== */
/* =                THEMES                = */
/* ======================================== */

const themeColorsComments = {
    ...ThemeColorsList,
};

export type ThemeTokens = { [key in keyof typeof themeColorsComments]: TokenData<TColor> };

const light: ThemeTokens = {
    ...baseColors,

    text: {
        value: humanizeColor(ds.theme.light_primary.color),
        comment: themeColorsComments.text,
    },

    primary: {
        value: humanizeColor(ds.theme.light_primary.color),
        comment: themeColorsComments.primary,
    },
    secondary: {
        value: humanizeColor(ds.theme.light_secondary.color),
        comment: themeColorsComments.secondary,
    },
    tertiary: {
        value: humanizeColor(ds.theme.light_tertiary.color),
        comment: themeColorsComments.tertiary,
    },

    background: {
        value: humanizeColor(ds.theme.light_bg.color),
        comment: themeColorsComments.background,
    },

    backgroundPrimary: {
        value: humanizeColor(ds.theme.light_bg_primary.color),
        comment: themeColorsComments.backgroundPrimary,
    },
    backgroundSecondary: {
        value: humanizeColor(ds.theme.light_bg_secondary.color),
        comment: themeColorsComments.backgroundSecondary,
    },
    backgroundTertiary: {
        value: humanizeColor(ds.theme.light_bg_tertiary.color),
        comment: themeColorsComments.backgroundTertiary,
    },

    accent: {
        value: humanizeColor(ds.theme.light_accent.color),
        comment: themeColorsComments.accent,
    },
    warning: {
        value: humanizeColor(ds.theme.light_warning.color),
        comment: themeColorsComments.warning,
    },
    critical: {
        value: humanizeColor(ds.theme.light_critical.color),
        comment: themeColorsComments.critical,
    },

    overlay: {
        value: humanizeColor(ds.theme.light_overlay.color),
        comment: themeColorsComments.overlay,
    },

    surfaceLiquid01: {
        value: humanizeColor(ds.theme.light_surface_Liquid01.color),
        comment: themeColorsComments.surfaceLiquid01,
    },
    surfaceLiquid02: {
        value: humanizeColor(ds.theme.light_surface_Liquid02.color),
        comment: themeColorsComments.surfaceLiquid02,
    },
    surfaceLiquid03: {
        value: humanizeColor(ds.theme.light_surface_Liquid02.color),
        comment: themeColorsComments.surfaceLiquid03,
    },
    surfaceCard: {
        value: humanizeColor(ds.theme.light_surface_card.color),
        comment: themeColorsComments.surfaceCard,
    },

    buttonPrimary: {
        value: humanizeColor(ds.theme.light_button_primary.color),
        comment: themeColorsComments.buttonPrimary,
    },
    buttonSecondary: {
        value: humanizeColor(ds.theme.light_button_secondary.color),
        comment: themeColorsComments.buttonSecondary,
    },

    buttonAccent: {
        value: humanizeColor(ds.theme.light_button_accent.color),
        comment: themeColorsComments.buttonAccent,
    },
    buttonWarning: {
        value: humanizeColor(ds.theme.light_button_warning.color),
        comment: themeColorsComments.buttonWarning,
    },
    buttonCritical: {
        value: humanizeColor(ds.theme.light_button_critical.color),
        comment: themeColorsComments.buttonCritical,
    },
    buttonChecked: {
        value: humanizeColor(ds.theme.light_button_checked.color),
        comment: themeColorsComments.buttonChecked,
    },
    buttonFocused: {
        value: humanizeColor(ds.theme.light_button_focused.color),
        comment: themeColorsComments.buttonFocused,
    },

    gradient: {
        value: ds.gradients.greenBlue.backgroundImageStyle.backgroundImage,
        comment: themeColorsComments.gradient,
    },
};

export const themes = {
    light,
};

/* ======================================== */
/* =         TYPOGRAPHY & FONTS           = */
/* ======================================== */

export type TypographyTypes = keyof TypographySet;

// right to left: first we transform "LetterSpace" only then we scale "fontSize"
const normalizeTypographyStyle = compose(
    convertPixelsToRems,
    normalizeFontNames,
    removeTypoUnnecessary,
    normalizeFontStyle,
    normalizeFontWeight,
    normalizeLetterSpace,
);

export const typoSystem = mapDesignToTypography<TypographyTypes, TypographyData>(ds, normalizeTypographyStyle);
