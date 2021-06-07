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

const themeColorsComments = {
    ...ThemeColorsList,

    speechBubbleSent: 'Цвет фона баблов отправленный сообщений',
    speechBubbleReceived: 'Цвет фона баблов получнных сообщений',

    voicePhraseGradient: 'Градиент подсказок о голосовых запросах',
};

export type ThemeTokens = { [key in keyof typeof themeColorsComments]: TokenData<TColor> };

type BaseTheme = Omit<ThemeTokens, 'accent' | 'gradient' | 'voicePhraseGradient' | 'buttonAccent' | 'buttonFocused'>;

const darkTheme: BaseTheme = {
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

    speechBubbleSent: {
        value: humanizeColor(ds.theme.dark_speech_bubble_sent.color),
        comment: themeColorsComments.speechBubbleSent,
    },
    speechBubbleReceived: {
        value: humanizeColor(ds.theme.dark_speech_bubble_received.color),
        comment: themeColorsComments.speechBubbleReceived,
    },
};
const lightTheme: BaseTheme = {
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

    speechBubbleSent: {
        value: humanizeColor(ds.theme.light_speech_bubble_sent.color),
        comment: themeColorsComments.speechBubbleSent,
    },
    speechBubbleReceived: {
        value: humanizeColor(ds.theme.light_speech_bubble_received.color),
        comment: themeColorsComments.speechBubbleReceived,
    },
};

