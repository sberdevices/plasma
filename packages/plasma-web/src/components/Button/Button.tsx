import styled, { css } from 'styled-components';
import { Button as BaseButton, buttonViews as baseViews } from '@sberdevices/plasma-core/components/Button';
import type {
    ButtonProps as BaseProps,
    SizeProps,
    ViewProps,
    ButtonContentProps,
} from '@sberdevices/plasma-core/components/Button/Button';
import type { DisabledProps } from '@sberdevices/plasma-core/mixins';
import { convertRoundnessMatrix } from '@sberdevices/plasma-core/utils';
import { black, white, buttonSecondaryHover, buttonSecondaryActive } from '@sberdevices/plasma-tokens-web';

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
    `,
    success: css`
        ${baseViews.success}
        ${viewInteractive}
    `,
    critical: css`
        ${baseViews.critical}
        ${viewInteractive}
    `,
    secondary: css`
        ${baseViews.secondary}

        &:hover {
            background-color: ${buttonSecondaryHover};
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

export type ButtonProps = BaseProps & Partial<ViewProps<ButtonView> & SizeProps<ButtonSize>> & ButtonContentProps;

/**
 * Кнопка.
 * Поддерживает текстовое и контентное наполнение.
 */
export const Button = styled(BaseButton)<ButtonProps>`
    && {
        ${({ view }) => buttonViews[view as ButtonView]}
        ${({ size }) => buttonSizes[size as ButtonSize]}
        transition: background-color 0.1s ease-in-out;
    }
`;

Button.defaultProps = {
    ...BaseButton.defaultProps,
    view: 'secondary',
    size: 'm',
};
