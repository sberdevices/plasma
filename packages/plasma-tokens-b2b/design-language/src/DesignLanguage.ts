import { Color } from '@diez/prefabs';

import { plasmaStylesTokens } from './designs/PlasmaStyles.figma';
import { sasUiKitTokens } from './designs/SasUiKit.figma';

/* eslint-disable @typescript-eslint/camelcase */
const colors = {
    white_primary: plasmaStylesTokens.colors.textIconsGlblWhitePrimary,
    white_secondary: plasmaStylesTokens.colors.textIconsGlblWhiteSecondary,
    white_tertiary: plasmaStylesTokens.colors.textIconsGlblWhiteTetriary,

    black_primary: plasmaStylesTokens.colors.textIconsGlblBlackPrimary,
    black_secondary: plasmaStylesTokens.colors.textIconsGblBlackSecondary,
    black_tertiary: plasmaStylesTokens.colors.textIconsGlblBlackTetriary,

    white: plasmaStylesTokens.colors.textIconsGblWhitePrimary,
    black: plasmaStylesTokens.colors.textIconsGlblBlackPrimary,

    dark01: Color.rgba(23, 23, 23, 1),
    dark02: Color.rgba(35, 35, 35, 1),
    dark03: Color.rgba(54, 54, 54, 1),

    transparent: Color.rgba(0, 0, 0, 0),

    button_clear: Color.rgba(0, 0, 0, 0),

    button_black: plasmaStylesTokens.colors.buttonGlblBlackDefault,
    button_black_secondary: plasmaStylesTokens.colors.buttonGlblBlackSecondary,
    button_black_transparent: plasmaStylesTokens.colors.buttonGlblBlackTransparent,

    button_white: plasmaStylesTokens.colors.buttonGblWhiteDefault,
    button_white_secondary: plasmaStylesTokens.colors.buttonGblWhiteSecondary,
};

