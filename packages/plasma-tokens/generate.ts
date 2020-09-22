import fs from 'fs';
import path from 'path';

import * as CSS from 'csstype';

import {
    DesignLanguage,
    Typography,
    Typograph} from './design-language/build/diez-plasma-tokens-web';
import {
    humanizeColor,
    normalizeTypographyStyle,
    matchFont,
    toVarValue,
    createThemeStyles,
    scaleTypograpyForDevices,
    withOutComments
} from './utils';


const ds = new DesignLanguage();


/*============================================*/
/*=                 THEME                    =*/
/*============================================*/

interface Token<T = {}> {
    value: T;
    comment?: string;
}

export interface TokenGroup<T = {}> {
    [key: string]: Token<T>
}

type TColor = string;


/*============================================*/
/*=                 COLORS                   =*/
/*============================================*/

interface BaseColors extends TokenGroup<TColor> {
    white: Token<TColor>,
    whitePrimary: Token<TColor>,
    whiteSecondary: Token<TColor>,
    whiteTertiary: Token<TColor>,

    black: Token<TColor>,
    blackPrimary: Token<TColor>,
    blackSecondary: Token<TColor>,
    blackTertiary: Token<TColor>,

    transparent: Token<TColor>,
};

const baseColors: BaseColors = {
    white: {
        value: humanizeColor(ds.colors.white.color),
        comment: 'Базовый белый цвет совпадает с whitePrimary',
    },
    whitePrimary: {
        value: humanizeColor(ds.colors.white_primary.color),
        comment: 'Первичный белый цвет',
    },
    whiteSecondary: {
        value: humanizeColor(ds.colors.white_secondary.color),
        comment: 'Вторичный белый цвет',
    },
    whiteTertiary: {
        value: humanizeColor(ds.colors.white_tertiary.color),
        comment: 'Третичный белый цвет',
    },

    black: {
        value: humanizeColor(ds.colors.black.color),
        comment: 'Базовый черный цвет совпадает с blackPrimary',
    },
    blackPrimary: {
        value: humanizeColor(ds.colors.black_primary.color),
        comment: 'Первичный черный цвет',
    },
    blackSecondary: {
        value: humanizeColor(ds.colors.black_secondary.color),
        comment: 'Вторичный черныйцвет',
    },
    blackTertiary: {
        value: humanizeColor(ds.colors.black_tertiary.color),
        comment: 'Третичный черный цвет',
    },

    transparent: {
        value: humanizeColor(ds.colors.transparent.color),
        comment: 'Прозрачный цвет',
    },
}


/*========================================*/
/*=  Modes:( dark/light & sber/eva/joy ) =*/
/*========================================*/

const themeColorsComments = {
    text: 'Базовый цвет текста, совпадает с primary',
    primary: 'Первичный цвет текста',
    secondary: 'Вторичный цвет текста',
    tertiary: 'Третичный цвет текста',

    background: 'Базовый цвет фона, совпадает с backgroundPrimary',
    backgroundPrimary: 'Первичный цвет фона',
    backgroundSecondary: 'Вторичный цвет фона',
    backgroundTertiary: 'Третичный цвет текста',

    accent: 'Акцентный цвет призыва к действию',
    warning: 'Цвет предупреждения',
    critical: 'Цвет ошибки',

    overlay: 'Цвет фона паранжи',

    gradient: 'Градиент для заливки основного фона',

    surfaceLiquid01: 'Цвет подложки 1',
    surfaceLiquid02: 'Цвет подложки 2',
    surfaceLiquid03: 'Цвет подложки 3',
    surfaceCard: 'Цвет подложки карточек',

    buttonPrimary: 'Первичный цвет контролов',
    buttonSecondary: 'Вторичный цвет контролов',

    buttonAccent: 'Акцентный цвет у контролов',
    buttonWarning: 'Цвет предупреждения у контролов',
    buttonCritical: 'Цвет ошибки у контролов',
    buttonChecked: 'Цвет зажатого контрола',
    buttonFocused: 'Цвет рамки фокуса у контрола',
}

export type ThemeTokens = {[key in keyof typeof themeColorsComments]: Token<TColor>};

