import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { sberBox as sberBoxTypo } from '@sberdevices/plasma-tokens/typo';
import { darkSber } from '@sberdevices/plasma-tokens/themes';
import { Container } from '@sberdevices/plasma-ui';

const Typo = createGlobalStyle(sberBoxTypo);
const Color = createGlobalStyle(darkSber);

const withGlobalStyles = (storyFn) => (
    <>
        <Typo />
        <Color />
        <Container>{storyFn ? storyFn() : null}</Container>
    </>
);

addDecorator(withGlobalStyles);
addDecorator(withKnobs);

addParameters({
    backgrounds: {
        default: 'dark',
        values: [{ name: 'dark', value: '#0B121E', default: true }],
    },
});

addParameters({
    viewport: {
        defaultViewport: 'SberBox',
        viewports: {
            SberPortal: {
                name: 'SberPortal',
                styles: {
                    width: '1280px',
                    height: '720px',
                },
            },
            SberBox: {
                name: 'SberBox',
                styles: {
                    width: '1920px',
                    height: '1080px',
                },
            },
        },
    },
});
