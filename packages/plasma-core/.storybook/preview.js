import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs/blocks';

import storybookTheme from './theme';

addDecorator(withKnobs);

addParameters({
    viewport: {
        defaultViewport: 'SberBox',
        viewports: {
            '360': {
                name: '360',
                styles: {
                    width: '360px',
                    height: '640px',
                },
            },
            '720': {
                name: '720',
                styles: {
                    width: '720px',
                    height: '405px',
                },
            },
            '860': {
                name: '860',
                styles: {
                    width: '860px',
                    height: '640px',
                },
            },
            '1024': {
                name: '1024',
                styles: {
                    width: '1024px',
                    height: '768px',
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
            order: ['Core'],
        },
    },
};
