import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs/blocks';
import { transformStyles } from '@sberdevices/plasma-core/utils';

import { typoTheme } from '../src/tokens/typoTheme';
import { light } from '../src/tokens/colorThemes';

import storybookTheme from './theme';

/* stylelint-disable */
const DocumentStyle = createGlobalStyle`
    html:root {
        min-height: 100vh;
    }
`;
const TypoThemeStyle = createGlobalStyle`:root {
    ${transformStyles(typoTheme[':root'])}
}`;
/* stylelint-enable */

const ColorThemeStyle = createGlobalStyle(light);

const withTheme = (Story, context) => (
    <>
        <TypoThemeStyle />
        <ColorThemeStyle />
        <DocumentStyle />
        <Story {...context} />
    </>
);

addDecorator(withKnobs);
addDecorator(withTheme);

addParameters({
    viewport: {
        viewports: {
            '375': {
                name: '375x812',
                styles: {
                    width: '375px',
                    height: '812px',
                },
            },
            '768': {
                name: '768x576',
                styles: {
                    width: '768px',
                    height: '576px',
                },
            },
            '1024': {
                name: '1024x768',
                styles: {
                    width: '1024px',
                    height: '768px',
                },
            },
            '1920': {
                name: '1920x1080',
                styles: {
                    width: '1920px',
                    height: '1080px',
                },
            },
        },
    },
});

export const parameters = {
    docs: {
        page: () => (
            <>
                <Title />
                <Subtitle />
                <Description />
                <Primary />
                <ArgsTable story={PRIMARY_STORY} />
            </>
        ),
        theme: storybookTheme,
    },
    options: {
        storySort: {
            method: 'alphabetical',
            order: ['Intro', 'Colors', 'Typography', 'Controls'],
        },
    },
};
