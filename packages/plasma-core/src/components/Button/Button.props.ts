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
        height: 'var(--plasma-button-l-height)',
        paddingY: 'var(--plasma-button-l-padding-y)',
        paddingX: 'var(--plasma-button-l-padding-x)',
        paddingContentX: 'var(--plasma-button-l-padding-content-x)',
        paddingStretchX: 'var(--plasma-button-l-padding-stretch-x)',
        radius: 'var(--plasma-button-l-radius)',
        radiusCircle: 'var(--plasma-button-l-radius-circle)',
    },
    m: {
        height: 'var(--plasma-button-m-height)',
        paddingY: 'var(--plasma-button-m-padding-y)',
        paddingX: 'var(--plasma-button-m-padding-x)',
        paddingContentX: 'var(--plasma-button-m-padding-content-x)',
        paddingStretchX: 'var(--plasma-button-m-padding-stretch-x)',
        radius: 'var(--plasma-button-m-radius)',
        radiusCircle: 'var(--plasma-button-m-radius-circle)',
    },
    s: {
        height: 'var(--plasma-button-s-height)',
        paddingY: 'var(--plasma-button-s-padding-y)',
        paddingX: 'var(--plasma-button-s-padding-x)',
        paddingContentX: 'var(--plasma-button-s-padding-content-x)',
        paddingStretchX: 'var(--plasma-button-s-padding-stretch-x)',
        radius: 'var(--plasma-button-s-radius)',
        radiusCircle: 'var(--plasma-button-s-radius-circle)',
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
