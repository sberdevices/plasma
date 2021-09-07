import { Color } from '@diez/prefabs';

import { playgroundWebB2CTokens } from './designs/PlaygroundWebB2C.figma';

/* eslint-disable @typescript-eslint/camelcase */
const colors = {
    white_primary: playgroundWebB2CTokens.colors.textIconsGlblWhitePrimary,
    white_secondary: playgroundWebB2CTokens.colors.textIconsGlblWhiteSecondary,
    white_tertiary: playgroundWebB2CTokens.colors.textIconsGlblWhiteTetriary,

    black_primary: playgroundWebB2CTokens.colors.textIconsGlblBlackPrimary,
    black_secondary: playgroundWebB2CTokens.colors.textIconsGblBlackSecondary,
    black_tertiary: playgroundWebB2CTokens.colors.textIconsGlblBlackTetriary,

    white: playgroundWebB2CTokens.colors.textIconsGblWhitePrimary,
    black: playgroundWebB2CTokens.colors.textIconsGlblBlackPrimary,

    transparent: Color.rgba(0, 0, 0, 0),

    button_clear: Color.rgba(0, 0, 0, 0),

    button_black: playgroundWebB2CTokens.colors.buttonGlblBlackDefault,
    button_black_secondary: playgroundWebB2CTokens.colors.buttonGlblBlackSecondary,
    button_black_transparent: playgroundWebB2CTokens.colors.buttonGlblBlackTransparent,

    button_white: playgroundWebB2CTokens.colors.buttonGblWhiteDefault,
    button_white_secondary: playgroundWebB2CTokens.colors.buttonGblWhiteSecondary,
};

