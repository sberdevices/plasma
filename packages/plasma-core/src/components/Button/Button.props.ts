import { views } from '../../mixins';
import { button1, button2 } from '../../tokens';

import type { ButtonSizes, ButtonTypography } from './Button.types';

/**
 * Цветовые виды.
 */
export const buttonViews = {
    primary: views.primary,
    secondary: views.secondary,
    success: views.success,
    warning: views.warning,
    critical: views.critical,
    checked: views.checked,
    overlay: views.overlay,
    clear: views.clear,
};

/**
 * Размеры в rem в соответствии с дизайном.
 */
export const buttonSizes: ButtonSizes = {
    l: {
        height: '3.5rem',
        paddingY: '1rem',
        paddingX: '1.625rem',
        paddingXContent: '1.625rem',
        paddingXResizable: '1.25rem',
        squareRadius: '1rem',
        sOutlineRadius: '1.125rem',
        circleRadius: '1.75rem',
        cOutlineRadius: '1.875rem',
    },
    m: {
        height: '3rem',
        paddingY: '0.75rem',
        paddingX: '1.375rem',
        paddingXContent: '1.5rem',
        paddingXResizable: '1.25rem',
        squareRadius: '0.75rem',
        sOutlineRadius: '0.875rem',
        circleRadius: '1.5rem',
        cOutlineRadius: '1.625rem',
    },
    s: {
        height: '2.5rem',
        paddingY: '0.5rem',
        paddingX: '1.125rem',
        paddingXContent: '1.25rem',
        paddingXResizable: '1.25rem',
        squareRadius: '0.75rem',
        sOutlineRadius: '0.875rem',
        circleRadius: '1.25rem',
        cOutlineRadius: '1.375rem',
    },
};

/**
 * Размеры типографики кнопки.
 */
export const buttonTypography: ButtonTypography = {
    l: button1,
    m: button1,
    s: button2,
};
