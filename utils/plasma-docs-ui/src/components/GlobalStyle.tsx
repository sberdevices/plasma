import React, { FC } from 'react';
import { createGlobalStyle } from 'styled-components';
import { accent } from '@sberdevices/plasma-tokens-b2b';
import { b2b } from '@sberdevices/plasma-tokens-b2b/typo';
import { light, dark } from '@sberdevices/plasma-tokens-b2b/themes';

interface GlobalStyleProps {
    theme?: 'light' | 'dark';
    children?: never;
}

const themes = {
    light: createGlobalStyle(light),
    dark: createGlobalStyle(dark),
};
const TypoTheme = createGlobalStyle(b2b);
const DocStyle = createGlobalStyle`
    :root {
        --ifm-color-primary: ${accent};
        --ifm-color-primary-dark: #2364de;
        --ifm-color-primary-darker: #1549ab;
        --ifm-color-primary-darkest: #0c327a;
        --ifm-color-primary-light: #3f81fd;
        --ifm-color-primary-lighter: #5993ff;
        --ifm-color-primary-lightest: #8bb2fc;
        --ifm-code-font-size: 95%;
        --ifm-font-family-base: 'SB Sans Text', system-ui, sans-serif;
    }

    .docusaurus-highlight-code-line {
        background-color: rgba(0, 0, 0, 0.1);
        display: block;
        margin: 0 calc(-1 * var(--ifm-pre-padding));
        padding: 0 var(--ifm-pre-padding);
    }

    html[data-theme='dark'] .docusaurus-highlight-code-line {
        background-color: rgba(0, 0, 0, 0.3);
    }

    /* Контент документации */
    .markdown {
        /* Чтобы разместить кнопку сторибука справа */
        position: relative;
    }
`;

export const GlobalStyle: FC<GlobalStyleProps> = ({ theme = 'light' }) => {
    const ColorTheme = themes[theme];

    return (
        <>
            <DocStyle />
            <ColorTheme />
            <TypoTheme />
        </>
    );
};
