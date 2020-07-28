import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);

addParameters({
    viewport: {
        defaultViewport: 'HD',
        viewports: {
            FHD: {
                name: '1080p',
                styles: {
                    width: '1920px',
                    height: '1080px',
                },
            },
            HD: {
                name: 'HD',
                styles: {
                    width: '1280px',
                    height: '720px',
                },
            },
            StarGate: {
                name: 'StarGate',
                styles: {
                    width: '1280px',
                    height: '800px',
                },
            },
        },
    },
    backgrounds: {
        default: 'SberBox',
        values: [
            {
                name: 'dark',
                value: '#0B121E',
            },
            {
                name: 'SberBox',
                value: 'linear-gradient(180deg, #00132b 0%, #002e2f 100%)',
            },
        ],
    },
});