const darkSber: ThemeTokens = {
    ...darkTheme,
    accent: {
        value: dataColors.dark.accentSber,
        comment: themeColorsComments.accent,
    },
    buttonAccent: {
        value: dataColors.dark.buttonSber,
        comment: themeColorsComments.buttonAccent,
    },
    buttonFocused: {
        value: dataColors.dark.focusSber,
        comment: themeColorsComments.buttonFocused,
    },
    // TODO: export from figma is broken (#135)
    gradient: {
        value:
            'linear-gradient(336.84deg, rgba(20, 116, 70, 0.6) 0%, rgba(8, 8, 8, 0) 64.88%), radial-gradient(100% 100% at 75.89% 100%, rgba(0, 133, 255, 0.24) 0%, rgba(0, 71, 255, 0.03) 100%), linear-gradient(180deg, rgba(8, 8, 8, 0) 50%, rgba(7, 71, 33, 0.3) 100%), linear-gradient(270deg, #061621 0%, rgba(8, 8, 8, 0) 100%)',
        comment: themeColorsComments.gradient,
    },
    voicePhraseGradient: {
        // value: ds.gradients.voice_phrase_sber.linearGradient,
        value: 'linear-gradient(93.97deg, #1DD13B 6.49%, #27C6E5 93.51%)',
        comment: themeColorsComments.voicePhraseGradient,
    },
};
const darkEva: ThemeTokens = {
    ...darkTheme,
    accent: {
        value: dataColors.dark.accentAthena,
        comment: themeColorsComments.accent,
    },
    buttonAccent: {
        value: dataColors.dark.buttonAthena,
        comment: themeColorsComments.buttonAccent,
    },
    buttonFocused: {
        value: dataColors.dark.focusAthena,
        comment: themeColorsComments.buttonFocused,
    },
    // TODO: export from figma is broken (#135)
    gradient: {
        value:
            'linear-gradient(336.9deg, #143787 0%, rgba(8, 8, 8, 0) 64.95%), radial-gradient(66.53% 100% at 73.33% 100%, rgba(110, 5, 193, 0.44) 0%, rgba(53, 19, 149, 0.1) 99.69%), linear-gradient(180.03deg, rgba(8, 8, 8, 0) 50%, rgba(25, 63, 152, 0.41) 99.97%), linear-gradient(270deg, rgba(39, 15, 107, 0.3) 0%, rgba(8, 8, 8, 0) 100%)',
        comment: themeColorsComments.gradient,
    },
    voicePhraseGradient: {
        // value: ds.gradients.voice_phrase_eva.linearGradient,
        value: 'linear-gradient(93.97deg, #50C1FA 6.49%, #ADADFF 93.51%)',
        comment: themeColorsComments.voicePhraseGradient,
    },
};
const darkJoy: ThemeTokens = {
    ...darkTheme,
    accent: {
        value: dataColors.dark.accentJoy,
        comment: themeColorsComments.accent,
    },
    buttonAccent: {
        value: dataColors.dark.buttonJoy,
        comment: themeColorsComments.buttonAccent,
    },
    buttonFocused: {
        value: dataColors.dark.focusJoy,
        comment: themeColorsComments.buttonFocused,
    },
    // TODO: export from figma is broken (#135)
    gradient: {
        value:
            'linear-gradient(336.9deg, rgba(255, 156, 101, 0.24) 0%, rgba(8, 8, 8, 0) 64.95%), radial-gradient(66.53% 100% at 73.33% 100%, rgba(61, 19, 149, 0.34) 0%, rgba(19, 24, 149, 0.1) 99.69%), linear-gradient(180.03deg, rgba(8, 8, 8, 0) 50%, rgba(255, 215, 179, 0.15) 99.97%), linear-gradient(270deg, rgba(107, 15, 87, 0.2) 0%, rgba(8, 8, 8, 0) 100%)',
        comment: themeColorsComments.gradient,
    },
    voicePhraseGradient: {
        // value: ds.gradients.voice_phrase_joy.linearGradient,
        value: 'linear-gradient(93.97deg, #FF9E6E 6.49%, #FC95DA 93.51%)',
        comment: themeColorsComments.voicePhraseGradient,
    },
};
const lightSber: ThemeTokens = {
    ...lightTheme,
    accent: {
        value: dataColors.light.accentSber,
        comment: themeColorsComments.accent,
    },
    buttonAccent: {
        value: dataColors.light.buttonSber,
        comment: themeColorsComments.buttonAccent,
    },
    buttonFocused: {
        value: dataColors.light.focusSber,
        comment: themeColorsComments.buttonFocused,
    },
    // TODO: export from figma is broken (#135)
    gradient: {
        value:
            'linear-gradient(336.9deg, rgba(4, 255, 44, 0.02) 0%, rgba(255, 255, 255, 0) 64.95%), radial-gradient(66.53% 100% at 73.33% 100%, rgba(0, 179, 255, 0.06) 0%, rgba(0, 209, 255, 0.01) 99.69%), linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, rgba(0, 251, 59, 0.05) 100%), linear-gradient(270deg, rgba(6, 195, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%);',
        comment: themeColorsComments.gradient,
    },
    voicePhraseGradient: {
        // value: ds.gradients.voice_phrase_sber.linearGradient,
        value: 'linear-gradient(89.83deg, #0EB029 0%, #00A6C7 100%)',
        comment: themeColorsComments.voicePhraseGradient,
    },
};
const lightEva: ThemeTokens = {
    ...lightTheme,
    accent: {
        value: dataColors.light.accentAthena,
        comment: themeColorsComments.accent,
    },
    buttonAccent: {
        value: dataColors.light.buttonAthena,
        comment: themeColorsComments.buttonAccent,
    },
    buttonFocused: {
        value: dataColors.light.focusAthena,
        comment: themeColorsComments.buttonFocused,
    },
    // TODO: export from figma is broken (#135)
    gradient: {
        value:
            'linear-gradient(336.9deg, rgba(0, 224, 255, 0.06) 0%, rgba(255, 255, 255, 0) 64.95%), radial-gradient(66.53% 100% at 73.33% 100%, rgba(0, 87, 255, 0.04) 0%, rgba(87, 8, 255, 0.01) 99.69%), linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, rgba(0, 224, 255, 0.06) 100%), linear-gradient(270deg, rgba(0, 71, 253, 0.02) 0%, rgba(255, 255, 255, 0) 100%)',
        comment: themeColorsComments.gradient,
    },
    voicePhraseGradient: {
        // value: ds.gradients.voice_phrase_eva.linearGradient,
        value: 'linear-gradient(89.83deg, #1BA0E3 0%, #7A7AFF 100%)',
        comment: themeColorsComments.voicePhraseGradient,
    },
};
const lightJoy: ThemeTokens = {
    ...lightTheme,
    accent: {
        value: dataColors.light.accentJoy,
        comment: themeColorsComments.accent,
    },
    buttonAccent: {
        value: dataColors.light.buttonJoy,
        comment: themeColorsComments.buttonAccent,
    },
    buttonFocused: {
        value: dataColors.light.focusJoy,
        comment: themeColorsComments.buttonFocused,
    },
    // TODO: export from figma is broken (#135)
    // background: lToRgba(ds.gradients.light_bg_joy.linearGradient),
    gradient: {
        value:
            'linear-gradient(336.9deg, rgba(255, 200, 3, 0.05) 0%, rgba(255, 255, 255, 0) 64.95%), radial-gradient(66.53% 100% at 73.33% 100%, rgba(148, 0, 238, 0.02) 0%, rgba(160, 4, 255, 0.01) 99.69%), linear-gradient(180.03deg, rgba(255, 255, 255, 0) 50%, rgba(255, 184, 0, 0.04) 99.97%), linear-gradient(270deg, rgba(240, 0, 187, 0.03) 0%, rgba(255, 255, 255, 0) 100%)',
        comment: themeColorsComments.gradient,
    },
    voicePhraseGradient: {
        // value: ds.gradients.voice_phrase_joy.linearGradient,
        value: 'linear-gradient(89.83deg, #FCA349 0%, #FF52C5 100%)',
        comment: themeColorsComments.voicePhraseGradient,
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