const theme = {
    // light
    light_primary: playgroundWebB2CTokens.colors.textIconsPrimary4,
    light_secondary: playgroundWebB2CTokens.colors.textIconsSecondary3,
    light_tertiary: playgroundWebB2CTokens.colors.textIconsTertiary3,

    light_paragraph: playgroundWebB2CTokens.colors.textIconsParagraph1,
    light_inverse: playgroundWebB2CTokens.colors.textIconsInverse1,

    light_accent: playgroundWebB2CTokens.colors.textIconsAccentBrand,
    light_success: playgroundWebB2CTokens.colors.textIconsStatusSuccess,
    light_warning: playgroundWebB2CTokens.colors.textIconsStatusWarning,
    light_critical: playgroundWebB2CTokens.colors.textIconsStatusCritical,

    light_bg: Color.rgba(255, 255, 255, 1),
    light_overlay: Color.rgba(0, 0, 0, 0.8),

    light_bg_primary: Color.rgba(255, 255, 255, 1),
    light_bg_secondary: Color.rgba(255, 255, 255, 1),
    light_bg_tertiary: Color.rgba(255, 255, 255, 1),

    light_input_border: Color.rgba(8, 8, 8, 0.16),
    light_input_border_hover: Color.rgba(8, 8, 8, 0.32),

    light_surface_Liquid01: Color.rgba(8, 8, 8, 0.02), // FixMe: v2.0 переименовать в transparent01
    light_surface_Liquid02: Color.rgba(8, 8, 8, 0.06), // FixMe: v2.0 переименовать в transparent02
    light_surface_Liquid03: Color.rgba(8, 8, 8, 0.12), // FixMe: v2.0 переименовать в transparent03

    light_surface_solid01: Color.rgba(250, 250, 250, 1),
    light_surface_solid02: Color.rgba(240, 240, 240, 1),
    light_surface_solid03: Color.rgba(225, 225, 225, 1),

    light_surface_card: Color.rgba(255, 255, 255, 1),

    light_surface_gbl_white: Color.hex('#ffffff'),
    light_surface_gbl_black: Color.hex('#080808'),

    light_button_primary: playgroundWebB2CTokens.colors.buttonPrimaryBrand,
    light_button_secondary: playgroundWebB2CTokens.colors.buttonSecondaryDefault2,

    light_button_accent: playgroundWebB2CTokens.colors.buttonPrimaryBrand,
    light_button_success: playgroundWebB2CTokens.colors.buttonStatusSuccess,
    light_button_warning: playgroundWebB2CTokens.colors.buttonStatusWarning,
    light_button_critical: playgroundWebB2CTokens.colors.buttonStatusCritical,
    light_button_checked: playgroundWebB2CTokens.colors.buttonStatusChecked,
    light_button_focused: playgroundWebB2CTokens.colors.buttonPrimaryBrand,

    // dark
    dark_primary: playgroundWebB2CTokens.colors.textIconsPrimary1,
    dark_secondary: playgroundWebB2CTokens.colors.textIconsSecondary1,
    dark_tertiary: playgroundWebB2CTokens.colors.textIconsTertiary,

    dark_paragraph: playgroundWebB2CTokens.colors.textIconsParagraph,
    dark_inverse: playgroundWebB2CTokens.colors.textIconsInverse,

    dark_accent: playgroundWebB2CTokens.colors.textIconsAccentBrand1,
    dark_success: playgroundWebB2CTokens.colors.textIconsStatusSuccess1,
    dark_warning: playgroundWebB2CTokens.colors.textIconsStatusWarning1,
    dark_critical: playgroundWebB2CTokens.colors.textIconsStatusCritical1,

    dark_bg: Color.rgba(8, 8, 8, 1),
    dark_overlay: Color.rgba(0, 0, 0, 0.8),

    dark_bg_primary: Color.rgba(23, 23, 23, 1),
    dark_bg_secondary: Color.rgba(35, 35, 35, 1),
    dark_bg_tertiary: Color.rgba(54, 54, 54, 1),

    dark_input_border: Color.rgba(255, 255, 255, 0.16),
    dark_input_border_hover: Color.rgba(255, 255, 255, 0.32),

    dark_surface_Liquid01: Color.rgba(255, 255, 255, 0.06), // FixMe: v2.0 переименовать в transparent01
    dark_surface_Liquid02: playgroundWebB2CTokens.colors.surfaceTransparent02,
    dark_surface_Liquid03: Color.rgba(255, 255, 255, 0.2), // FixMe: v2.0 переименовать в transparent03

    dark_surface_solid01: Color.rgba(23, 23, 23, 1),
    dark_surface_solid02: Color.rgba(35, 35, 35, 1),
    dark_surface_solid03: Color.rgba(54, 54, 54, 1),

    dark_surface_card: Color.rgba(255, 255, 255, 0.12),

    dark_surface_gbl_white: Color.hex('#ffffff'),
    dark_surface_gbl_black: Color.hex('#080808'),

    dark_button_primary: playgroundWebB2CTokens.colors.buttonPrimaryBrand1,
    dark_button_secondary: playgroundWebB2CTokens.colors.buttonSecondaryDefault1,

    dark_button_accent: playgroundWebB2CTokens.colors.buttonPrimaryBrand1,
    dark_button_success: playgroundWebB2CTokens.colors.buttonStatusSuccess1,
    dark_button_warning: playgroundWebB2CTokens.colors.buttonStatusWarning,
    dark_button_critical: playgroundWebB2CTokens.colors.buttonStatusCritical1,
    dark_button_checked: playgroundWebB2CTokens.colors.buttonStatusChecked1,
    dark_button_focused: playgroundWebB2CTokens.colors.buttonPrimaryBrand1,
};

const gradients = {
    light: playgroundWebB2CTokens.gradients.textIconsGradientBrand,
    dark: playgroundWebB2CTokens.gradients.textIconsGradientBrand1,
};

const { typography: designers } = playgroundWebB2CTokens;

const typography = {
    display1: designers.sbS9696Display1Medium,
    display2: designers.sbS6064Display2Medium,
    display3: designers.sbS4852Display3Medium,

    headline1: designers.sbS3236Headline1Bold,
    headline2: designers.sbS2428Headline2Semibold,
    headline3: designers.sbS2024Headline3Semibold,
    headline4: designers.sbS2024Headline4Bold,

    body1: designers.sbS1620Body1Medium,
    body2: designers.sbS1620Body2Semibold,
    body3: designers.sbS1620Body3Bold,

    paragraph1: designers.sbS1622ParagraphText1Regular,
    paragraph2: designers.sbS1622ParagraphText2Semibold,

    footnote1: designers.sbS1418Footnote1Medium,
    footnote2: designers.sbS1418Footnote2Semibold,

    button1: designers.sbS1620Button1Semibold,
    button2: designers.sbS1416Button2Semibold,

    caption: designers.sbS1216CaptionMedium,

    underline: designers.sbS1012Medium,
};

export const designLanguage = {
    theme,
    colors,
    typography,
    gradients,
};
/* eslint-enable @typescript-eslint/camelcase */
