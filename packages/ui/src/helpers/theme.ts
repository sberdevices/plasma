import { color } from '@storybook/addon-knobs';

import { UITheme } from '../theme';

export function getTheme(): UITheme {
    return {
        uiColor: {
            active: color('Theme Color Active', '#08a652'),
            highlight: color('Theme Color Highlight', '#2ac673'),
            blank: color('Theme Color Blank', '#ffffff'),
            accent: color('Theme Color Accent', '#f6650a'),
            index: color('Theme Color Index', 'rgba(0, 0, 0, 0.56)'),
        },
        buttonColor: {
            active: color('Button Color Active', '#12a557'),
            secondary: color('Button Color Secondary', 'rgba(255, 255, 255, 0.12)'),
        },
    };
}
