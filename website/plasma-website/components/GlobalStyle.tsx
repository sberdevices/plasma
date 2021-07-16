import { createGlobalStyle } from 'styled-components';
import { body1, text, background } from '@sberdevices/plasma-tokens-b2c';
import { standard } from '@sberdevices/plasma-typo';
import { light } from '@sberdevices/plasma-tokens-b2c/themes';

const ColorStyle = createGlobalStyle(light);

const DocumentStyle = createGlobalStyle`
    html, body {
        width: 100%;
        height: 100%;

        margin: 0;
        padding: 0;
    }

    /* stylelint-disable-next-line selector-nested-pattern */
    body {
        ${body1}

        background: ${background};
        color: ${text};

        transition: padding 0.15s ease-in-out;
        will-change: contents;
    }
`;
const TypoStyle = createGlobalStyle(standard);

export const GlobalStyle = () => {
    return (
        <>
            <DocumentStyle />
            <ColorStyle />
            <TypoStyle />
        </>
    );
};
