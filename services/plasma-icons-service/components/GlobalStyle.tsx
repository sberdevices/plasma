import type { FC } from 'react';
import { createGlobalStyle, css } from 'styled-components';
import { body1, text, background } from '@sberdevices/plasma-tokens-web';
import { web } from '@sberdevices/plasma-tokens-web/typo';
import { light, dark } from '@sberdevices/plasma-tokens-web/themes';

import { Theme as ThemeType } from '../store/types';

export interface GlobalStyleProps {
    theme?: ThemeType;
    isPanelOpen?: boolean;
}

const themes = {
    light: createGlobalStyle(light),
    dark: createGlobalStyle(dark),
};

const DocumentStyle = createGlobalStyle<{ isPanelOpen?: boolean }>`
    /* stylelint-disable-next-line selector-nested-pattern */
    body {
        ${body1}

        margin: 0;
        padding: 0;

        background: ${background};
        color: ${text};

        transition: padding 0.15s ease-in-out;
        will-change: contents;

        ${({ isPanelOpen }) =>
            isPanelOpen &&
            css`
                padding-right: 20rem;
            `}
    }
`;
const TypoStyle = createGlobalStyle(web);

export const GlobalStyle: FC<GlobalStyleProps> = ({ theme = 'light', isPanelOpen }) => {
    const Theme = themes[theme];

    return (
        <>
            <DocumentStyle isPanelOpen={isPanelOpen} />
            <Theme />
            <TypoStyle />
        </>
    );
};