const theme = {
    // light
    light_primary: plasmaStylesTokens.colors.textIconsPrimary6,
    light_secondary: plasmaStylesTokens.colors.textIconsSecondary4,
    light_tertiary: plasmaStylesTokens.colors.textIconsTertiary1,

    light_paragraph: plasmaStylesTokens.colors.textIconsParagraph,
    light_inverse: plasmaStylesTokens.colors.textIconsInverse,

    light_accent: plasmaStylesTokens.colors.textIconsAccentBrand,
    light_success: plasmaStylesTokens.colors.textIconsStatusSuccess,
    light_warning: plasmaStylesTokens.colors.textIconsStatusWarning,
    light_critical: plasmaStylesTokens.colors.textIconsStatusCritical,

    light_bg: Color.rgba(255, 255, 255, 1),
    light_overlay: Color.rgba(0, 0, 0, 0.8),

    light_bg_primary: Color.rgba(255, 255, 255, 1),
    light_bg_secondary: Color.rgba(255, 255, 255, 1),
    light_bg_tertiary: Color.rgba(255, 255, 255, 1),

    light_input_border: plasmaStylesTokens.colors.textIconsTertiary1,
    light_input_border_hover: plasmaStylesTokens.colors.textIconsSecondary4,
    light_input_border_focus: plasmaStylesTokens.colors.textIconsAccentBrand,

    light_surface_Liquid01: Color.rgba(8, 8, 8, 0.02), // FixMe: v2.0 переименовать в transparent01
    light_surface_Liquid02: Color.rgba(8, 8, 8, 0.06), // FixMe: v2.0 переименовать в transparent02
    light_surface_Liquid03: Color.rgba(8, 8, 8, 0.12), // FixMe: v2.0 переименовать в transparent03

    light_surface_solid01: Color.rgba(250, 250, 250, 1),
    light_surface_solid02: Color.rgba(240, 240, 240, 1),
    light_surface_solid03: Color.rgba(225, 225, 225, 1),

    light_surface_card: Color.rgba(255, 255, 255, 1),

    light_surface_gbl_white: plasmaStylesTokens.colors.surfaceSolidGblWhite,
    light_surface_gbl_black: plasmaStylesTokens.colors.surfaceGlblGblBlack,

    light_button_primary: plasmaStylesTokens.colors.buttonPrimaryBrand,
    light_button_secondary: plasmaStylesTokens.colors.buttonSecondaryDefault,

    light_button_accent: plasmaStylesTokens.colors.buttonPrimaryBrand,
    light_button_success: plasmaStylesTokens.colors.buttonStatusSuccess,
    light_button_warning: plasmaStylesTokens.colors.buttonStatusWarning,
    light_button_critical: plasmaStylesTokens.colors.buttonStatusCritical,
    light_button_checked: plasmaStylesTokens.colors.buttonStatusChecked,
    light_button_focused: plasmaStylesTokens.colors.buttonPrimaryBrand,

    // dark
    dark_primary: plasmaStylesTokens.colors.textIconsPrimary1,
    dark_secondary: plasmaStylesTokens.colors.textIconsSecondary1,
    dark_tertiary: plasmaStylesTokens.colors.textIconsTertiary,

    dark_paragraph: plasmaStylesTokens.colors.textIconsParagraph1,
    dark_inverse: plasmaStylesTokens.colors.textIconsInverse1,

    dark_accent: plasmaStylesTokens.colors.textIconsAccentBrand1,
    dark_success: plasmaStylesTokens.colors.textIconsStatusSuccess1,
    dark_warning: plasmaStylesTokens.colors.textIconsStatusWarning1,
    dark_critical: plasmaStylesTokens.colors.textIconsStatusCritical1,

    dark_bg: Color.rgba(8, 8, 8, 1),
    dark_overlay: Color.rgba(0, 0, 0, 0.8),

    dark_bg_primary: Color.rgba(23, 23, 23, 1),
    dark_bg_secondary: Color.rgba(35, 35, 35, 1),
    dark_bg_tertiary: Color.rgba(54, 54, 54, 1),

    dark_input_border: Color.rgba(255, 255, 255, 0.16),
    dark_input_border_hover: Color.rgba(255, 255, 255, 0.32),
    dark_input_border_focus: plasmaStylesTokens.colors.textIconsAccentBrand1,

    dark_surface_Liquid01: Color.rgba(255, 255, 255, 0.06), // FixMe: v2.0 переименовать в transparent01
    dark_surface_Liquid02: Color.rgba(255, 255, 255, 0.12), // FixMe: v2.0 переименовать в transparent02
    dark_surface_Liquid03: Color.rgba(255, 255, 255, 0.2), // FixMe: v2.0 переименовать в transparent03

    dark_surface_solid01: Color.rgba(23, 23, 23, 1),
    dark_surface_solid02: Color.rgba(35, 35, 35, 1),
    dark_surface_solid03: Color.rgba(54, 54, 54, 1),

    dark_surface_card: Color.rgba(255, 255, 255, 0.12),

    dark_surface_gbl_white: plasmaStylesTokens.colors.surfaceSolidGblWhite1,
    dark_surface_gbl_black: plasmaStylesTokens.colors.surfaceGlblGblBlack1,

    dark_button_primary: plasmaStylesTokens.colors.buttonPrimaryBrand1,
    dark_button_secondary: plasmaStylesTokens.colors.buttonSecondaryDefault1,

    dark_button_accent: plasmaStylesTokens.colors.buttonPrimaryBrand1,
    dark_button_success: plasmaStylesTokens.colors.buttonStatusSuccess1,
    dark_button_warning: plasmaStylesTokens.colors.buttonStatusWarning1,
    dark_button_critical: plasmaStylesTokens.colors.buttonStatusCritical1,
    dark_button_checked: plasmaStylesTokens.colors.buttonStatusChecked1,
    dark_button_focused: plasmaStylesTokens.colors.buttonPrimaryBrand1,
};

const gradients = {
    light: plasmaStylesTokens.gradients.textIconsGradientBrand,
    dark: plasmaStylesTokens.gradients.textIconsGradientBrand1,
};

const { typography: designers } = sasUiKitTokens; // FixMe: убрать в v2.0

const typography = {
    headline1: designers['4044Headline1'],
    headline2: designers['3236Headline2'],
    headline3: designers['2428Headline3'],
    headline4: designers['2024Headline4'],
    headline5: designers['1620Headline5'],

    subtitle: designers['2024Subtittle'],

    body1: designers['1620Body1'],

    paragraph1: designers['1624ParagraphText1'],

    footnote1: designers['1418Footnote1'],
    footnote2: designers['1418Footnote2'],

    button1: designers['1620Button1'],
    button2: designers['1416Button2'],

    caption: designers['1216Caption'],

    underline: designers['1012Underline'],
};

export const designLanguage = {
    theme,
    colors,
    typography,
    gradients,
};
/* eslint-enable @typescript-eslint/camelcase */
