import { Color } from '@diez/prefabs';

import { sasUiKitTokens } from './designs/SasUiKit.figma';

/* eslint-disable @typescript-eslint/camelcase */
const colors = {
    white_primary: sasUiKitTokens.colors.textIconsGblWhitePrimary,
    white_secondary: Color.rgba(255, 255, 255, 0.56),
    white_tertiary: Color.rgba(255, 255, 255, 0.28),

    black_primary: Color.rgba(8, 8, 8, 1),
    black_secondary: sasUiKitTokens.colors.textIconsGblBlackSecondary,
    black_tertiary: sasUiKitTokens.colors.textIconsGblBlackTetriary,

    white: sasUiKitTokens.colors.textIconsGblWhitePrimary,
    black: Color.rgba(8, 8, 8, 1),

    transparent: Color.rgba(0, 0, 0, 0),
};

const theme = {
    // light
    light_primary: sasUiKitTokens.colors.textIconsPrimary,
    light_secondary: sasUiKitTokens.colors.textIconsSecondary,
    light_tertiary: sasUiKitTokens.colors.textIconsTertiary,

    light_accent: Color.hex('#226AF1'),
    light_warning: sasUiKitTokens.colors.textIconsWarning,
    light_critical: sasUiKitTokens.colors.textIconsCritical,

    light_bg: Color.rgba(255, 255, 255, 1),

    light_bg_primary: Color.rgba(255, 255, 255, 1),
    light_bg_secondary: Color.rgba(255, 255, 255, 1),
    light_bg_tertiary: Color.rgba(255, 255, 255, 1),

    light_overlay: Color.rgba(0, 0, 0, 0.800000011920929),

    light_surface_Liquid01: Color.rgba(8, 8, 8, 0.019999999552965164),
    light_surface_Liquid02: Color.rgba(8, 8, 8, 0.05999999865889549),
    light_surface_Liquid03: sasUiKitTokens.colors.surfaceLiquid03,
    light_surface_card: Color.rgba(255, 255, 255, 0.11999999731779099),

    light_button_primary: sasUiKitTokens.colors.buttonsPrimary,
    light_button_secondary: sasUiKitTokens.colors.buttonsSecondary,

    light_button_accent: Color.hex('#226AF1'),
    light_button_warning: Color.rgba(238, 104, 32, 1),
    light_button_critical: sasUiKitTokens.colors.buttonsSpecialCritical,
    light_button_checked: Color.rgba(8, 8, 8, 1),
    light_button_focused: Color.hex('#226AF1'),
};

const gradients = {
    greenBlue: sasUiKitTokens.gradients.gradientGreenBlue,
};

const { typography: disigners } = sasUiKitTokens;

const typography = {
    headline1: disigners['4044Headline1'],
    headline2: disigners['3236Headline2'],
    headline3: disigners['2428Headline3'],
    headline4: disigners['2024Headline4'],
    headline5: disigners['1620Headline5'],

    subtitle: disigners['2024Subtittle'],

    body1: disigners['1620Body1'],

    paragraph1: disigners['1624ParagraphText1'],

    footnote1: disigners['1418Footnote1'],
    footnote2: disigners['1418Footnote2'],

    button1: disigners['1620Button1'],
    button2: disigners['1416Button2'],

    caption: disigners['1216Caption'],

    underline: disigners['1012Underline'],
};

export const designLanguage = {
    theme,
    colors,
    typography,
    gradients,
};
/* eslint-enable @typescript-eslint/camelcase */
