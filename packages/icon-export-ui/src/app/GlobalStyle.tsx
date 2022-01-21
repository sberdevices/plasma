import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { web } from '@sberdevices/plasma-tokens-web/typo';
import { light } from '@sberdevices/plasma-tokens-web/themes';
import { text } from '@sberdevices/plasma-tokens-web';

const DocumentStyle = createGlobalStyle`
    html {
        color: ${text};

        font-family: "SB Sans Text", system-ui, -apple-system, Segoe UI,
        Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont,
        "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol";
    }
`;
const ThemeStyle = createGlobalStyle(light);
const TypoStyle = createGlobalStyle(web);

export const GlobalStyle = () => (
    <>
        <DocumentStyle />
        <ThemeStyle />
        <TypoStyle />
    </>
);
