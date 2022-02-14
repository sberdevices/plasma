import { css } from 'styled-components';
import { buttonViews as baseViews } from '@sberdevices/plasma-core';

import {
    buttonPrimaryHover,
    buttonPrimaryActive,
    buttonSecondaryHover,
    buttonSecondaryActive,
    buttonSuccessHover,
    buttonSuccessActive,
    buttonWarningHover,
    buttonWarningActive,
    buttonCriticalHover,
    buttonCriticalActive,
    buttonCheckedHover,
    buttonCheckedHoverColor,
    buttonCheckedActive,
    buttonCheckedActiveColor,
} from '../../tokens';

/**
 * Views (colors) for both B2B and B2C
 */
export const buttonViews = {
    primary: css`
        ${baseViews.primary}

        &:hover {
            background-color: ${buttonPrimaryHover};
            color: ${baseViews.primary.color};
        }

        &:active {
            background-color: ${buttonPrimaryActive};
            color: ${baseViews.primary.color};
        }
    `,
    success: css`
        ${baseViews.success}

        &:hover {
            background-color: ${buttonSuccessHover};
            color: ${baseViews.success.color};
        }

        &:active {
            background-color: ${buttonSuccessActive};
            color: ${baseViews.success.color};
        }
    `,
    warning: css`
        ${baseViews.warning}

        &:hover {
            background-color: ${buttonWarningHover};
            color: ${baseViews.warning.color};
        }

        &:active {
            background-color: ${buttonWarningActive};
            color: ${baseViews.warning.color};
        }
    `,
    critical: css`
        ${baseViews.critical}

        &:hover {
            background-color: ${buttonCriticalHover};
            color: ${baseViews.critical.color};
        }

        &:active {
            background-color: ${buttonCriticalActive};
            color: ${baseViews.critical.color};
        }
    `,
    secondary: css`
        ${baseViews.secondary}

        &:hover {
            background-color: ${buttonSecondaryHover};
            color: ${baseViews.secondary.color};
        }

        &:active {
            background-color: ${buttonSecondaryActive};
            color: ${baseViews.secondary.color};
        }
    `,
    checked: css`
        ${baseViews.checked}

        &:hover {
            background-color: ${buttonCheckedHover};
            color: ${buttonCheckedHoverColor};
        }

        &:active {
            background-color: ${buttonCheckedActive};
            color: ${buttonCheckedActiveColor};
        }
    `,
    overlay: baseViews.overlay,
    clear: baseViews.clear,
};

/**
 * @private
 */
export type ButtonView = keyof typeof buttonViews;
