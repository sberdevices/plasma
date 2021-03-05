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

import { themes, typoSystem } from './data';
import type { TypographyTypes } from './data';

const OUT_DIR = 'src';
const COLORS_DIR = path.join(OUT_DIR, 'colors');
const THEMES_DIR = path.join(OUT_DIR, 'themes');
const THEMES_VALUES_DIR = path.join(OUT_DIR, 'themesValues');
const TYPOGRAPHY_DIR = path.join(OUT_DIR, 'typography');
const TYPOGRAPHY_VALUES_DIR = path.join(OUT_DIR, 'typographyValues');
const TYPO_DIR = path.join(OUT_DIR, 'typo');
const ROOT_INDEX_TS = path.join(OUT_DIR, 'index.ts');

fs.existsSync(OUT_DIR) || fs.mkdirSync(OUT_DIR);

/** ========================================== **/
/** ========= Генерация цветов и тем ========= **/
/** ========================================== **/

// Генерация цветов
writeGeneratedToFS(COLORS_DIR, [
    // Файл с токенами CSS-Variables (с дефолтными значениями)
    { file: 'index.ts', content: generateTokens(themes.light, 'css', 'colors') },
    // Файл с токенами (JS-переменными) для инъекции значения напрямую
    { file: 'values.ts', content: generateTokens(themes.light) },
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

// Типографика, разложенная по типам устройств для создания глобального стиля
writeGeneratedToFS(TYPO_DIR, generateTypo({ web: createTypoStyles(typoSystem) }));

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

export const scalingPixelBasis = ${HTML_FONT_SIZE};

export * from './colors';
export * from './typography';
export * from './typographyValues';
`;

fs.writeFileSync(ROOT_INDEX_TS, indexTsContent);

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
        h5: {
            ...text.headline5,
            margin: 0,
        },
        p: {
            ...text.paragraph1,
            margin: 0,
        },
        root: {
            ...text.body1,
            color: flattenTokenData(themes.light).text,
            backgroundColor: flattenTokenData(themes.light).background,
        },
    };

    return t;
};

fs.writeFileSync(
    'theme.json',
    generateThemeJSON(
        addStylesToTypo(typoSystem),
        // Light theme is default
        flattenTokenData(themes.light),
        // check https://theme-ui.com/theme-spec/#color-modes
        {
            light: flattenTokenData(themes.light),
        },
    ),
);
