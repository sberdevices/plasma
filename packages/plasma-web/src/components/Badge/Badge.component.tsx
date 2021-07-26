/* eslint-disable */
import React from 'react';
import ReactDom from 'react-dom';
import { mount } from '@cypress/react';
import { Badge } from './Badge';

import { createGlobalStyle } from 'styled-components';

import { web } from '@sberdevices/plasma-tokens-web/typo';
import { light } from '@sberdevices/plasma-tokens-web/themes';

const TypoThemeStyle = createGlobalStyle(web);
const ColorThemeStyle = createGlobalStyle(light);

describe('Badge', () => {
    it('renders Badge', () => {
        mount(
            <>
                <TypoThemeStyle />
                <ColorThemeStyle />
                <Badge text={'Badge-web'} size={'l'} view={'primary'} />
            </>,
            { ReactDom },
        );
        cy.matchImageSnapshot();
    });
});
