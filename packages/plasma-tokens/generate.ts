import fs from 'fs';
import path from 'path';
import {
    ROBO_COMMENT,
    HTML_FONT_SIZE,
    writeGeneratedToFS,
    generateTokens,
    generateThemes,
    generateTypography,
    generateTypographyValues,
    generateTypo,
    generateThemeJSON,
    createTypoStyles,
    flattenTokenData,
} from '@sberdevices/plasma-tokens-utils';
import type { TypoSystem } from '@sberdevices/plasma-tokens-utils';

import { baseColors, themes, typoSystem, deviceScales } from './data';
import type { ThemeTokens, TypographyTypes } from './data';

const OUT_DIR = 'src';
const COLORS_DIR = path.join(OUT_DIR, 'colors');
const THEMES_DIR = 'themes';
const THEMES_VALUES_DIR = 'themesValues';
const TYPOGRAPHY_DIR = path.join(OUT_DIR, 'typography');
const TYPOGRAPHY_VALUES_DIR = path.join(OUT_DIR, 'typographyValues');
const TYPO_DIR = 'typo';
const ROOT_INDEX_TS = path.join(OUT_DIR, 'index.ts');

fs.existsSync(OUT_DIR) || fs.mkdirSync(OUT_DIR);

/** ========================================== **/
/** ========= Генерация цветов и тем ========= **/
/** ========================================== **/

// Генерация цветов
writeGeneratedToFS(COLORS_DIR, [
    // Файл с токенами CSS-Variables (с дефолтными значениями)
    { file: 'index.ts', content: generateTokens(themes.darkSber, 'css', 'colors') },
    // Файл с токенами (JS-переменными) для инъекции значения напрямую
    { file: 'values.ts', content: generateTokens(themes.darkSber) },
]);

// Генерация и запись файлов тем для создания глобальных стилей
writeGeneratedToFS(THEMES_DIR, generateThemes(themes, 'cssobject', true));

// Отдельные файлы для импорта в компонентах
writeGeneratedToFS(THEMES_VALUES_DIR, generateThemes(themes, 'tokens', false));

/** =================================================== **/
/** ========= Генерация типографической сетки ========= **/
/** =================================================== **/

// Типографика, разложенная по типам компонентов
writeGeneratedToFS(TYPOGRAPHY_DIR, generateTypography(typoSystem));

// Параметрическая система (к примеру, все размеры шрифтов / высоты строк)
writeGeneratedToFS(TYPOGRAPHY_VALUES_DIR, generateTypographyValues(typoSystem));

// Типографика по типам устройств для создания глобального стиля
writeGeneratedToFS(
    TYPO_DIR,
    generateTypo({
        sberBox: createTypoStyles(typoSystem, deviceScales.sberBox),
        sberPortal: createTypoStyles(typoSystem, deviceScales.sberPortal),
        touch: createTypoStyles(typoSystem, deviceScales.touch),
    }),
);

/** ====================================== **/
/** ========= Генерация index.ts ========= **/
/** ====================================== **/

const indexTsContent = `${ROBO_COMMENT}import * as colors from './colors';
import * as colorValues from './colors/values';
import * as typography from './typography';
import * as typographyValues from './typographyValues';

export { colors };
export { colorValues };
export { typography };
export { typographyValues };

export const sberPortalScale = ${deviceScales.sberPortal};
export const sberBoxScale = ${deviceScales.sberBox};
export const touchScale = ${deviceScales.touch};
export const scalingPixelBasis = ${HTML_FONT_SIZE};

export * from './colors';
export * from './typography';
export * from './typographyValues';
`;

fs.writeFileSync(ROOT_INDEX_TS, indexTsContent);

/** ======================================== **/
/** =       GENERATION OF AMZN DICT        = **/
/** ======================================== **/

const amznDictPropsDir = path.join('properties');
fs.existsSync(amznDictPropsDir) || fs.mkdirSync(amznDictPropsDir);

// Colors
const amznDictPropsColorsDir = path.join(amznDictPropsDir, 'color');
fs.existsSync(amznDictPropsColorsDir) || fs.mkdirSync(amznDictPropsColorsDir);

// BASE Colors
fs.writeFileSync(
    path.join(amznDictPropsColorsDir, 'base.json'),
    JSON.stringify(
        {
            color: {
                base: baseColors,
            },
        },
        null,
        2,
    ),
);

const removeGradients = () => {
    const fixThemes = {} as Record<string, ThemeTokens>;

    for (const [themeName, theme] of Object.entries(themes)) {
        const fixTheme = {} as ThemeTokens;

        for (const [k, v] of Object.entries(theme)) {
            if (k !== 'gradient' && k !== 'voicePhraseGradient') {
                fixTheme[k as keyof ThemeTokens] = v;
            }
        }

        fixThemes[themeName] = fixTheme;
    }

    return fixThemes;
};

// Themes Colors
fs.writeFileSync(
    path.join(amznDictPropsColorsDir, 'theme.json'),
    JSON.stringify(
        {
            color: removeGradients(),
        },
        null,
        2,
    ),
);

/** ======================================== **/
/** =       GENERATION OF theme.json       = **/
/** ======================================== **/

// https://theme-ui.com/theme-spec/#styles
const addStylesToTypo = (t: TypoSystem<TypographyTypes>) => {
    const { text } = t;

    t.styles = {
        h1: {
            ...text.headline1,
            margin: 0,
        },
        h2: {
            ...text.headline2,
            margin: 0,
        },
        h3: {
            ...text.headline3,
            margin: 0,
        },
        h4: {
            ...text.headline4,
            margin: 0,
        },
        p: {
            ...text.paragraph1,
            margin: 0,
        },
        root: {
            ...text.body1,
            color: flattenTokenData(themes.darkSber).text,
            backgroundColor: flattenTokenData(themes.darkSber).background,
        },
    };

    return t;
};

fs.writeFileSync(
    'theme.json',
    generateThemeJSON(
        addStylesToTypo(typoSystem),
        // Dark Sber is default
        flattenTokenData(themes.darkSber),
        // Check https://theme-ui.com/theme-spec/#color-modes
        {
            darkSber: flattenTokenData(themes.darkSber),
            darkEva: flattenTokenData(themes.darkEva),
            darkJoy: flattenTokenData(themes.darkJoy),
            lightSber: flattenTokenData(themes.lightSber),
            lightEva: flattenTokenData(themes.lightEva),
            lightJoy: flattenTokenData(themes.lightJoy),
        },
    ),
);

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
