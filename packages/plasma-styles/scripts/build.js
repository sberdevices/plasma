/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const styleDictionary = require('style-dictionary');

const cssInJsProperties = require('../src/formatters/css-in-js-properties');
const cssCustomProperties = require('../src/formatters/css-custom-properties');
const cssThemeProperties = require('../src/formatters/css-theme-properties');
const styledComponents = require('../src/formatters/styled-components');
const styledGlobalStyle = require('../src/formatters/styled-global-style');
const styledThemeStyle = require('../src/formatters/styled-theme-style');
const { combinate } = require('../src/lib/variants');

const theme = ['dark']; // , 'light'
const person = ['sber', 'joy', 'eva'];
const variants = combinate(theme, person).map(([i, j]) => ({
    theme: i,
    person: j,
    category: `theme:${i}:${j}`,
    path: `${i}/${j}`,
}));

const capitalize = (s) => `${s[0].toUpperCase()}${s.slice(1)}`;

const tokensVariableName = 'tokens';
const tokensPath = `src/${tokensVariableName}`;
const typoComponents = fs.readdirSync(`${tokensPath}/typo`).map((f) => f.split('.')[0]);

const customFormatters = [
    cssInJsProperties.formatter(),
    cssCustomProperties.formatter(),
    cssThemeProperties.formatter(),
    styledComponents.formatter({
        tokensVariableName,
    }),
    styledGlobalStyle.formatter(),
    styledThemeStyle.formatter(),
];

const config = {
    source: [`${tokensPath}/**/*.json`],
    platforms: {
        css: {
            transformGroup: 'css',
            buildPath: '.tmp/js/',
            files: [
                cssCustomProperties.config({
                    destination: `${tokensVariableName}/typo.css`,
                    category: 'typo',
                }),
                cssCustomProperties.config({
                    destination: `${tokensVariableName}/color.css`,
                    category: 'color',
                }),
                ...variants.map(({ category, path }) =>
                    cssThemeProperties.config({
                        destination: `${tokensVariableName}/theme/${path}.css`,
                        category,
                    }),
                ),
            ],
        },
        components: {
            transformGroup: 'js',
            buildPath: '.tmp/ts/components/',
            files: [
                ...typoComponents.map((name) =>
                    cssInJsProperties.config({
                        destination: `${capitalize(name)}/${tokensVariableName}.ts`,
                        category: 'typo',
                        type: name,
                    }),
                ),
                ...typoComponents.map((name) =>
                    styledComponents.config({
                        destination: `${capitalize(name)}/index.tsx`,
                        category: 'typo',
                        type: name,
                    }),
                ),
                cssInJsProperties.config({
                    destination: `Typo/${tokensVariableName}.ts`,
                    category: 'typo',
                }),
                cssInJsProperties.config({
                    destination: `Color/${tokensVariableName}.ts`,
                    category: 'color',
                }),
                styledGlobalStyle.config({
                    destination: 'Typo/index.tsx',
                    category: 'typo',
                }),
                styledGlobalStyle.config({
                    destination: 'Color/index.tsx',
                    category: 'color',
                }),
                ...variants.map(({ category, theme, person }) =>
                    styledThemeStyle.config({
                        destination: `Theme/_${theme}/Theme_${theme}_${person}.tsx`,
                        category,
                    }),
                ),
            ],
        },
    },
};

const styleDictionaryRuntime = styleDictionary.extend(config);

customFormatters.map((formatter) => styleDictionaryRuntime.registerFormat(formatter));

styleDictionaryRuntime.buildAllPlatforms();
