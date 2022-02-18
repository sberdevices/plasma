import type { FullColors, WebColors } from '@sberdevices/plasma-tokens-utils';
import {
    mapDesignToBaseColors,
    mapDesignToTypography,
    filterTypoStyles,
    humanizeColor,
    alphenColor,
    compose,
    normalizeFontNames,
    removeTypoUnnecessary,
    convertPixelsToRems,
    normalizeFontStyle,
    normalizeFontWeight,
    normalizeLetterSpace,
    FullColorsList,
} from '@sberdevices/plasma-tokens-utils';

import { DesignLanguage } from '../design-language/build/diez-plasma-tokens-b2b-web';
import type {
    Typography as TypographySet,
    Typograph as TypographyData,
} from '../design-language/build/diez-plasma-tokens-b2b-web';

import { colors } from './colors';

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

const light: FullColors & WebColors = {
    ...baseColors,

    text: {
        value: humanizeColor(ds.theme.light_primary.color),
        comment: FullColorsList.text,
    },
    link: {
        value: colors.light.link,
    },
    linkHover: {
        value: colors.light.linkHover,
    },
    linkActive: {
        value: colors.light.linkActive,
    },
    linkVisited: {
        value: colors.light.linkVisited,
    },
    linkVisitedHover: {
        value: colors.light.linkVisitedHover,
    },
    linkVisitedActive: {
        value: colors.light.linkVisitedActive,
    },

    primary: {
        value: humanizeColor(ds.theme.light_primary.color),
        comment: FullColorsList.primary,
    },
    secondary: {
        value: humanizeColor(ds.theme.light_secondary.color),
        comment: FullColorsList.secondary,
    },
    tertiary: {
        value: humanizeColor(ds.theme.light_tertiary.color),
        comment: FullColorsList.tertiary,
    },

    paragraph: {
        value: humanizeColor(ds.theme.light_paragraph.color),
    },
    inverse: {
        value: humanizeColor(ds.theme.light_inverse.color),
    },

    background: {
        value: humanizeColor(ds.theme.light_bg.color),
        comment: FullColorsList.background,
    },

    backgroundPrimary: {
        value: humanizeColor(ds.theme.light_bg_primary.color),
        comment: FullColorsList.backgroundPrimary,
    },
    backgroundSecondary: {
        value: humanizeColor(ds.theme.light_bg_secondary.color),
        comment: FullColorsList.backgroundSecondary,
    },
    backgroundTertiary: {
        value: humanizeColor(ds.theme.light_bg_tertiary.color),
        comment: FullColorsList.backgroundTertiary,
    },

    inputBorder: {
        value: humanizeColor(ds.theme.light_input_border.color),
    },
    inputBorderHover: {
        value: humanizeColor(ds.theme.light_input_border_hover.color),
    },
    inputBorderFocus: {
        value: humanizeColor(ds.theme.light_input_border_focus.color),
    },

    accent: {
        value: humanizeColor(ds.theme.light_accent.color),
        comment: FullColorsList.accent,
    },
    success: {
        value: humanizeColor(ds.theme.light_success.color),
        comment: FullColorsList.success,
    },
    warning: {
        value: humanizeColor(ds.theme.light_warning.color),
        comment: FullColorsList.warning,
    },
    critical: {
        value: humanizeColor(ds.theme.light_critical.color),
        comment: FullColorsList.critical,
    },

    overlay: {
        value: humanizeColor(ds.theme.light_overlay.color),
        comment: FullColorsList.overlay,
    },

    surfaceLiquid01: {
        value: humanizeColor(ds.theme.light_surface_Liquid01.color),
        comment: FullColorsList.surfaceLiquid01,
    },
    surfaceLiquid02: {
        value: humanizeColor(ds.theme.light_surface_Liquid02.color),
        comment: FullColorsList.surfaceLiquid02,
    },
    surfaceLiquid03: {
        value: humanizeColor(ds.theme.light_surface_Liquid03.color),
        comment: FullColorsList.surfaceLiquid03,
    },
    surfaceSolid01: {
        value: humanizeColor(ds.theme.light_surface_solid01.color),
        comment: FullColorsList.surfaceSolid01,
    },
    surfaceSolid02: {
        value: humanizeColor(ds.theme.light_surface_solid02.color),
        comment: FullColorsList.surfaceSolid02,
    },
    surfaceSolid03: {
        value: humanizeColor(ds.theme.light_surface_solid03.color),
        comment: FullColorsList.surfaceSolid03,
    },
    surfaceCard: {
        value: humanizeColor(ds.theme.light_surface_card.color),
        comment: FullColorsList.surfaceCard,
    },

    buttonPrimary: {
        value: humanizeColor(ds.theme.light_button_primary.color),
        comment: FullColorsList.buttonPrimary,
    },
    buttonPrimaryHover: {
        value: colors.light.buttonPrimaryHover,
    },
    buttonPrimaryActive: {
        value: colors.light.buttonPrimaryActive,
    },

    buttonSecondary: {
        value: humanizeColor(ds.theme.light_button_secondary.color),
        comment: FullColorsList.buttonSecondary,
    },
    buttonSecondaryHover: {
        value: alphenColor(ds.theme.light_button_secondary.color, -0.02),
    },
    buttonSecondaryActive: {
        value: alphenColor(ds.theme.light_button_secondary.color, 0.02),
    },

    buttonAccent: {
        value: humanizeColor(ds.theme.light_button_accent.color),
        comment: FullColorsList.buttonAccent,
    },

    buttonSuccess: {
        value: humanizeColor(ds.theme.light_button_success.color),
        comment: FullColorsList.buttonSuccess,
    },
    buttonSuccessHover: {
        value: colors.light.buttonSuccessHover,
    },
    buttonSuccessActive: {
        value: colors.light.buttonSuccessActive,
    },

    buttonWarning: {
        value: humanizeColor(ds.theme.light_button_warning.color),
        comment: FullColorsList.buttonWarning,
    },
    buttonWarningHover: {
        value: colors.light.buttonWarningHover,
    },
    buttonWarningActive: {
        value: colors.light.buttonWarningActive,
    },

    buttonCritical: {
        value: humanizeColor(ds.theme.light_button_critical.color),
        comment: FullColorsList.buttonCritical,
    },
    buttonCriticalHover: {
        value: colors.light.buttonCriticalHover,
    },
    buttonCriticalActive: {
        value: colors.light.buttonCriticalActive,
    },

    buttonChecked: {
        value: humanizeColor(ds.theme.light_button_checked.color),
        comment: FullColorsList.buttonChecked,
    },
    buttonCheckedHover: {
        value: colors.light.buttonCheckedHover,
    },
    buttonCheckedHoverColor: {
        value: ds.theme.light_inverse.color,
    },
    buttonCheckedActive: {
        value: colors.light.buttonCheckedActive,
    },
    buttonCheckedActiveColor: {
        value: alphenColor(ds.theme.light_inverse.color, -0.36),
    },

    buttonFocused: {
        value: humanizeColor(ds.theme.light_button_focused.color),
        comment: FullColorsList.buttonFocused,
    },

    gradient: {
        value: ds.gradients.light.backgroundImageStyle.backgroundImage,
        comment: FullColorsList.gradient,
    },
    gradientDevice: {
        value: '',
    },
    voicePhraseGradient: {
        value: '',
    },
    skeletonGradient: {
        value: colors.light.skeletonGradient,
    },
    skeletonGradientLighter: {
        value: colors.light.skeletonGradientLighter,
    },

    speechBubbleSent: {
        value: '',
    },
    speechBubbleReceived: {
        value: '',
    },
};
const dark: FullColors & WebColors = {
    ...baseColors,

    text: {
        value: humanizeColor(ds.theme.dark_primary.color),
        comment: FullColorsList.text,
    },
    link: {
        value: colors.dark.link,
    },
    linkHover: {
        value: colors.dark.linkHover,
    },
    linkActive: {
        value: colors.dark.linkActive,
    },
    linkVisited: {
        value: colors.dark.linkVisited,
    },
    linkVisitedHover: {
        value: colors.dark.linkVisitedHover,
    },
    linkVisitedActive: {
        value: colors.dark.linkVisitedActive,
    },

    primary: {
        value: humanizeColor(ds.theme.dark_primary.color),
        comment: FullColorsList.primary,
    },
    secondary: {
        value: humanizeColor(ds.theme.dark_secondary.color),
        comment: FullColorsList.secondary,
    },
    tertiary: {
        value: humanizeColor(ds.theme.dark_tertiary.color),
        comment: FullColorsList.tertiary,
    },

    paragraph: {
        value: humanizeColor(ds.theme.dark_paragraph.color),
    },
    inverse: {
        value: humanizeColor(ds.theme.dark_inverse.color),
    },

    background: {
        value: humanizeColor(ds.theme.dark_bg.color),
        comment: FullColorsList.background,
    },

    backgroundPrimary: {
        value: humanizeColor(ds.theme.dark_bg_primary.color),
        comment: FullColorsList.backgroundPrimary,
    },
    backgroundSecondary: {
        value: humanizeColor(ds.theme.dark_bg_secondary.color),
        comment: FullColorsList.backgroundSecondary,
    },
    backgroundTertiary: {
        value: humanizeColor(ds.theme.dark_bg_tertiary.color),
        comment: FullColorsList.backgroundTertiary,
    },

    inputBorder: {
        value: humanizeColor(ds.theme.dark_input_border.color),
    },
    inputBorderHover: {
        value: humanizeColor(ds.theme.dark_input_border_hover.color),
    },
    inputBorderFocus: {
        value: humanizeColor(ds.theme.dark_input_border_focus.color),
    },

    accent: {
        value: humanizeColor(ds.theme.dark_accent.color),
        comment: FullColorsList.accent,
    },
    success: {
        value: humanizeColor(ds.theme.dark_success.color),
        comment: FullColorsList.success,
    },
    warning: {
        value: humanizeColor(ds.theme.dark_warning.color),
        comment: FullColorsList.warning,
    },
    critical: {
        value: humanizeColor(ds.theme.dark_critical.color),
        comment: FullColorsList.critical,
    },

    overlay: {
        value: humanizeColor(ds.theme.dark_overlay.color),
        comment: FullColorsList.overlay,
    },

    surfaceLiquid01: {
        value: humanizeColor(ds.theme.dark_surface_Liquid01.color),
        comment: FullColorsList.surfaceLiquid01,
    },
    surfaceLiquid02: {
        value: humanizeColor(ds.theme.dark_surface_Liquid02.color),
        comment: FullColorsList.surfaceLiquid02,
    },
    surfaceLiquid03: {
        value: humanizeColor(ds.theme.dark_surface_Liquid03.color),
        comment: FullColorsList.surfaceLiquid03,
    },
    surfaceSolid01: {
        value: humanizeColor(ds.theme.dark_surface_solid01.color),
        comment: FullColorsList.surfaceSolid01,
    },
    surfaceSolid02: {
        value: humanizeColor(ds.theme.dark_surface_solid02.color),
        comment: FullColorsList.surfaceSolid02,
    },
    surfaceSolid03: {
        value: humanizeColor(ds.theme.dark_surface_solid03.color),
        comment: FullColorsList.surfaceSolid03,
    },
    surfaceCard: {
        value: humanizeColor(ds.theme.dark_surface_card.color),
        comment: FullColorsList.surfaceCard,
    },

    buttonPrimary: {
        value: humanizeColor(ds.theme.dark_button_primary.color),
        comment: FullColorsList.buttonPrimary,
    },
    buttonPrimaryHover: {
        value: colors.dark.buttonPrimaryHover,
    },
    buttonPrimaryActive: {
        value: colors.dark.buttonPrimaryActive,
    },

    buttonSecondary: {
        value: humanizeColor(ds.theme.dark_button_secondary.color),
        comment: FullColorsList.buttonSecondary,
    },
    buttonSecondaryHover: {
        value: alphenColor(ds.theme.dark_button_secondary.color, 0.04),
    },
    buttonSecondaryActive: {
        value: alphenColor(ds.theme.dark_button_secondary.color, -0.02),
    },

    buttonAccent: {
        value: humanizeColor(ds.theme.dark_button_accent.color),
        comment: FullColorsList.buttonAccent,
    },

    buttonSuccess: {
        value: humanizeColor(ds.theme.dark_button_success.color),
        comment: FullColorsList.buttonSuccess,
    },
    buttonSuccessHover: {
        value: colors.dark.buttonSuccessHover,
    },
    buttonSuccessActive: {
        value: colors.dark.buttonSuccessActive,
    },

    buttonWarning: {
        value: humanizeColor(ds.theme.dark_button_warning.color),
        comment: FullColorsList.buttonWarning,
    },
    buttonWarningHover: {
        value: colors.dark.buttonWarningHover,
    },
    buttonWarningActive: {
        value: colors.dark.buttonWarningActive,
    },

    buttonCritical: {
        value: humanizeColor(ds.theme.dark_button_critical.color),
        comment: FullColorsList.buttonCritical,
    },
    buttonCriticalHover: {
        value: colors.dark.buttonCriticalHover,
    },
    buttonCriticalActive: {
        value: colors.dark.buttonCriticalActive,
    },

    buttonChecked: {
        value: humanizeColor(ds.theme.dark_button_checked.color),
        comment: FullColorsList.buttonChecked,
    },
    buttonCheckedHover: {
        value: colors.dark.buttonCheckedHover,
    },
    buttonCheckedHoverColor: {
        value: alphenColor(ds.theme.dark_inverse.color, -0.36),
    },
    buttonCheckedActive: {
        value: colors.dark.buttonCheckedActive,
    },
    buttonCheckedActiveColor: {
        value: ds.theme.dark_inverse.color,
    },

    buttonFocused: {
        value: humanizeColor(ds.theme.dark_button_focused.color),
        comment: FullColorsList.buttonFocused,
    },

    gradient: {
        value: ds.gradients.dark.backgroundImageStyle.backgroundImage,
        comment: FullColorsList.gradient,
    },
    gradientDevice: {
        value: '',
    },
    voicePhraseGradient: {
        value: '',
    },
    skeletonGradient: {
        value: colors.dark.skeletonGradient,
    },
    skeletonGradientLighter: {
        value: colors.dark.skeletonGradientLighter,
    },

    speechBubbleSent: {
        value: '',
    },
    speechBubbleReceived: {
        value: '',
    },
};

export const colorThemes = {
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
export const typo = { b2b: { theme: filterTypoStyles(typoSystem.typoStyles) } };
