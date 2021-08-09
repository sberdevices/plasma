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
    FullColorsList,
} from '@sberdevices/plasma-tokens-utils';

import { DesignLanguage } from './design-language/build/diez-plasma-tokens-web';
import type {
    Typography as TypographySet,
    Typograph as TypographyData,
} from './design-language/build/diez-plasma-tokens-web';
import { dataColors } from './dataColors';

const ds = new DesignLanguage();

// because diez/ds needs document =(
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('jsdom-global')();

/* ============================================ */
/* =                 COLORS                   = */
/* ============================================ */

export const baseColors = mapDesignToBaseColors(ds);

/* ======================================== */
/* =                THEMES                = */
/* =  Modes:( dark/light & sber/eva/joy ) = */
/* ======================================== */

export type ThemeTokens = { [key in keyof typeof FullColorsList]: TokenData<TColor> };
type BaseTheme = Omit<
    ThemeTokens,
    'accent' | 'gradient' | 'gradientDevice' | 'voicePhraseGradient' | 'buttonAccent' | 'buttonFocused'
>;

const darkTheme: BaseTheme = {
    ...baseColors,

    text: {
        value: humanizeColor(ds.theme.dark_primary.color),
        comment: FullColorsList.text,
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
        comment: FullColorsList.paragraph,
    },
    inverse: {
        value: humanizeColor(ds.theme.dark_inverse.color),
        comment: FullColorsList.inverse,
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
    buttonSecondary: {
        value: humanizeColor(ds.theme.dark_button_secondary.color),
        comment: FullColorsList.buttonSecondary,
    },
    buttonSuccess: {
        value: humanizeColor(ds.theme.dark_button_success.color),
        comment: FullColorsList.buttonSuccess,
    },
    buttonWarning: {
        value: humanizeColor(ds.theme.dark_button_warning.color),
        comment: FullColorsList.buttonWarning,
    },
    buttonCritical: {
        value: humanizeColor(ds.theme.dark_button_critical.color),
        comment: FullColorsList.buttonCritical,
    },
    buttonChecked: {
        value: humanizeColor(ds.theme.dark_button_checked.color),
        comment: FullColorsList.buttonChecked,
    },

    skeletonGradient: {
        value: dataColors.dark.skeletonGradient,
    },
    skeletonGradientLighter: {
        value: dataColors.dark.skeletonGradientLighter,
    },

    speechBubbleSent: {
        value: humanizeColor(ds.theme.dark_speech_bubble_sent.color),
        comment: FullColorsList.speechBubbleSent,
    },
    speechBubbleReceived: {
        value: humanizeColor(ds.theme.dark_speech_bubble_received.color),
        comment: FullColorsList.speechBubbleReceived,
    },
};
const lightTheme: BaseTheme = {
    ...baseColors,

    text: {
        value: humanizeColor(ds.theme.light_primary.color),
        comment: FullColorsList.text,
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
        comment: FullColorsList.paragraph,
    },
    inverse: {
        value: humanizeColor(ds.theme.light_inverse.color),
        comment: FullColorsList.inverse,
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
    buttonSecondary: {
        value: humanizeColor(ds.theme.light_button_secondary.color),
        comment: FullColorsList.buttonSecondary,
    },
    buttonSuccess: {
        value: humanizeColor(ds.theme.light_button_success.color),
        comment: FullColorsList.buttonSuccess,
    },
    buttonWarning: {
        value: humanizeColor(ds.theme.light_button_warning.color),
        comment: FullColorsList.buttonWarning,
    },
    buttonCritical: {
        value: humanizeColor(ds.theme.light_button_critical.color),
        comment: FullColorsList.buttonCritical,
    },
    buttonChecked: {
        value: humanizeColor(ds.theme.light_button_checked.color),
        comment: FullColorsList.buttonChecked,
    },

    skeletonGradient: {
        value: dataColors.light.skeletonGradient,
    },
    skeletonGradientLighter: {
        value: dataColors.light.skeletonGradientLighter,
    },

    speechBubbleSent: {
        value: humanizeColor(ds.theme.light_speech_bubble_sent.color),
        comment: FullColorsList.speechBubbleSent,
    },
    speechBubbleReceived: {
        value: humanizeColor(ds.theme.light_speech_bubble_received.color),
        comment: FullColorsList.speechBubbleReceived,
    },
};

const darkSber: ThemeTokens = {
    ...darkTheme,
    accent: {
        value: humanizeColor(ds.theme.dark_sber.color),
        comment: FullColorsList.accent,
    },
    buttonAccent: {
        value: humanizeColor(ds.theme.dark_button_sber.color),
        comment: FullColorsList.buttonAccent,
    },
    buttonFocused: {
        value: humanizeColor(ds.theme.dark_focus_sber.color),
        comment: FullColorsList.buttonFocused,
    },
    // TODO: export from figma is broken (#135)
    gradient: {
        value: ds.gradients.dark_bg_sber,
        comment: FullColorsList.gradient,
    },
    gradientDevice: {
        value: ds.gradients.dark_device_sber,
        comment: FullColorsList.gradient,
    },
    voicePhraseGradient: {
        value: ds.gradients.dark_voice_phrase_sber.linearGradient,
        comment: FullColorsList.voicePhraseGradient,
    },
};
const darkEva: ThemeTokens = {
    ...darkTheme,
    accent: {
        value: humanizeColor(ds.theme.dark_eva.color),
        comment: FullColorsList.accent,
    },
    buttonAccent: {
        value: humanizeColor(ds.theme.dark_button_eva.color),
        comment: FullColorsList.buttonAccent,
    },
    buttonFocused: {
        value: humanizeColor(ds.theme.dark_focus_eva.color),
        comment: FullColorsList.buttonFocused,
    },
    // TODO: export from figma is broken (#135)
    gradient: {
        value: ds.gradients.dark_bg_eva,
        comment: FullColorsList.gradient,
    },
    gradientDevice: {
        value: ds.gradients.dark_device_eva,
        comment: FullColorsList.gradient,
    },
    voicePhraseGradient: {
        value: ds.gradients.dark_voice_phrase_eva.linearGradient,
        comment: FullColorsList.voicePhraseGradient,
    },
};
const darkJoy: ThemeTokens = {
    ...darkTheme,
    accent: {
        value: humanizeColor(ds.theme.dark_joy.color),
        comment: FullColorsList.accent,
    },
    buttonAccent: {
        value: humanizeColor(ds.theme.dark_button_joy.color),
        comment: FullColorsList.buttonAccent,
    },
    buttonFocused: {
        value: humanizeColor(ds.theme.dark_focus_joy.color),
        comment: FullColorsList.buttonFocused,
    },
    // TODO: export from figma is broken (#135)
    gradient: {
        value: ds.gradients.dark_bg_joy,
        comment: FullColorsList.gradient,
    },
    gradientDevice: {
        value: ds.gradients.dark_device_eva,
        comment: FullColorsList.gradient,
    },
    voicePhraseGradient: {
        value: ds.gradients.dark_voice_phrase_joy.linearGradient,
        comment: FullColorsList.voicePhraseGradient,
    },
};
const lightSber: ThemeTokens = {
    ...lightTheme,
    accent: {
        value: humanizeColor(ds.theme.light_sber.color),
        comment: FullColorsList.accent,
    },
    buttonAccent: {
        value: humanizeColor(ds.theme.light_button_sber.color),
        comment: FullColorsList.buttonAccent,
    },
    buttonFocused: {
        value: humanizeColor(ds.theme.light_focus_sber.color),
        comment: FullColorsList.buttonFocused,
    },
    // TODO: export from figma is broken (#135)
    gradient: {
        value: ds.gradients.light_bg_sber,
        comment: FullColorsList.gradient,
    },
    gradientDevice: {
        value: ds.gradients.light_device_sber,
        comment: FullColorsList.gradient,
    },
    voicePhraseGradient: {
        value: ds.gradients.light_voice_phrase_sber.linearGradient,
        comment: FullColorsList.voicePhraseGradient,
    },
};
const lightEva: ThemeTokens = {
    ...lightTheme,
    accent: {
        value: humanizeColor(ds.theme.light_eva.color),
        comment: FullColorsList.accent,
    },
    buttonAccent: {
        value: humanizeColor(ds.theme.light_button_eva.color),
        comment: FullColorsList.buttonAccent,
    },
    buttonFocused: {
        value: humanizeColor(ds.theme.light_focus_eva.color),
        comment: FullColorsList.buttonFocused,
    },
    // TODO: export from figma is broken (#135)
    gradient: {
        value: ds.gradients.light_bg_eva,
        comment: FullColorsList.gradient,
    },
    gradientDevice: {
        value: ds.gradients.light_device_eva,
        comment: FullColorsList.gradient,
    },
    voicePhraseGradient: {
        value: ds.gradients.light_voice_phrase_eva.linearGradient,
        comment: FullColorsList.voicePhraseGradient,
    },
};
const lightJoy: ThemeTokens = {
    ...lightTheme,
    accent: {
        value: humanizeColor(ds.theme.light_joy.color),
        comment: FullColorsList.accent,
    },
    buttonAccent: {
        value: humanizeColor(ds.theme.light_button_joy.color),
        comment: FullColorsList.buttonAccent,
    },
    buttonFocused: {
        value: humanizeColor(ds.theme.light_focus_joy.color),
        comment: FullColorsList.buttonFocused,
    },
    // TODO: export from figma is broken (#135)
    // background: lToRgba(ds.gradients.light_bg_joy.linearGradient),
    gradient: {
        value: ds.gradients.light_bg_joy,
        comment: FullColorsList.gradient,
    },
    gradientDevice: {
        value: ds.gradients.light_device_joy,
        comment: FullColorsList.gradient,
    },
    voicePhraseGradient: {
        value: ds.gradients.light_voice_phrase_joy.linearGradient,
        comment: FullColorsList.voicePhraseGradient,
    },
};

export const themes = {
    darkSber,
    darkEva,
    darkJoy,
    lightSber,
    lightEva,
    lightJoy,
};

export type SimpleTokens = {
    [key in keyof ThemeTokens]: ThemeTokens[key]['value'];
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
    // scaleTypograpyForDevices,
    normalizeFontStyle,
    normalizeFontWeight,
    normalizeLetterSpace,
);

export const typoSystem = mapDesignToTypography<TypographyTypes, TypographyData>(ds, normalizeTypographyStyle);

export const deviceScales = {
    sberPortal: 2,
    sberBox: 2,
    mobile: 1,
};
