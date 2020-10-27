import React, { forwardRef } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

/**
 * Умножаем на 2 пиксельные размеры для корректного отображния на устройствах
 */
const sides = 2;
const deviceScale = 2;
const breakpoints = {
    xl: 960 * deviceScale, // TV
    lg: 769 * deviceScale, // Portal 8 cols
    md: 560 * deviceScale, // Portal 6 cols
    sm: 0, // Mobile
};
const columns = {
    xl: 12,
    lg: 8,
    md: 6,
    sm: 4,
};
const margin = {
    xl: 64 * deviceScale,
    lg: 56 * deviceScale,
    md: 56 * deviceScale,
    sm: 16,
};
const gutter = {
    xl: 16 * deviceScale,
    lg: 16 * deviceScale,
    md: 16 * deviceScale,
    sm: 8,
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
        return (content) => `@media (max-width: ${max}px) { ${content} }`;
    }

    if (min !== null && max !== null) {
        return (content) => `@media (min-width: ${min}px) and (max-width: ${max}px) { ${content} }`;
    }

    return (content) => `@media (min-width: ${min}px) { ${content} }`;
};

const StyledContainer = styled.div`
    margin: 0 auto;

    display: flex;
    box-sizing: border-box;
    flex-direction: column;

    width: 100%;

    ${viewports.map((viewport) =>
        mediaQuery(viewport)(`
        --container-width: calc(min(100vw, 2400px) - ${margin[viewport] * sides}px);
        --column-width: calc(var(--container-width) / ${columns[viewport]});
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
        margin-left: -${gutter[viewport] / sides}px;
        margin-right: -${gutter[viewport] / sides}px;
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
                padding-left: ${gutter[viewport] / sides}px;
                padding-right: ${gutter[viewport] / sides}px;

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
}

export const Col = forwardRef<HTMLDivElement, ColProps>(({ size = 1, offset = 0, children, className }, ref) => (
    <StyledCol $size={size} $offset={offset} className={className} ref={ref}>
        {children}
    </StyledCol>
));
