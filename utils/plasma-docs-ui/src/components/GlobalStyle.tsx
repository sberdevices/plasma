import React, { FC } from 'react';
import { createGlobalStyle } from 'styled-components';
import { web } from '@sberdevices/plasma-tokens-web/typo';
import { light } from '@sberdevices/plasma-tokens-web/themes';

interface GlobalStyleProps {
    children?: never;
}

const ColorTheme = createGlobalStyle(light);
const TypoTheme = createGlobalStyle(web);
const DocStyle = createGlobalStyle`
    :root {
        --ifm-color-primary: #2a72f8;
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
`;

export const GlobalStyle: FC<GlobalStyleProps> = () => {
    return (
        <>
            <DocStyle />
            <ColorTheme />
            <TypoTheme />
        </>
    );
};
