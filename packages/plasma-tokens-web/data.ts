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
import { dataColors } from './dataColors';

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
        value: dataColors.light.accent,
        comment: themeColorsComments.accent,
    },
    success: {
        value: dataColors.light.statusSuccess,
        comment: themeColorsComments.success,
    },
    warning: {
        value: dataColors.light.statusWarning,
        comment: themeColorsComments.warning,
    },
    critical: {
        value: dataColors.light.statusCritical,
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
        value: dataColors.light.buttonAccent,
        comment: themeColorsComments.buttonAccent,
    },
    buttonSuccess: {
        value: dataColors.light.buttonSuccess,
        comment: themeColorsComments.buttonSuccess,
    },
    buttonWarning: {
        value: dataColors.light.buttonWarning,
        comment: themeColorsComments.buttonWarning,
    },
    buttonCritical: {
        value: dataColors.light.buttonCritical,
        comment: themeColorsComments.buttonCritical,
    },
    buttonChecked: {
        value: humanizeColor(ds.theme.light_button_checked.color),
        comment: themeColorsComments.buttonChecked,
    },
    buttonFocused: {
        value: dataColors.light.focus,
        comment: themeColorsComments.buttonFocused,
    },

    gradient: {
        value: ds.gradients.light.backgroundImageStyle.backgroundImage,
        comment: themeColorsComments.gradient,
    },
};
const dark: ThemeTokens = {
    ...baseColors,

    text: {
        value: humanizeColor(ds.theme.dark_primary.color),
        comment: themeColorsComments.text,
    },

    primary: {
        value: humanizeColor(ds.theme.dark_primary.color),
        comment: themeColorsComments.primary,
    },
    secondary: {
        value: humanizeColor(ds.theme.dark_secondary.color),
        comment: themeColorsComments.secondary,
    },
    tertiary: {
        value: humanizeColor(ds.theme.dark_tertiary.color),
        comment: themeColorsComments.tertiary,
    },

    background: {
        value: humanizeColor(ds.theme.dark_bg.color),
        comment: themeColorsComments.background,
    },

    backgroundPrimary: {
        value: humanizeColor(ds.theme.dark_bg_primary.color),
        comment: themeColorsComments.backgroundPrimary,
    },
    backgroundSecondary: {
        value: humanizeColor(ds.theme.dark_bg_secondary.color),
        comment: themeColorsComments.backgroundSecondary,
    },
    backgroundTertiary: {
        value: humanizeColor(ds.theme.dark_bg_tertiary.color),
        comment: themeColorsComments.backgroundTertiary,
    },

    accent: {
        value: dataColors.dark.accent,
        comment: themeColorsComments.accent,
    },
    success: {
        value: dataColors.dark.statusSuccess,
        comment: themeColorsComments.success,
    },
    warning: {
        value: dataColors.dark.statusWarning,
        comment: themeColorsComments.warning,
    },
    critical: {
        value: dataColors.dark.statusCritical,
        comment: themeColorsComments.critical,
    },

    overlay: {
        value: humanizeColor(ds.theme.dark_overlay.color),
        comment: themeColorsComments.overlay,
    },

    surfaceLiquid01: {
        value: humanizeColor(ds.theme.dark_surface_Liquid01.color),
        comment: themeColorsComments.surfaceLiquid01,
    },
    surfaceLiquid02: {
        value: humanizeColor(ds.theme.dark_surface_Liquid02.color),
        comment: themeColorsComments.surfaceLiquid02,
    },
    surfaceLiquid03: {
        value: humanizeColor(ds.theme.dark_surface_Liquid02.color),
        comment: themeColorsComments.surfaceLiquid03,
    },
    surfaceCard: {
        value: humanizeColor(ds.theme.dark_surface_card.color),
        comment: themeColorsComments.surfaceCard,
    },

    buttonPrimary: {
        value: humanizeColor(ds.theme.dark_button_primary.color),
        comment: themeColorsComments.buttonPrimary,
    },
    buttonSecondary: {
        value: humanizeColor(ds.theme.dark_button_secondary.color),
        comment: themeColorsComments.buttonSecondary,
    },

    buttonAccent: {
        value: dataColors.dark.buttonAccent,
        comment: themeColorsComments.buttonAccent,
    },
    buttonSuccess: {
        value: dataColors.dark.buttonSuccess,
        comment: themeColorsComments.buttonSuccess,
    },
    buttonWarning: {
        value: dataColors.dark.buttonWarning,
        comment: themeColorsComments.buttonWarning,
    },
    buttonCritical: {
        value: dataColors.dark.buttonCritical,
        comment: themeColorsComments.buttonCritical,
    },
    buttonChecked: {
        value: humanizeColor(ds.theme.dark_button_checked.color),
        comment: themeColorsComments.buttonChecked,
    },
    buttonFocused: {
        value: dataColors.dark.focus,
        comment: themeColorsComments.buttonFocused,
    },

    gradient: {
        value: ds.gradients.dark.backgroundImageStyle.backgroundImage,
        comment: themeColorsComments.gradient,
    },
};

export const themes = {
    light,
    dark,
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
