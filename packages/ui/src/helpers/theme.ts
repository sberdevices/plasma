import { color } from '@storybook/addon-knobs';

import { UITheme } from '../theme';

export function getTheme(): UITheme {
    return {
        color: {
            active: color('Theme Color Active', '#08a652'),
            highlight: color('Theme Color Highlight', '#2ac673'),
            blank: color('Theme Color Blank', '#ffffff'),
        },
    };
}
