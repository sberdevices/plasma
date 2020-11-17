import React, { forwardRef, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { scalingPixelBasis } from '@sberdevices/plasma-tokens';

import { mediaQuery, breakpoints } from '../../utils';

const sides = 2;
const maxContainerWidth = 1200 / scalingPixelBasis;
const columns = {
    xl: 12,
    lg: 8,
    md: 6,
    sm: 4,
};
const margin = {
    xl: 64 / scalingPixelBasis,
    lg: 56 / scalingPixelBasis,
    md: 56 / scalingPixelBasis,
    sm: 16 / scalingPixelBasis,
};
const gutter = {
    xl: 16 / scalingPixelBasis,
    lg: 16 / scalingPixelBasis,
    md: 16 / scalingPixelBasis,
    sm: 8 / scalingPixelBasis,
};

const StyledContainer = styled.div`
    margin: 0 auto;

    display: flex;
    box-sizing: border-box;
    flex-direction: column;

    width: 100%;
    max-width: var(--container-width);
    padding-left: var(--container-padding);
    padding-right: var(--container-padding);

    ${breakpoints.map((breakpoint) =>
        mediaQuery(breakpoint)(css`
            --container-width: min(100%, ${maxContainerWidth}rem);
            --container-padding: ${margin[breakpoint]}rem;
            --column-width: calc(
                (var(--container-width) - var(--container-padding) + ${gutter[breakpoint]}rem) / ${columns[breakpoint]}
            );
        `),
    )}
`;

export const Container: React.FC<{ className?: string }> = ({ children, className }) => (
    <StyledContainer className={className}>{children}</StyledContainer>
);

const StyledRow = styled.div`
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;

    ${breakpoints.map((breakpoint) =>
        mediaQuery(breakpoint)(css`
            margin-left: -${gutter[breakpoint] / sides}rem;
            margin-right: -${gutter[breakpoint] / sides}rem;
        `),
    )}
`;

export const Row: React.FC<{ className?: string }> = ({ children, className }) => (
    <StyledRow className={className}>{children}</StyledRow>
);

interface StyledColProps {
    $size: number;
    $offset: number;
}

const StyledCol = styled.div<StyledColProps>`
    box-sizing: border-box;

    ${({ $size, $offset }) =>
        breakpoints.map((breakpoint) =>
            mediaQuery(breakpoint)(css`
                padding-left: ${gutter[breakpoint] / sides}rem;
                padding-right: ${gutter[breakpoint] / sides}rem;
                ${$size !== 1 ? `width: calc(var(--column-width) * ${$size})` : 'width: var(--column-width)'};
                ${$offset && `margin-left: calc(var(--column-width) * ${$offset})`};
            `),
        )}
`;

export interface ColProps {
    /**
     * Размер ячейки, зависящий от максимального количества столбцов.
     */
    size?: number;
    /**
     * Отступ ячейки, сдвинет ее на n ячеек вправо.
     */
    offset?: number;
    className?: string;
    children?: ReactNode;
}

export const Col = forwardRef<HTMLDivElement, ColProps>(({ size = 1, offset = 0, children, className }, ref) => (
    <StyledCol $size={size} $offset={offset} className={className} ref={ref}>
        {children}
    </StyledCol>
));
