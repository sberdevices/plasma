import React from 'react';
import styled, { css } from 'styled-components';
import { surfaceLiquid01, scalingPixelBasis } from '@sberdevices/plasma-tokens';

import { addFocus, FocusProps, applyMotion, MotionProps } from '../../mixins';
import { PickOptional } from '../../types';
import { Body1 } from '../Typography';

// В этих константах задаем размеры в em, чтобы не зависеть напрямую от пикселей
// В то же время в числителях - значения в пикселях, взятые из макета
const fontSize = 16;
const shadowOffset = 8 / fontSize;
const shadowSize = 24 / fontSize;
const outlineSize = 2 / fontSize;
const outlineRadius = 22 / fontSize;

const radius = {
    250: 250 / scalingPixelBasis,
    20: 20 / scalingPixelBasis,
    12: 12 / scalingPixelBasis,
};

interface StyledRootProps extends FocusProps, MotionProps {
    roundness?: keyof typeof radius;
}

export const StyledCard = styled(Body1)<StyledRootProps>`
    ${applyMotion}

    position: relative;

    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    flex-shrink: 0;

    background: ${surfaceLiquid01};
    box-shadow: 0 ${shadowOffset}em ${shadowSize}em rgba(0, 0, 0, 0.1);
    will-change: background-color, transform;

    transition: transform 0.4s ease-in-out;

    ${({ focused, outlined }) => css`
        ${addFocus({
            focused,
            outlined,
            outlineSize: `${outlineSize}em`,
            outlineRadius: `${outlineRadius}em`,
        })}

        &:focus {
            outline: none;
        }
    `}

    ${({ roundness = 20 }) => css`
        border-radius: ${radius[roundness]}rem;
    `}
`;

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
        MotionProps,
        FocusProps,
        PickOptional<StyledRootProps, 'roundness'> {}

// eslint-disable-next-line prefer-arrow-callback
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card({ children, ...rest }, ref) {
    return (
        <StyledCard ref={ref} {...rest}>
            {children}
        </StyledCard>
    );
});
