import React from 'react';
import styled, { css } from 'styled-components';
import {
    Button as BaseButton,
    ButtonText,
    buttonViews as baseViews,
    getRadiusesMixin,
} from '@sberdevices/plasma-core/components/Button/Button';
import type {
    ButtonProps as BaseButtonProps,
    AsElement as BaseAsElement,
    ButtonContentProps,
} from '@sberdevices/plasma-core/components/Button/Button';
import type { DisabledProps } from '@sberdevices/plasma-core/mixins';
import { black, white } from '@sberdevices/plasma-tokens-web';

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
    critical: css`
        ${baseViews.critical}
        ${viewInteractive}
    `,
    secondary: css`
        ${baseViews.secondary}

        &:hover {
            background-color: rgba(8, 8, 8, 0.04);
            opacity: 0.8;
        }

        &:active {
            background-color: rgba(8, 8, 8, 0.08);
            opacity: 1;
        }
    `,
    clear: baseViews.clear,
};

export interface ViewProps {
    view: keyof typeof buttonViews;
}

const applyRadiuses = getRadiusesMixin({
    l: {
        squareRadius: '0.75rem',
        sOutlineRadius: '0.875rem',
        circleRadius: '1.75rem',
        cOutlineRadius: '1.875rem',
    },
    m: {
        squareRadius: '0.5rem',
        sOutlineRadius: '0.625rem',
        circleRadius: '1.5rem',
        cOutlineRadius: '1.625rem',
    },
    s: {
        squareRadius: '0.5rem',
        sOutlineRadius: '0.625rem',
        circleRadius: '1.25rem',
        cOutlineRadius: '1.375rem',
    },
});

const StyledButton = styled(BaseButton)<ViewProps>`
    ${applyRadiuses}
    ${({ view }) => buttonViews[view]}

    transition: background-color 0.1s ease-in-out;
`;

export type AsElement = BaseAsElement;

/**
 * Интерфейс кнопки.
 */
export type ButtonProps = BaseButtonProps & ButtonContentProps & ViewProps;

/**
 * Основной компонент для создания кнопок.
 */
export const Button = React.forwardRef<AsElement, ButtonProps>(
    // eslint-disable-next-line prefer-arrow-callback
    function Button(
        { as = 'button', view = 'secondary', size = 'm', pin = 'square-square', outlined = false, square, ...props },
        ref,
    ) {
        if (as === 'a') {
            props.type = undefined;
            props.name = undefined;
        } else if (as === 'button') {
            props.href = undefined;
            props.rel = undefined;
        }

        const { text, contentLeft, contentRight, children, ...rest } = props;

        return (
            <StyledButton<typeof as>
                as={as}
                ref={ref}
                view={view}
                size={size}
                pin={pin}
                outlined={outlined}
                square={square !== undefined ? square : !text && !children && (contentLeft || contentRight)}
                {...rest}
            >
                {children}
                {!children && contentLeft}
                {!children && text && (
                    <ButtonText isContentLeft={!!contentLeft} isContentRight={!!contentRight}>
                        {text}
                    </ButtonText>
                )}
                {!children && !contentLeft && contentRight}
            </StyledButton>
        );
    },
);
