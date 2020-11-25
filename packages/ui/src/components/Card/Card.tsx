import React from 'react';
import styled, { css } from 'styled-components';
import { surfaceLiquid01 } from '@sberdevices/plasma-tokens';

import { Body1 } from '../Typography';
import { addFocus } from '../../mixins/addFocus';
import { PickOptional } from '../../types/PickOptional';

interface StyledRootProps {
    highlightOnFocus: boolean;
    scaleOnFocus: boolean;
    focused: boolean;
}

// В этих константах задаем размеры в em, чтобы не зависеть напрямую от пикселей
// В то же время в числителях - значения в пикселях, взятые из макета
const fontSize = 16;
const borderRadius = 20 / fontSize;
const shadowOffset = 8 / fontSize;
const shadowSize = 24 / fontSize;
const outlineSize = 2 / fontSize;
const outlineRadius = 22 / fontSize;

export const StyledCard = styled(Body1)<StyledRootProps>`
    position: relative;

    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    flex-shrink: 0;

    border-radius: ${borderRadius}em;
    background: ${surfaceLiquid01};
    box-shadow: 0 ${shadowOffset}em ${shadowSize}em rgba(0, 0, 0, 0.1);
    will-change: background-color, transform;

    transition: transform 0.4s ease-in-out;

    ${({ highlightOnFocus, scaleOnFocus, focused }) => css`
        ${addFocus({
            focused,
            outlined: highlightOnFocus,
            outlineSize: `${outlineSize}em`,
            outlineRadius: `${outlineRadius}em`,
        })}

        ${focused &&
        scaleOnFocus &&
        css`
            transform: scale(1.08);
        `}

        &:focus {
            outline: none;
            ${scaleOnFocus &&
            css`
                transform: scale(1.08);
            `}
        }
    `}
`;

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
        PickOptional<StyledRootProps, 'highlightOnFocus' | 'scaleOnFocus' | 'focused'> {
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
}

// eslint-disable-next-line prefer-arrow-callback
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
    { children, highlightOnFocus = false, scaleOnFocus = false, focused = false, ...rest },
    ref,
) {
    return (
        <StyledCard
            highlightOnFocus={highlightOnFocus}
            scaleOnFocus={scaleOnFocus}
            focused={focused}
            ref={ref}
            {...rest}
        >
            {children}
        </StyledCard>
    );
});
