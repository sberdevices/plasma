import { color } from '@storybook/addon-knobs';

import { UITheme } from '.';

export function getTheme(): UITheme {
    return {
        colors: {
            active: color('Theme Color Active', '#08a652'),
            highlight: color('Theme Color Highlight', '#2ac673'),
        },
    };
}
