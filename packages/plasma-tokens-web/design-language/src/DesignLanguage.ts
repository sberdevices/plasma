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

    light_accent: Color.rgb(41, 105, 227),
    light_success: Color.rgb(13, 133, 35),
    light_warning: Color.rgb(209, 77, 0),
    light_critical: Color.rgb(227, 18, 39),

    light_bg: Color.rgba(245, 245, 245, 1),
    light_overlay: Color.rgba(0, 0, 0, 0.8),

    light_bg_primary: Color.rgba(255, 255, 255, 1), // ToDo: https://github.com/sberdevices/plasma/issues/1107
    light_bg_secondary: Color.rgba(255, 255, 255, 1), // ToDo: https://github.com/sberdevices/plasma/issues/1107
    light_bg_tertiary: Color.rgba(255, 255, 255, 1), // ToDo: https://github.com/sberdevices/plasma/issues/1107

    light_input_border: Color.rgba(8, 8, 8, 0.16),
    light_input_border_hover: Color.rgba(8, 8, 8, 0.32),
    light_input_border_focus: plasmaStylesTokens.colors.textIconsAccentBrand1,

    light_surface_Liquid01: Color.rgba(8, 8, 8, 0.02), // ToDo: https://github.com/sberdevices/plasma/issues/1107
    light_surface_Liquid02: Color.rgba(8, 8, 8, 0.06), // ToDo: https://github.com/sberdevices/plasma/issues/1107
    light_surface_Liquid03: Color.rgba(8, 8, 8, 0.12), // ToDo: https://github.com/sberdevices/plasma/issues/1107

    light_surface_solid01: Color.rgba(250, 250, 250, 1),
    light_surface_solid02: Color.rgba(240, 240, 240, 1),
    light_surface_solid03: Color.rgba(225, 225, 225, 1),

    light_surface_card: Color.rgba(255, 255, 255, 1),

    light_surface_gbl_white: plasmaStylesTokens.colors.surfaceSolidGblWhite,
    light_surface_gbl_black: plasmaStylesTokens.colors.surfaceGlblGblBlack,

    light_button_primary: plasmaStylesTokens.colors.buttonPrimaryBrand,
    light_button_secondary: plasmaStylesTokens.colors.buttonSecondaryDefault,

    light_button_accent: Color.rgb(41, 105, 227),
    light_button_success: Color.rgb(20, 143, 43),
    light_button_warning: Color.rgb(227, 85, 2),
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
    dark_success: Color.rgb(36, 178, 62),
    dark_warning: Color.rgb(250, 109, 32),
    dark_critical: Color.rgb(255, 77, 94),

    dark_bg: Color.rgba(8, 8, 8, 1),
    dark_overlay: Color.rgba(0, 0, 0, 0.8),

    dark_bg_primary: Color.rgba(23, 23, 23, 1), // ToDo: https://github.com/sberdevices/plasma/issues/1107
    dark_bg_secondary: Color.rgba(35, 35, 35, 1), // ToDo: https://github.com/sberdevices/plasma/issues/1107
    dark_bg_tertiary: Color.rgba(54, 54, 54, 1), // ToDo: https://github.com/sberdevices/plasma/issues/1107

    dark_input_border: Color.rgba(255, 255, 255, 0.16),
    dark_input_border_hover: Color.rgba(255, 255, 255, 0.32),
    dark_input_border_focus: plasmaStylesTokens.colors.textIconsAccentBrand1,

    dark_surface_Liquid01: Color.rgba(255, 255, 255, 0.06), // ToDo: https://github.com/sberdevices/plasma/issues/1107
    dark_surface_Liquid02: Color.rgba(255, 255, 255, 0.12), // ToDo: https://github.com/sberdevices/plasma/issues/1107
    dark_surface_Liquid03: Color.rgba(255, 255, 255, 0.2), // ToDo: https://github.com/sberdevices/plasma/issues/1107

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
    dark_button_warning: Color.rgb(227, 85, 2),
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

// const { typography: designers } = plasmaStylesTokens; // FixMe: v2.0

// const typography = {
//     display1: designers.sbS9696Display1Medium,
//     display2: designers.sbS6064Display2Medium,
//     display3: designers.sbS4852Display3Medium,

//     headline1: designers.sbS3236Headline1Bold,
//     headline2: designers.sbS2428Headline2Semibold,
//     headline3: designers.sbS2024Headline3Semibold,
//     headline4: designers.sbS2024Headline4Bold,

//     body1: designers.sbS1620Body1Medium,
//     body2: designers.sbS1620Body2Semibold,
//     body3: designers.sbS1620Body3Bold,

//     paragraph1: designers.sbS1622ParagraphText1Regular,
//     paragraph2: designers.sbS1622ParagraphText2Semibold,

//     footnote1: designers.sbS1418Footnote1Medium,
//     footnote2: designers.sbS1418Footnote2Semibold,

//     button1: designers.sbS1620Button1Semibold,
//     button2: designers.sbS1416Button2Semibold,

//     caption: designers.sbS1216CaptionMedium,

//     underline: designers.sbS1012Medium,
// };

export const designLanguage = {
    theme,
    colors,
    typography,
    gradients,
};
/* eslint-enable @typescript-eslint/camelcase */
