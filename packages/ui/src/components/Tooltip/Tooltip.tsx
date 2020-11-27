import React from 'react';
import styled, { css } from 'styled-components';
import { body1, white, black } from '@sberdevices/plasma-tokens';

/** Направление раскрытия тултипа */
export type direction = 'top-left' | 'top' | 'top-right' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right' | 'left';

export interface TooltipProps {
    /** Текст тултипа */
    text: string;
    /** Видимость тултипа */
    visible: boolean;
    /** Направление раскрытия тултипа */
    direction?: direction;
}

const TL = styled.span<Omit<TooltipProps, 'text'>>`
    position: relative;
    display: inline-flex;

    --plasma-tooltip-offset: 0 0 0 0;
    --plasma-tooltip-offset_disapear: 0 0 0 0;
    --plasma-tooltip__tail-offset: 0 0 0 0;
    --plasma-tooltip__tail-offset_disapear: 0 0 0 0;

    @keyframes plasma-tooltip-appear {
        0% {
            opacity: 0;
            margin: var(--plasma-tooltip-offset_disapear);
        }

        100% {
            opacity: 1;
            margin: var(--plasma-tooltip-offset);
        }
    }

    @keyframes plasma-tooltip-disapper {
        0% {
            visibility: visible;

            opacity: 1;
            margin: var(--plasma-tooltip-offset);
        }

        75% {
            opacity: 0.75;
        }

        99% {
            margin: var(--plasma-tooltip-offset_disapear);
        }

        100% {
            visibility: hidden;

            opacity: 0;
        }
    }

    @keyframes plasma-tooltip__tail-appear {
        0% {
            opacity: 0;
            margin: var(--plasma-tooltip__tail-offset_disapear);
        }

        75% {
            opacity: 0.6;
        }

        100% {
            opacity: 1;
            margin: var(--plasma-tooltip__tail-offset);
        }
    }

    @keyframes plasma-tooltip__tail-disappear {
        0% {
            visibility: visible;

            opacity: 1;
            margin: var(--plasma-tooltip__tail-offset);
        }

        75% {
            opacity: 0.6;
        }

        99% {
            margin: var(--plasma-tooltip__tail-offset_disapear);
        }

        100% {
            visibility: hidden;

            opacity: 0;
        }
    }
    /* stylelint-disable selector-nested-pattern */
    &::before,
    &::after {
        animation-duration: 0.2s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-in-out;
    }
    /* stylelint-enable selector-nested-pattern */

    ${({ visible }) =>
        visible
            ? css`
                  &::before {
                      visibility: visible;
                      animation-name: plasma-tooltip__tail-appear;
                  }

                  &::after {
                      visibility: visible;
                      animation-name: plasma-tooltip-appear;
                  }
              `
            : css`
                  &::before {
                      visibility: hidden;
                      animation-name: plasma-tooltip__tail-disappear;
                  }

                  &::after {
                      visibility: hidden;
                      animation-name: plasma-tooltip-disapper;
                  }
              `}

    &::before {
        position: absolute;
        z-index: 10001;
        display: block;
        content: '';

        background-color: ${black};
        /* stylelint-disable number-max-precision */
        width: 1.1875rem;
        height: 1.1875rem;
        /* stylelint-enable number-max-precision */

        border-radius: 0.125rem;

        ${({ direction }) => {
            // tooltip above anchor
            if (direction === 'top' || direction === 'top-left' || direction === 'top-right') {
                return css`
                    bottom: 100%;
                    transform: translateY(50%) translateX(-50%) rotate(45deg);
                    --plasma-tooltip__tail-offset: 0 0 1rem 50%;
                    --plasma-tooltip__tail-offset_disapear: 0 0 2rem 50%;
                `;
            }

            // tooltip is right to anchor
            if (direction === 'right') {
                return css`
                    left: 100%;
                    transform: translateX(-50%) translateY(-50%) rotate(45deg);
                    --plasma-tooltip__tail-offset: 50% 0 0 1rem;
                    --plasma-tooltip__tail-offset_disapear: 50% 0 0 2rem;
                `;
            }

            // tooltip is under anchor
            if (direction === 'bottom' || direction === 'bottom-left' || direction === 'bottom-right') {
                return css`
                    top: 100%;
                    transform: translateY(-50%) translateX(-50%) rotate(45deg);
                    --plasma-tooltip__tail-offset: 1rem 0 0 50%;
                    --plasma-tooltip__tail-offset_disapear: 2rem 0 0 50%;
                `;
            }

            // tooltip is left to anchor
            if (direction === 'left') {
                return css`
                    right: 100%;
                    transform: translateX(50%) translateY(-50%) rotate(45deg);
                    --plasma-tooltip__tail-offset: 50% 1rem 0 0;
                    --plasma-tooltip__tail-offset_disapear: 50% 2rem 0 0;
                `;
            }

            return null;
        }}

        margin: var(--plasma-tooltip__tail-offset);
    }

    &::after {
        position: absolute;
        z-index: 10000;

        padding: 0.875rem 1.25rem;
        border-radius: 0.5rem;

        background-color: ${black};
        color: ${white};

        content: attr(aria-label);

        ${body1}
        white-space: pre;

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        ${({ direction }) => {
            // tooltip above anchor
            if (direction === 'top') {
                return css`
                    bottom: 100%;
                    right: 50%;
                    transform: translateX(50%);
                    --plasma-tooltip-offset: 0 0 0.75rem 0;
                    --plasma-tooltip-offset_disapear: 0 0 1.75rem 0;
                `;
            }

            if (direction === 'top-left') {
                return css`
                    bottom: 100%;
                    right: -50%;
                    --plasma-tooltip-offset: 0 0 0.75rem 0;
                    --plasma-tooltip-offset_disapear: 0 0 1.75rem 0;
                `;
            }

            if (direction === 'top-right') {
                return css`
                    bottom: 100%;
                    left: -50%;
                    --plasma-tooltip-offset: 0 0 0.75rem 0;
                    --plasma-tooltip-offset_disapear: 0 0 1.75rem 0;
                `;
            }

            // tooltip is right to anchor
            if (direction === 'right') {
                return css`
                    left: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                    --plasma-tooltip-offset: 0 0 0 0.75rem;
                    --plasma-tooltip-offset_disapear: 0 0 0 1.75rem;
                `;
            }

            // tooltip is under anchor
            if (direction === 'bottom') {
                return css`
                    top: 100%;
                    right: 50%;
                    transform: translateX(50%);
                    --plasma-tooltip-offset: 0.75rem 0 0 0;
                    --plasma-tooltip-offset_disapear: 1.75rem 0 0 0;
                `;
            }

            if (direction === 'bottom-left') {
                return css`
                    top: 100%;
                    right: -50%;
                    --plasma-tooltip-offset: 0.75rem 0 0 0;
                    --plasma-tooltip-offset_disapear: 1.75rem 0 0 0;
                `;
            }

            if (direction === 'bottom-right') {
                return css`
                    top: 100%;
                    left: -50%;
                    --plasma-tooltip-offset: 0.75rem 0 0 0;
                    --plasma-tooltip-offset_disapear: 1.75rem 0 0 0;
                `;
            }

            // tooltip is left to anchor
            if (direction === 'left') {
                return css`
                    right: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                    --plasma-tooltip-offset: 0 0.75rem 0 0;
                    --plasma-tooltip-offset_disapear: 0 1.75rem 0 0;
                `;
            }

            return null;
        }}

        margin: var(--plasma-tooltip-offset);
    }
`;

export const Tooltip: React.FC<TooltipProps & React.HTMLAttributes<HTMLDivElement>> = ({
    text,
    visible,
    direction = 'bottom',
    children,
    ...rest
}) => {
    return (
        <TL aria-label={text} visible={visible} direction={direction} {...rest}>
            {children}
        </TL>
    );
};
