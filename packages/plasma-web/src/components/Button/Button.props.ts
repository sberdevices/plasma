import { css } from 'styled-components';
import { buttonViews as baseViews, black, white } from '@sberdevices/plasma-core';
import type { DisabledProps } from '@sberdevices/plasma-core';

import { buttonSecondaryHover, buttonSecondaryActive } from '../../tokens';

const viewInteractive = ({ disabled }: DisabledProps) =>
    !disabled &&
    css`
        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${white};
            border-radius: inherit;
            opacity: 0;
            pointer-events: none;
        }

        &:hover::after {
            opacity: 0.1;
        }

        &:active::after {
            opacity: 0.1;
            background-color: ${black};
        }
    `;

/**
 * Views (colors) for both B2B and B2C
 */
export const buttonViews = {
    primary: css`
        ${baseViews.primary}
        ${viewInteractive}

        &:hover {
            color: ${baseViews.primary.color};
        }
    `,
    success: css`
        ${baseViews.success}
        ${viewInteractive}

        &:hover {
            color: ${baseViews.success.color};
        }
    `,
    warning: css`
        ${baseViews.warning}
        ${viewInteractive}

        &:hover {
            color: ${baseViews.warning.color};
        }
    `,
    critical: css`
        ${baseViews.critical}
        ${viewInteractive}

        &:hover {
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
        }
    `,
    checked: baseViews.checked,
    overlay: baseViews.overlay,
    clear: baseViews.clear,
};

/**
 * @private
 */
export type ButtonView = keyof typeof buttonViews;