type baseTheme = Omit<ThemeTokens, 'accent' | 'gradient' | 'buttonAccent' | 'buttonFocused'>

const dark: baseTheme = {
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

    warning: {
        value: humanizeColor(ds.theme.dark_warning.color),
        comment: themeColorsComments.warning,
    },
    critical: {
        value: humanizeColor(ds.theme.dark_critical.color),
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

    buttonWarning: {
        value: humanizeColor(ds.theme.dark_button_warning.color),
        comment: themeColorsComments.buttonWarning,
    },
    buttonCritical: {
        value: humanizeColor(ds.theme.dark_button_critical.color),
        comment: themeColorsComments.buttonCritical,
    },
    buttonChecked: {
        value: humanizeColor(ds.theme.dark_button_checked.color),
        comment: themeColorsComments.buttonChecked,
    },
};

const light: baseTheme = {
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
}

const darkSber: ThemeTokens =  {
    ...dark,
    accent: {
        value: humanizeColor(ds.theme.dark_sber.color),
        comment: themeColorsComments.accent,
    },
    buttonAccent: {
        value: humanizeColor(ds.theme.dark_button_sber.color),
        comment: themeColorsComments.buttonAccent,
    },
    buttonFocused: {
        value: humanizeColor(ds.theme.dark_focus_sber.color),
        comment: themeColorsComments.buttonFocused,
    },
    // TODO: export from figma is broken
    gradient: {
        value: 'linear-gradient(336.84deg, rgba(20, 116, 70, 0.6) 0%, rgba(8, 8, 8, 0) 64.88%), radial-gradient(100% 100% at 75.89% 100%, rgba(0, 133, 255, 0.24) 0%, rgba(0, 71, 255, 0.03) 100%), linear-gradient(180deg, rgba(8, 8, 8, 0) 50%, rgba(7, 71, 33, 0.3) 100%), linear-gradient(270deg, #061621 0%, rgba(8, 8, 8, 0) 100%)',
        comment: themeColorsComments.gradient,
    },
};

const darkEva: ThemeTokens = {
    ...dark,
    accent: {
        value: humanizeColor(ds.theme.dark_eva.color),
        comment: themeColorsComments.accent,
    },
    buttonAccent: {
        value: humanizeColor(ds.theme.dark_button_eva.color),
        comment: themeColorsComments.buttonAccent,
    },
    buttonFocused: {
        value: humanizeColor(ds.theme.dark_focus_eva.color),
        comment: themeColorsComments.buttonFocused,
    },
    gradient: {
        value: 'linear-gradient(336.9deg, #143787 0%, rgba(8, 8, 8, 0) 64.95%), radial-gradient(66.53% 100% at 73.33% 100%, rgba(110, 5, 193, 0.44) 0%, rgba(53, 19, 149, 0.1) 99.69%), linear-gradient(180.03deg, rgba(8, 8, 8, 0) 50%, rgba(25, 63, 152, 0.41) 99.97%), linear-gradient(270deg, rgba(39, 15, 107, 0.3) 0%, rgba(8, 8, 8, 0) 100%)',
        comment: themeColorsComments.gradient,
    },
};

const darkJoy: ThemeTokens = {
    ...dark,
    accent: {
        value: humanizeColor(ds.theme.dark_joy.color),
        comment: themeColorsComments.accent,
    },
    buttonAccent: {
        value: humanizeColor(ds.theme.dark_button_joy.color),
        comment: themeColorsComments.buttonAccent,
    },
    buttonFocused: {
        value: humanizeColor(ds.theme.dark_focus_joy.color),
        comment: themeColorsComments.buttonFocused,
    },
    gradient: {
        value: 'linear-gradient(336.9deg, rgba(255, 156, 101, 0.24) 0%, rgba(8, 8, 8, 0) 64.95%), radial-gradient(66.53% 100% at 73.33% 100%, rgba(61, 19, 149, 0.34) 0%, rgba(19, 24, 149, 0.1) 99.69%), linear-gradient(180.03deg, rgba(8, 8, 8, 0) 50%, rgba(255, 215, 179, 0.15) 99.97%), linear-gradient(270deg, rgba(107, 15, 87, 0.2) 0%, rgba(8, 8, 8, 0) 100%)',
        comment: themeColorsComments.gradient,
    },
}

const lightSber: ThemeTokens = {
    ...light,
    accent: {
        value: humanizeColor(ds.theme.light_sber.color),
        comment: themeColorsComments.accent,
    },
    buttonAccent: {
        value: humanizeColor(ds.theme.light_button_sber.color),
        comment: themeColorsComments.buttonAccent,
    },
    buttonFocused: {
        value: humanizeColor(ds.theme.light_focus_sber.color),
        comment: themeColorsComments.buttonFocused,
    },
    gradient: {
        value: 'linear-gradient(336.9deg, rgba(4, 255, 44, 0.02) 0%, rgba(255, 255, 255, 0) 64.95%), radial-gradient(66.53% 100% at 73.33% 100%, rgba(0, 179, 255, 0.06) 0%, rgba(0, 209, 255, 0.01) 99.69%), linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, rgba(0, 251, 59, 0.05) 100%), linear-gradient(270deg, rgba(6, 195, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%);',
        comment: themeColorsComments.gradient,
    },

};

const lightEva: ThemeTokens = {
    ...light,
    accent: {
        value: humanizeColor(ds.theme.light_eva.color),
        comment: themeColorsComments.accent,
    },
    buttonAccent: {
        value: humanizeColor(ds.theme.light_button_eva.color),
        comment: themeColorsComments.buttonAccent,
    },
    buttonFocused: {
        value: humanizeColor(ds.theme.light_focus_eva.color),
        comment: themeColorsComments.buttonFocused,
    },
    gradient: {
        value: 'linear-gradient(336.9deg, rgba(0, 224, 255, 0.06) 0%, rgba(255, 255, 255, 0) 64.95%), radial-gradient(66.53% 100% at 73.33% 100%, rgba(0, 87, 255, 0.04) 0%, rgba(87, 8, 255, 0.01) 99.69%), linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, rgba(0, 224, 255, 0.06) 100%), linear-gradient(270deg, rgba(0, 71, 253, 0.02) 0%, rgba(255, 255, 255, 0) 100%)',
        comment: themeColorsComments.gradient,
    },
};

const lightJoy: ThemeTokens = {
    ...light,
    accent: {
        value: humanizeColor(ds.theme.light_joy.color),
        comment: themeColorsComments.accent,
    },
    buttonAccent: {
        value: humanizeColor(ds.theme.light_button_joy.color),
        comment: themeColorsComments.buttonAccent,
    },
    buttonFocused: {
        value: humanizeColor(ds.theme.light_focus_joy.color),
        comment: themeColorsComments.buttonFocused,
    },
    // background: lToRgba(ds.gradients.light_bg_joy.linearGradient),
    gradient: {
        value: 'linear-gradient(336.9deg, rgba(255, 200, 3, 0.05) 0%, rgba(255, 255, 255, 0) 64.95%), radial-gradient(66.53% 100% at 73.33% 100%, rgba(148, 0, 238, 0.02) 0%, rgba(160, 4, 255, 0.01) 99.69%), linear-gradient(180.03deg, rgba(255, 255, 255, 0) 50%, rgba(255, 184, 0, 0.04) 99.97%), linear-gradient(270deg, rgba(240, 0, 187, 0.03) 0%, rgba(255, 255, 255, 0) 100%)',
        comment: themeColorsComments.gradient,
    },
};


/*========================================*/
/*=         TYPOGRAPHY & FONTS           =*/
/*========================================*/


type CSSProperties = CSS.Properties<string | number>;
type Typos = keyof Typography;

// because diez/ds needs document =(
require('jsdom-global')();

type TypoStyles =  {[key in Typos]: CSSProperties};
type Typo = {
    fontSizes: number[],
    fonts: Record<string, string>,
    fontWeights: Record<string, number>,
    lineHeights: number[],
    letterSpacings: string[],

    text: TypoStyles,
    styles?: {[key: string]: CSSProperties },
}
const collectTypography = (scale: boolean): Typo => {
    
    const text = {} as TypoStyles;
    const fonts = {} as Record<string, string>;
    const fontWeights = {} as Record<string, number>;
    const fontSizeSet = new Set<number>();
    const lineHeightSet = new Set<number>();
    const letterSpacingSet = new Set<string>();

    for (let entry of Object.entries(ds.typography)) {
        const [key, tv] = entry as [Typos, Typograph];
        let style = normalizeTypographyStyle(tv.style);

        if (scale) {
            style = scaleTypograpyForDevices(style);
        }
    
        if (key === 'underline') {
            style.textTransform = 'uppercase';
        }
    
        const { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } = style;
        const fontType = matchFont(style);
        
        // https://system-ui.com/theme/
        fonts[fontType] = fontFamily;
        fontWeights[fontType] = fontWeight;
    
        fontSizeSet.add(parseInt(fontSize));
        lineHeightSet.add(parseInt(lineHeight || fontSize));
        letterSpacingSet.add(String(letterSpacing));
    
        text[key] = style;
    }
    
    const fontSizes = [...fontSizeSet].sort((a, b) => a - b);
    const lineHeights = [...lineHeightSet].sort((a, b) => a - b);
    const letterSpacings = [...letterSpacingSet].sort((a, b) => {
        // treat 'normal' as 0
        const aa = isNaN(parseFloat(a)) ? 0 : parseFloat(a);
        const bb = isNaN(parseFloat(b)) ? 0 : parseFloat(b);
    
        return aa - bb;
    });
    
    return {
        fontSizes,
        fonts,
        fontWeights,
        lineHeights,
        letterSpacings,
    
        text,
    };
};


/*========================================*/
/*=         GENERATION OF TS             =*/
/*========================================*/
fs.existsSync('src') || fs.mkdirSync('src');

const roboComment = '\n// Generated by robots, don\'t change by hand\n\n';
type TokenType = string | CSSProperties | Array<string|number> | Record<string, string>

const generateTokens = (tokens: TokenGroup<TokenType>, css?: boolean) => {
    return Object.entries(tokens).reduce((acc, [key, token]) => {
        const { comment, value } = token;

        if (comment) {
            acc += `/** ${comment} */\n`;
        }

        if (typeof value === 'string') {
            const v = css ? toVarValue(`colors-${key}`, value) : value;
            acc += `export const ${key} = '${v}'\n`;
        } else {
            const objToStr = JSON.stringify(value, null, 4).replace(/"/g, '\'');
            acc += `export const ${key} = ${objToStr};`;
        }

        acc += '\n';

        return acc;
    }, roboComment);
}

// Генерация цветов и тем
fs.existsSync('src/colors') || fs.mkdirSync('src/colors');
fs.writeFileSync(path.join('src', 'colors', 'index.ts'), generateTokens({
    ...baseColors,
    ...darkSber,
}, true));

fs.writeFileSync(path.join('src', 'colors', 'values.ts'), generateTokens({
    ...baseColors,
    ...darkSber,
}));

const themes = {
    darkSber,
    darkEva,
    darkJoy,
    lightSber,
    lightEva,
    lightJoy,
};

type themeGenerator = (theme: ThemeTokens & TokenGroup<TColor>, themeName: string, ) => string;
const generateThemes = (themes_dir: string, generator: themeGenerator, needIndex: boolean = true) => {
    fs.existsSync(themes_dir) || fs.mkdirSync(themes_dir);

    let themeIndexes = roboComment;
    for (let [themeName, theme] of Object.entries(themes)) {
        themeIndexes += `export { ${themeName} } from './${themeName}';\n`;

        const themeTS = generator(theme, themeName)
        fs.writeFileSync(path.join(themes_dir, `${themeName}.ts`), themeTS);
    }

    needIndex && fs.writeFileSync(path.join(themes_dir, 'index.ts'), themeIndexes);   
}

generateThemes(path.join('themes'), (theme, themeName) => {
    const themeStyles = createThemeStyles(withOutComments(theme));

    return roboComment +
        `export const ${themeName} = ${JSON.stringify(themeStyles, null, 4)};\n`;
});

generateThemes(path.join('themesValues'), (theme) => {
    return generateTokens(theme);
}, false);

// Генерация типографической сетки
const generateTypography = (typography_dir: string, typo: Typo) => {
    const typography_dir_values = typography_dir + 'Values';
    fs.existsSync(typography_dir_values) || fs.mkdirSync(typography_dir_values);
    fs.existsSync(typography_dir) || fs.mkdirSync(typography_dir);

    let typoIndexes = roboComment;
    const {
        fontSizes,
        fonts,
        fontWeights,
        lineHeights,
        letterSpacings,
        text
    } = typo;

    for (let [name, styles] of Object.entries({
        fontSizes,
        fonts,
        fontWeights,
        lineHeights,
        letterSpacings,
    })) {
        typoIndexes += `export { ${name} } from './${name}';\n`;

        const textTS = generateTokens({ [name] : { value: styles }});
        fs.writeFileSync(path.join(typography_dir_values, `${name}.ts`), textTS);
    }

    fs.writeFileSync(path.join(typography_dir_values, 'index.ts'), typoIndexes);
    typoIndexes = roboComment;

    for (let [name, styles] of Object.entries(
        text
    )) {
        typoIndexes += `export { ${name} } from './${name}';\n`;

        const textTS = generateTokens({ [name] : { value: styles }});
        fs.writeFileSync(path.join(typography_dir, `${name}.ts`), textTS);
    }

    fs.writeFileSync(path.join(typography_dir, 'index.ts'), typoIndexes);
};

const typo = collectTypography(false);
generateTypography(path.join('src', 'typography@1x'), typo);

// For SberBox & SberPortal we scale typography by 2
const typo2x = collectTypography(true);
generateTypography(path.join('src', 'typography@2x'), typo2x);


const indexTS = roboComment +
`
import * as colors from './colors';
import * as colorValues from './colors/values';
// because x2 is default for canvas apps
import * as typographyx1 from './typography@1x';
import * as typographyx1Values from './typography@1xValues';
import * as typography from './typography@2x';
import * as typographyx2Values from './typography@2xValues';

export { colors };
export { colorValues };
export { typography };

export * from './colors';
export * from './typography@2x';
export * from './typography@2xValues';

export { typographyx1 };
export { typographyx1Values };
export { typography as typographyx2 };
export { typographyx2Values };
`;

fs.writeFileSync(path.join('src', 'index.ts'), indexTS);




/*========================================*/
/*=       GENERATION OF theme.json       =*/
/*========================================*/

const colors  = {
    ...withOutComments(baseColors),
    // Dark Sber is default
    ...withOutComments(darkSber),
    // check https://theme-ui.com/theme-spec/#color-modes
    modes: {
        darkSber: withOutComments(darkSber),
        darkEva: withOutComments(darkEva),
        darkJoy: withOutComments(darkJoy),
        lightSber: withOutComments(lightSber),
        lightEva: withOutComments(lightEva),
        lightJoy: withOutComments(lightJoy),
    }
};

// https://theme-ui.com/theme-spec/#styles
const addStylesToTypo = (typo: Typo) => {
    const { text } = typo;

    typo.styles = {
        h1: {
            ...text.headline1,
            margin: 0,
        },
        h2: {
            ...text.headline2,
            margin: 0
        },
        h3: {
            ...text.headline3,
            margin: 0
        },
        h4: {
            ...text.headline4,
            margin: 0
        },
        p: {
            ...text.paragraph1,
            margin: 0
        },
        root: {
            ...text.body1,
            color: colors.text,
            backgroundColor: colors.background,
        },
    };

    return typo;
};

const generateThemeJSON = (typo: Typo) => {
    const { fontSizes, ...rest } = addStylesToTypo(typo);
    // font-size is often first
    // https://system-ui.com/theme/
    const theme = {
        fontSizes,
        colors,
        ...rest,
    };

    return JSON.stringify(theme, null, 4) + '\n';
}

fs.writeFileSync('theme.json', generateThemeJSON(typo));
fs.writeFileSync('theme@2x.json', generateThemeJSON(typo2x));



    
// TODO: Забрать сетки из figma
// theme: {
//   breakpoints: [],
//   space: [],
//   borders: [],
//   radii: [],
//   sizes
//   width: [],
//   heights: [],
//   maxWidths: [],
//   zIndices
//   transitions
//   shadows
//   gradients: {},
// }
