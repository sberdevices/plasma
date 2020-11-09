import React, { forwardRef, ReactNode } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import { scalingPixelBasis } from '@sberdevices/plasma-tokens';

/**
 * Умножаем на 2 пиксельные размеры для корректного отображния на устройствах
 */
const sides = 2;
const maxContainerWidth = 1200 / scalingPixelBasis;
const breakpoints = {
    xl: 960 / scalingPixelBasis, // TV
    lg: 769 / scalingPixelBasis, // Portal 8 cols
    md: 560 / scalingPixelBasis, // Portal 6 cols
    sm: 0, // Mobile
};
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

type MediaQueryFunction = (content: FlattenSimpleInterpolation | string) => string;
type Viewport = keyof typeof breakpoints;

const viewports = Object.keys(breakpoints) as Viewport[];

export const mediaQuery = (viewport: Viewport): MediaQueryFunction => {
    const index = viewports.indexOf(viewport);
    const nextBreakpoint = viewports[index - 1] as Viewport;
    const min = breakpoints[viewport] > 0 ? breakpoints[viewport] : null;
    const max = breakpoints[nextBreakpoint] ? breakpoints[nextBreakpoint] - 1 : null;

    if (min === null && max !== null) {
        return (content) => `@media (max-width: ${max}rem) { ${content} }`;
    }

    if (min !== null && max !== null) {
        return (content) => `@media (min-width: ${min}rem) and (max-width: ${max}rem) { ${content} }`;
    }

    return (content) => `@media (min-width: ${min}rem) { ${content} }`;
};

const StyledContainer = styled.div`
    margin: 0 auto;

    display: flex;
    box-sizing: border-box;
    flex-direction: column;

    width: 100%;

    ${viewports.map((viewport) =>
        mediaQuery(viewport)(`
        --container-width: calc(min(100vw, ${maxContainerWidth}rem) - ${margin[viewport] * sides}rem);
        --column-width: calc((var(--container-width) + ${gutter[viewport]}rem) / ${columns[viewport]});
        max-width: var(--container-width);
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

    ${viewports.map((viewport) =>
        mediaQuery(viewport)(`
        margin-left: -${gutter[viewport] / sides}rem;
        margin-right: -${gutter[viewport] / sides}rem;
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
        viewports.map((viewport) =>
            mediaQuery(viewport)(`
                padding-left: ${gutter[viewport] / sides}rem;
                padding-right: ${gutter[viewport] / sides}rem;
                // width: ${($size / columns[viewport]) * 100}%;
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
