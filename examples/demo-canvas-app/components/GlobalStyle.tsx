import { createGlobalStyle } from 'styled-components';
import { body1, text, background, gradientDevice } from '@sberdevices/plasma-tokens';
import { sberBox } from '@sberdevices/plasma-tokens/typo';
import { darkSber } from '@sberdevices/plasma-tokens/themes';

const DocumentStyle = createGlobalStyle`
    /* stylelint-disable-next-line selector-nested-pattern */
    html, body {
        width: 100%;
        height: 100%;
    }

    /* stylelint-disable-next-line selector-nested-pattern */
    body {
        ${body1}

        margin: 0;
        padding: 0;

        background-color: ${background};
        background-image: ${gradientDevice};
        color: ${text};
    }

    /* stylelint-disable-next-line selector-nested-pattern, selector-max-id */
    #__next {
        width: 100%;
        height: 100%;
    }

    /* stylelint-disable-next-line selector-nested-pattern */
    .focus-visible {
        outline: 0 none;
    }
`;
const ColorThemeStyle = createGlobalStyle(darkSber);
const TypoStyle = createGlobalStyle(sberBox);

export const GlobalStyle = () => {
    return (
        <>
            <DocumentStyle />
            <ColorThemeStyle />
            <TypoStyle />
        </>
    );
};
