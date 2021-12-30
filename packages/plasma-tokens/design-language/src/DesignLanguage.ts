import {
    Color,
    DropShadow,
    Image,
    Lottie,
    Toward,
    Typograph,
    Font,
    LinearGradient,
    Point2D,
    TextAlignment,
} from '@diez/prefabs';
// import {Margin} from './components/Margin';

// import { plasmaStylesCopyTokens } from './designs/PlasmaStylesCopy.figma'
import { plasmaStylesTokens } from './designs/PlasmaStyles.figma';

import { colorToCss, linearGradientToCss } from '@diez/web-sdk-common';
// import { toRgba, toLGRgba, toPrecision } from './utils';

const colors = {
    white_primary: plasmaStylesTokens.colors.textIconsGlblWhitePrimary,
    white_secondary: plasmaStylesTokens.colors.textIconsGlblWhiteSecondary,
    white_tertiary: plasmaStylesTokens.colors.textIconsGlblWhiteTetriary,

    black_primary: plasmaStylesTokens.colors.textIconsGlblBlackPrimary,
    black_secondary: plasmaStylesTokens.colors.textIconsGblBlackSecondary,
    black_tertiary: plasmaStylesTokens.colors.textIconsGlblBlackTetriary,

    white: plasmaStylesTokens.colors.textIconsGlblWhitePrimary,
    black: plasmaStylesTokens.colors.textIconsGblBlackPrimary,

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

// const palette = {
const theme = {
    // dark
    dark_primary: plasmaStylesTokens.colors.textIconsPrimary1,
    dark_secondary: plasmaStylesTokens.colors.textIconsSecondary1,
    dark_tertiary: plasmaStylesTokens.colors.textIconsTertiary,

    dark_paragraph: plasmaStylesTokens.colors.textIconsParagraph1,
    dark_inverse: plasmaStylesTokens.colors.textIconsInverse1,

    dark_success: plasmaStylesTokens.colors.textIconsStatusSuccess1,
    dark_warning: plasmaStylesTokens.colors.textIconsStatusWarning1,
    dark_critical: plasmaStylesTokens.colors.textIconsStatusCritical1,

    dark_sber: plasmaStylesTokens.colors.textIconsAccentSber1,
    dark_eva: plasmaStylesTokens.colors.textIconsAccentAthena1,
    dark_joy: plasmaStylesTokens.colors.textIconsAccentJoy1,
    dark_brand: plasmaStylesTokens.colors.textIconsAccentBrand1,

    dark_bg: plasmaStylesTokens.colors.backgroundDefault,
    dark_overlay: Color.rgba(0, 0, 0, 0.8),

    dark_bg_primary: Color.rgba(23, 23, 23, 1),
    dark_bg_secondary: Color.rgba(35, 35, 35, 1),
    dark_bg_tertiary: Color.rgba(54, 54, 54, 1),

    dark_surface_Liquid01: Color.rgba(255, 255, 255, 0.06), // FixMe: v2.0 переименовать в transparent01
    dark_surface_Liquid02: Color.rgba(255, 255, 255, 0.12), // FixMe: v2.0 переименовать в transparent02
    dark_surface_Liquid03: Color.rgba(255, 255, 255, 0.2), // FixMe: v2.0 переименовать в transparent03

    dark_surface_solid01: Color.rgba(23, 23, 23, 1),
    dark_surface_solid02: Color.rgba(35, 35, 35, 1),
    dark_surface_solid03: Color.rgba(54, 54, 54, 1),

    dark_surface_card: Color.rgba(255, 255, 255, 0.12),

    dark_button_sber: plasmaStylesTokens.colors.buttonPrimarySber1,
    dark_button_eva: plasmaStylesTokens.colors.buttonPrimaryAthena1,
    dark_button_joy: plasmaStylesTokens.colors.buttonPrimaryJoy1,
    dark_button_brand: plasmaStylesTokens.colors.buttonPrimaryBrand1,

    dark_button_primary: plasmaStylesTokens.colors.buttonPrimaryDefault1,
    dark_button_secondary: plasmaStylesTokens.colors.buttonSecondaryDefault1,

    dark_button_success: plasmaStylesTokens.colors.buttonStatusSuccess1,
    dark_button_warning: plasmaStylesTokens.colors.buttonStatusWarning,
    dark_button_critical: plasmaStylesTokens.colors.buttonStatusCritical1,
    dark_button_checked: plasmaStylesTokens.colors.buttonStatusChecked1,

    dark_focus_sber: plasmaStylesTokens.colors.buttonPrimarySber1,
    dark_focus_eva: plasmaStylesTokens.colors.buttonPrimaryAthena1,
    dark_focus_joy: plasmaStylesTokens.colors.buttonPrimaryJoy1,
    dark_focus_brand: plasmaStylesTokens.colors.buttonPrimaryBrand1,

    dark_speech_bubble_sent: Color.rgba(0, 0, 0, 0.28),
    dark_speech_bubble_received: Color.rgba(255, 255, 255, 0.12),

    // light
    light_primary: plasmaStylesTokens.colors.textIconsPrimary6,
    light_secondary: plasmaStylesTokens.colors.textIconsSecondary5,
    light_tertiary: plasmaStylesTokens.colors.textIconsTertiary1,

    light_paragraph: plasmaStylesTokens.colors.textIconsParagraph,
    light_inverse: plasmaStylesTokens.colors.textIconsInverse,

    light_success: plasmaStylesTokens.colors.textIconsStatusSuccess,
    light_warning: plasmaStylesTokens.colors.textIconsStatusWarning,
    light_critical: plasmaStylesTokens.colors.textIconsStatusCritical,

    light_sber: plasmaStylesTokens.colors.textIconsAccentSber,
    light_eva: plasmaStylesTokens.colors.textIconsAccentAthena,
    light_joy: plasmaStylesTokens.colors.textIconsAccentJoy,
    light_brand: plasmaStylesTokens.colors.textIconsAccentBrand,

    light_bg: Color.rgba(255, 255, 255, 1),
    light_overlay: Color.rgba(0, 0, 0, 0.8),

    light_bg_primary: Color.rgba(255, 255, 255, 1),
    light_bg_secondary: Color.rgba(255, 255, 255, 1),
    light_bg_tertiary: Color.rgba(255, 255, 255, 1),

    light_surface_Liquid01: Color.rgba(8, 8, 8, 0.02), // FixMe: v2.0 переименовать в transparent01
    light_surface_Liquid02: Color.rgba(8, 8, 8, 0.06), // FixMe: v2.0 переименовать в transparent02
    light_surface_Liquid03: Color.rgba(8, 8, 8, 0.12), // FixMe: v2.0 переименовать в transparent03

    light_surface_solid01: Color.rgba(250, 250, 250, 1),
    light_surface_solid02: Color.rgba(240, 240, 240, 1),
    light_surface_solid03: Color.rgba(225, 225, 225, 1),

    light_surface_card: Color.rgba(255, 255, 255, 1),

    light_button_sber: plasmaStylesTokens.colors.buttonPrimarySber,
    light_button_eva: plasmaStylesTokens.colors.buttonPrimaryAthena,
    light_button_joy: plasmaStylesTokens.colors.buttonPrimaryJoy,
    light_button_brand: plasmaStylesTokens.colors.buttonPrimaryBrand,

    light_button_primary: plasmaStylesTokens.colors.buttonPrimaryDefault,
    light_button_secondary: plasmaStylesTokens.colors.buttonSecondaryDefault,

    light_button_success: plasmaStylesTokens.colors.buttonStatusSuccess,
    light_button_warning: plasmaStylesTokens.colors.buttonStatusWarning,
    light_button_critical: plasmaStylesTokens.colors.buttonStatusCritical,
    light_button_checked: plasmaStylesTokens.colors.buttonStatusChecked,

    light_focus_sber: plasmaStylesTokens.colors.buttonPrimarySber,
    light_focus_eva: plasmaStylesTokens.colors.buttonPrimaryAthena,
    light_focus_joy: plasmaStylesTokens.colors.buttonPrimaryJoy,
    light_focus_brand: plasmaStylesTokens.colors.buttonPrimaryBrand,

    light_speech_bubble_sent: Color.rgba(8, 8, 8, 0.4),
    light_speech_bubble_received: Color.rgba(0, 0, 0, 0.02),
};

const gradients = {
    // dark
    dark_bg_sber:
        'linear-gradient(336.84deg, rgba(20, 116, 70, 0.6) 0%, rgba(8, 8, 8, 0) 64.88%), radial-gradient(100% 100% at 75.89% 100%, rgba(0, 133, 255, 0.24) 0%, rgba(0, 71, 255, 0.03) 100%), linear-gradient(180deg, rgba(8, 8, 8, 0) 50%, rgba(7, 71, 33, 0.3) 100%), linear-gradient(270deg, #061621 0%, rgba(8, 8, 8, 0) 100%)',
    dark_bg_eva:
        'linear-gradient(336.9deg, #143787 0%, rgba(8, 8, 8, 0) 64.95%), radial-gradient(66.53% 100% at 73.33% 100%, rgba(110, 5, 193, 0.44) 0%, rgba(53, 19, 149, 0.1) 99.69%), linear-gradient(180.03deg, rgba(8, 8, 8, 0) 50%, rgba(25, 63, 152, 0.41) 99.97%), linear-gradient(270deg, rgba(39, 15, 107, 0.3) 0%, rgba(8, 8, 8, 0) 100%)',
    dark_bg_joy:
        'linear-gradient(336.9deg, rgba(255, 156, 101, 0.24) 0%, rgba(8, 8, 8, 0) 64.95%), radial-gradient(66.53% 100% at 73.33% 100%, rgba(61, 19, 149, 0.34) 0%, rgba(19, 24, 149, 0.1) 99.69%), linear-gradient(180.03deg, rgba(8, 8, 8, 0) 50%, rgba(255, 215, 179, 0.15) 99.97%), linear-gradient(270deg, rgba(107, 15, 87, 0.2) 0%, rgba(8, 8, 8, 0) 100%)',
    dark_bg_brand: '#080808',

    dark_device_sber:
        'linear-gradient(26.05deg, rgba(15, 153, 24, 0.28) 0%, rgba(8, 8, 8, 0) 72.24%), radial-gradient(100% 100% at 0% 100%, rgba(0, 170, 255, 0.24) 0%, rgba(8, 8, 8, 0) 99.69%), radial-gradient(74.68% 149.35% at 50% 149.35%, rgba(0, 102, 255, 0.6) 0%, rgba(8, 8, 8, 0) 99.69%)',
    dark_device_eva:
        'linear-gradient(26.05deg, rgba(26, 140, 255, 0.16) 0%, rgba(8, 8, 8, 0) 72.24%), radial-gradient(100% 100% at 0% 100%, rgba(0, 85, 255, 0.28) 0%, rgba(8, 8, 8, 0) 99.69%), radial-gradient(74.68% 149.35% at 50% 149.35%, rgba(128, 0, 255, 0.48) 0%, rgba(8, 8, 8, 0) 99.69%)',
    dark_device_joy:
        'linear-gradient(26.05deg, rgba(255, 148, 77, 0.24) 0%, rgba(8, 8, 8, 0) 72.24%), radial-gradient(100% 100% at 0% 100%, rgba(138, 60, 215, 0.24) 0%, rgba(8, 8, 8, 0) 99.69%), radial-gradient(74.68% 149.35% at 50% 149.35%, rgba(89, 22, 215, 0.48) 0%, rgba(8, 8, 8, 0) 99.69%)',
    dark_device_brand: '#080808',

    dark_voice_phrase_sber: plasmaStylesTokens.gradients.textIconsGradientSber1,
    dark_voice_phrase_eva: plasmaStylesTokens.gradients.textIconsGradientAthena1,
    dark_voice_phrase_joy: plasmaStylesTokens.gradients.textIconsGradientJoy1,
    dark_voice_phrase_brand: plasmaStylesTokens.gradients.textIconsGradientBrand1,

    // light
    light_bg_sber:
        'linear-gradient(336.9deg, rgba(4, 255, 44, 0.02) 0%, rgba(255, 255, 255, 0) 64.95%), radial-gradient(66.53% 100% at 73.33% 100%, rgba(0, 179, 255, 0.06) 0%, rgba(0, 209, 255, 0.01) 99.69%), linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, rgba(0, 251, 59, 0.05) 100%), linear-gradient(270deg, rgba(6, 195, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
    light_bg_eva:
        'linear-gradient(336.9deg, rgba(0, 224, 255, 0.06) 0%, rgba(255, 255, 255, 0) 64.95%), radial-gradient(66.53% 100% at 73.33% 100%, rgba(0, 87, 255, 0.04) 0%, rgba(87, 8, 255, 0.01) 99.69%), linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, rgba(0, 224, 255, 0.06) 100%), linear-gradient(270deg, rgba(0, 71, 253, 0.02) 0%, rgba(255, 255, 255, 0) 100%)',
    light_bg_joy:
        'linear-gradient(336.9deg, rgba(255, 200, 3, 0.05) 0%, rgba(255, 255, 255, 0) 64.95%), radial-gradient(66.53% 100% at 73.33% 100%, rgba(148, 0, 238, 0.02) 0%, rgba(160, 4, 255, 0.01) 99.69%), linear-gradient(180.03deg, rgba(255, 255, 255, 0) 50%, rgba(255, 184, 0, 0.04) 99.97%), linear-gradient(270deg, rgba(240, 0, 187, 0.03) 0%, rgba(255, 255, 255, 0) 100%)',
    light_bg_brand: '#F5F5F5',

    light_device_sber:
        'linear-gradient(26.05deg, rgba(24, 242, 61, 0.06) 0%, rgba(255, 255, 255, 0) 72.24%), radial-gradient(100% 100% at 0% 100%, rgba(0, 170, 255, 0.04) 0%, rgba(255, 255, 255, 0) 99.69%), radial-gradient(74.68% 149.35% at 50% 149.35%, rgba(0, 170, 255, 0.12) 0%, rgba(255, 255, 255, 0) 99.69%)',
    light_device_eva:
        'linear-gradient(26.05deg, rgba(26, 178, 255, 0.08) 0%, rgba(255, 255, 255, 0) 72.24%), radial-gradient(100% 100% at 0% 100%, rgba(0, 170, 255, 0.04) 0%, rgba(255, 255, 255, 0) 99.69%), radial-gradient(74.68% 149.35% at 50% 149.35%, rgba(128, 0, 255, 0.08) 0%, rgba(255, 255, 255, 0) 99.69%)',
    light_device_joy:
        'linear-gradient(26.05deg, rgba(255, 219, 77, 0.1) 0%, rgba(255, 255, 255, 0) 72.24%), radial-gradient(100% 100% at 0% 100%, rgba(163, 71, 255, 0.04) 0%, rgba(255, 255, 255, 0) 99.69%), radial-gradient(74.68% 149.35% at 50% 149.35%, rgba(140, 26, 255, 0.1) 0%, rgba(255, 255, 255, 0) 99.69%)',
    light_device_brand: '#F5F5F5',

    light_voice_phrase_sber: plasmaStylesTokens.gradients.textIconsGradientSber,
    light_voice_phrase_eva: plasmaStylesTokens.gradients.textIconsGradientAthena,
    light_voice_phrase_joy: plasmaStylesTokens.gradients.textIconsGradientJoy,
    light_voice_phrase_brand: plasmaStylesTokens.gradients.textIconsGradientBrand,
};
//
// /**
//  * You can reference properties from other components.
//  */
// const palette = {
//   contentBackground: colors.white,
//   text: colors.black,
//   caption: colors.purple,
//   headerBackground: LinearGradient.make(Toward.Bottom, colors.darkPurple, colors.black),
// }

/**
 * All of rich language features of TypeScript are at your disposal; for example,
 * you can define an object to keep track of your fonts.
 */
// const Fonts = {
//   SourceSansPro: {
//     Regular: Font.fromFile('assets/SourceSansPro-Regular.ttf'),
//   },
// }

/**
 * Typographs encapsulate type styles with support for a specific font, font size,
 * and color. More typograph properties are coming soon.
 */
// const typography = {
//   heading1: new Typograph({
//     font: Fonts.SourceSansPro.Regular,
//     fontSize: 24,
//     color: palette.text,
//   }),
//
//   body: new Typograph({
//     font: Fonts.SourceSansPro.Regular,
//     fontSize: 18,
//     color: palette.text,
//     alignment: TextAlignment.Center,
//   }),
//
//   caption: new Typograph({
//     font: Fonts.SourceSansPro.Regular,
//     fontSize: 14,
//     color: palette.caption,
//   }),
// }

const { typography: disigners } = plasmaStylesTokens;

const typography = {
    display1: disigners.sbS9696Display1Medium,
    display2: disigners.sbS6064Display2Medium,
    display3: disigners.sbS4852Display3Medium,

    headline1: disigners.sbS3236Headline1Bold,
    headline2: disigners.sbS2428Headline2Semibold,
    headline3: disigners.sbS2024Headline3Semibold,
    headline4: disigners.sbS2024Headline4Bold,

    body1: disigners.sbS1620Body1Medium,
    body2: disigners.sbS1620Body2Semibold,
    body3: disigners.sbS1620Body3Bold,

    paragraph1: disigners.sbS1622ParagraphText1Regular,
    paragraph2: disigners.sbS1622ParagraphText2Semibold,

    footnote1: disigners.sbS1418Footnote1Medium,
    footnote2: disigners.sbS1418Footnote2Semibold,

    button1: disigners.sbS1620Button1Semibold,
    button2: disigners.sbS1416Button2Semibold,

    caption: disigners.sbS1216CaptionMedium,

    underline: disigners.sbS1012Medium,
};

// ADD Helvetica & Arial to 'sans-serif' fallbacks
function addFallbacks(font: Font) {
    const fallback = font.fallbacks.pop();
    if (fallback === 'sans-serif') {
        font.fallbacks.push('Helvetica');
        font.fallbacks.push('Arial');
        font.fallbacks.push(fallback);
        console.log(`Add fallbacks ${font.fallbacks} to: ${font.name}`);
    }
}

const fonts = plasmaStylesTokens.fonts;
Object.keys(fonts.SbSansText).forEach((key) => {
    const font = (fonts.SbSansText as { [key: string]: Font })[key];
    addFallbacks(font);
});

//
// /**
//  * In addition to colors and typography, you can also collect other types of
//  * design language primitives in components as well — such as images, icons &
//  * animations.
//  */
// const images = {
//   logo: Image.responsive('assets/logo.png', 52, 48),
//   masthead: Image.responsive('assets/masthead.png', 208, 88),
// }
//
// /**
//  * You can even collect your own custom components.
//  */
// const layoutValues = {
//   spacingSmall: 5,
//   spacingMedium: 25,
//   spacingLarge: 40,
//   contentMargin: new Margin({
//     top: 40,
//     left: 10,
//     right: 10,
//     bottom: 10,
//   }),
// }
//
// /**
//  * You can also define strings.
//  */
// const strings = {
//   title: 'Diez',
//   caption: 'Keep your designs in sync with code',
//   helper: 'Modify the contents of “src/DesignLanguage.ts” (relative to the root of the Diez project) to see changes to the design language in real time.',
// }
//
// const shadows = {
//   logo: new DropShadow({
//     offset: Point2D.make(0, 1),
//     radius: 16,
//     color: colors.black.fade(0.59),
//   }),
// }
//
// /**
//  * Note how this component is exported from `index.ts`. Diez compiles these
//  * exported components for your apps' codebases.
//  *
//  * For example:
//  *   - If you run `yarn start web` or `npm run start web`, Diez will create a Node package called
//  *     `diez-plasma-tokens-web`. Look for `App.jsx` inside `examples/web` to see
//  *     how you can use Diez in a web codebase.
//  *   - If you run `yarn start ios` or `npm run start ios`, Diez will create a CocoaPods dependency
//  *     called `DiezPlasmaTokens`. Look for `ViewController.swift` inside
//  *     `examples/ios` to see how you can use Diez in an iOS codebase.
//  *   - If you run `yarn start android` or `npm run start android`, Diez will create an Android library.
//  *     Look for `MainActivity.kt` inside `examples/android` to see how you can
//  *     use Diez in an Android codebase.
//   *  - If you run `yarn start web` or `npm run start web`, Diez will create a Web App with your tokens.
//  */

// type Colourfull = { [key: string]: Color | LinearGradient | string }

// const transform = <T extends Colourfull>(colors: T) => {
//   return Object.entries(colors).reduce((a, [key, value]) => {
//     const acc: Colourfull = a as T;
//     if (value instanceof Color) {
//       acc[key] = toPrecision(value) as Color;
//       // console.log(key, value, acc[key]);
//     } else if (value instanceof LinearGradient) {
//       // TODO: transform lgrads too
//       // acc[key] = toLGRgba(linearGradientToCss(value));
//       acc[key] = value;
//     } else {
//       acc[key] = value;
//     }

//     return acc as T;
//   }, {} as T);
// };

export const designLanguage = {
    // palette,
    theme,
    colors,
    //   colors: plasmaStylesTokens.colors,
    // typography: plasmaStylesTokens.typography,
    typography,
    gradients,
    // gradients: plasmaStylesTokens.gradients,
    // shadows: plasmaStylesTokens.shadows,
    // palette,
    //   typography,
    // images,
    // layoutValues,
    // strings,
    // shadows,
    // loadingAnimation: Lottie.fromJson('assets/loadingAnimation.json', false),
};
