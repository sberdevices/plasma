import styled, { css } from 'styled-components';
import {
    Button as BaseButton,
    buttonViews as baseViews,
    black,
    white,
    convertRoundnessMatrix,
} from '@sberdevices/plasma-core';
import type {
    ButtonProps as BaseProps,
    ButtonContentProps,
    SizeProps,
    ButtonViewProps,
    DisabledProps,
} from '@sberdevices/plasma-core';

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

const buttonViews = {
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
    clear: baseViews.clear,
};

type ButtonView = keyof typeof buttonViews;

const buttonSizes = {
    l: ({ pin }: BaseProps) => css`
        border-radius: ${convertRoundnessMatrix(pin, '0.75rem', '1.75rem')};

        &::before {
            border-radius: ${convertRoundnessMatrix(pin, '0.875rem', '1.875rem')};
        }
    `,
    m: ({ pin }: BaseProps) => css`
        border-radius: ${convertRoundnessMatrix(pin, '0.5rem', '1.5rem')};

        &::before {
            border-radius: ${convertRoundnessMatrix(pin, '0.625rem', '1.625rem')};
        }
    `,
    s: ({ pin }: BaseProps) => css`
        border-radius: ${convertRoundnessMatrix(pin, '0.5rem', '1.25rem')};

        &::before {
            border-radius: ${convertRoundnessMatrix(pin, '0.625rem', '1.375rem')};
        }
    `,
};

type ButtonSize = keyof typeof buttonSizes;

export type ButtonProps = BaseProps & Partial<ButtonViewProps<ButtonView> & SizeProps<ButtonSize>> & ButtonContentProps;

/**
 * Кнопка.
 * Поддерживает текстовое и контентное наполнение.
 */
export const Button = styled(BaseButton)<ButtonProps>`
    ${({ view }) => buttonViews[view as ButtonView]}
    ${({ size }) => buttonSizes[size as ButtonSize]}
    transition: background-color 0.1s ease-in-out;
`;

Button.defaultProps = {
    ...BaseButton.defaultProps,
    view: 'secondary',
    size: 'm',
};
