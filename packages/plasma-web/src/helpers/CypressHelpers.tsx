import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { web } from '@sberdevices/plasma-tokens-web/typo';
import { light } from '@sberdevices/plasma-tokens-web/themes';

const TypoThemeStyle = createGlobalStyle(web);
const ColorThemeStyle = createGlobalStyle(light);

export const CypressTestDecorator: FC = ({ children }) => (
    <>
        <TypoThemeStyle />
        <ColorThemeStyle />
        {children}
    </>
);

export const Padme = styled.div`
    padding: 5px;
`;

export const SpaceMe = styled.span`
    padding: 5px;
`;
