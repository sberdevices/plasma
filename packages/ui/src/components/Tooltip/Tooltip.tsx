import React from 'react';
import styled, { css } from 'styled-components';
import { body1, white, black } from '@sberdevices/plasma-tokens';

const TL = styled.span<WithDirection>`
    position: relative;
    display: inline-flex;

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
            if (direction === 'top-center' || direction === 'top-left' || direction === 'top-right') {
                return css`
                    bottom: 100%;
                    transform: translateY(50%) rotate(45deg);
                    margin-bottom: 1rem;
                    margin-left: 0.15rem;
                `;
            }

            // tooltip is right to anchor
            if (direction === 'right-center') {
                return css`
                    left: 100%;
                    transform: translateX(-50%) rotate(45deg);
                    margin-left: 1rem;
                    margin-top: 0.15rem;
                `;
            }

            if (direction === 'right-top') {
                return css`
                    left: 100%;
                    transform: translateX(-50%) rotate(45deg);
                    margin-left: 1rem;
                `;
            }

            if (direction === 'right-bottom') {
                return css`
                    left: 100%;
                    transform: translateX(-50%) rotate(45deg);
                    margin-left: 1rem;
                    margin-top: 0.3rem;
                `;
            }

            // tooltip is under anchor
            if (direction === 'bottom-center' || direction === 'bottom-left' || direction === 'bottom-right') {
                return css`
                    top: 100%;
                    transform: translateY(-50%) rotate(45deg);
                    margin-top: 1rem;
                    margin-left: 0.125rem;
                `;
            }

            // tooltip is left to anchor
            if (direction === 'left-center') {
                return css`
                    right: 100%;
                    transform: translateX(50%) rotate(45deg);
                    margin-right: 1rem;
                    margin-top: 0.15rem;
                `;
            }

            if (direction === 'left-top') {
                return css`
                    right: 100%;
                    transform: translateX(50%) rotate(45deg);
                    margin-right: 1rem;
                `;
            }

            if (direction === 'left-bottom') {
                return css`
                    right: 100%;
                    transform: translateX(50%) rotate(45deg);
                    margin-right: 1rem;
                    margin-top: 0.3rem;
                `;
            }

            return null;
        }}
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
            if (direction === 'top-center') {
                return css`
                    bottom: 100%;
                    right: 50%;
                    margin-bottom: 0.75rem;
                    transform: translateX(50%);
                `;
            }

            if (direction === 'top-left') {
                return css`
                    bottom: 100%;
                    right: -50%;
                    margin-bottom: 0.75rem;
                `;
            }

            if (direction === 'top-right') {
                return css`
                    bottom: 100%;
                    left: -50%;
                    margin-bottom: 0.75rem;
                `;
            }

            // tooltip is right to anchor
            if (direction === 'right-center') {
                return css`
                    left: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                    margin-left: 0.75rem;
                `;
            }

            if (direction === 'right-top') {
                return css`
                    left: 100%;
                    bottom: 0;
                    margin-left: 0.75rem;
                `;
            }

            if (direction === 'right-bottom') {
                return css`
                    left: 100%;
                    top: 0;
                    margin-left: 0.75rem;
                `;
            }

            // tooltip is under anchor
            if (direction === 'bottom-center') {
                return css`
                    top: 100%;
                    right: 50%;
                    margin-top: 0.75rem;
                    transform: translateX(50%);
                `;
            }

            if (direction === 'bottom-left') {
                return css`
                    top: 100%;
                    right: -50%;
                    margin-top: 0.75rem;
                `;
            }

            if (direction === 'bottom-right') {
                return css`
                    top: 100%;
                    left: -50%;
                    margin-top: 0.75rem;
                `;
            }

            // tooltip is left to anchor
            if (direction === 'left-center') {
                return css`
                    right: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                    margin-right: 0.75rem;
                `;
            }

            if (direction === 'left-top') {
                return css`
                    right: 100%;
                    bottom: 0;
                    margin-right: 0.75rem;
                `;
            }

            if (direction === 'left-bottom') {
                return css`
                    right: 100%;
                    top: 0;
                    margin-right: 0.75rem;
                `;
            }

            return null;
        }}
    }
`;

// направление раскрытия тултипа
// TODO: Может выпилить к херам [right-top, right-bottom, left-top, left-bottom] ???
export type direction =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'right-top'
    | 'right-center'
    | 'right-bottom'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'left-top'
    | 'left-center'
    | 'left-bottom';

interface WithDirection {
    direction: direction;
}
interface TooltipProps {
    text: string;
    direction?: direction;
}

export const Tooltip: React.FC<TooltipProps & React.HTMLAttributes<HTMLDivElement>> = ({
    text,
    direction = 'bottom-center',
    children,
    ...rest
}) => {
    return (
        <TL aria-label={text} direction={direction} {...rest}>
            {children}
        </TL>
    );
};
