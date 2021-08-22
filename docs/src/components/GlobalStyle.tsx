import React, { FC } from 'react';
import { createGlobalStyle } from 'styled-components';
import { web } from '@sberdevices/plasma-tokens-web/typo';
import { light } from '@sberdevices/plasma-tokens-web/themes';

interface GlobalStyleProps {
    children?: never;
}

const ColorTheme = createGlobalStyle(light);
const TypoTheme = createGlobalStyle(web);

export const GlobalStyle: FC<GlobalStyleProps> = () => {
    return (
        <>
            <ColorTheme />
            <TypoTheme />
        </>
    );
};
