import React from 'react';
import styled, { css } from 'styled-components';
import { surfaceCard } from '@sberdevices/plasma-tokens';
import { addFocus, applyRoundness, radiuses, syntheticFocus } from '@sberdevices/plasma-core';
import type { FocusProps, OutlinedProps, RoundnessProps } from '@sberdevices/plasma-core';

import { Body1 } from '../Typography';

// В этих константах задаем размеры в em, чтобы не зависеть напрямую от пикселей
// В то же время в числителях - значения в пикселях, взятые из макета
const fontSize = 16;
const shadowOffset = 8 / fontSize;
const shadowSize = 24 / fontSize;
const outlineSize = 2 / fontSize;
const DEFAULT_ROUNDNESS = 20;

interface ScaleOnFocusProps {
    /**
     * Увеличение по фокусу
     */
    scaleOnFocus?: boolean;
}
interface StyledRootProps extends FocusProps, OutlinedProps, RoundnessProps, ScaleOnFocusProps {}

export const StyledCard = styled(Body1)<StyledRootProps>`
    ${applyRoundness};

    position: relative;

    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    flex-shrink: 0;

    background: ${surfaceCard};
    box-shadow: 0 ${shadowOffset}em ${shadowSize}em rgba(0, 0, 0, 0.1);

    transition: transform 0.4s ease-in-out;

    ${({ focused, outlined, roundness, scaleOnFocus }) => css`
        ${addFocus({
            focused,
            outlined,
            outlineSize: `${outlineSize}rem`,
            outlineRadius: `${radiuses[roundness] + outlineSize}rem`,
        })}

        ${scaleOnFocus &&
        syntheticFocus(
            css`
                & {
                    transform: scale(1.04);
                }
            `,
            focused,
        )}

        &:focus {
            outline: none;
        }
    `}
`;

export interface CardProps
    extends FocusProps,
        OutlinedProps,
        ScaleOnFocusProps,
        Partial<RoundnessProps>,
        React.HTMLAttributes<HTMLDivElement> {}

/**
 * Контейнер со скругленными углами с возможностью фокусировки на нем.
 */
// eslint-disable-next-line prefer-arrow-callback
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
    { roundness = DEFAULT_ROUNDNESS, children, ...rest },
    ref,
) {
    return (
        <StyledCard ref={ref} roundness={roundness} {...rest}>
            {children}
        </StyledCard>
    );
});
