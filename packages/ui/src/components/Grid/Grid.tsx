import React from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

const breakpoints = {
    tv: 960,
    portal8: 769,
    portal6: 560,
    mobile: 0,
};
const columns = {
    tv: 12,
    portal8: 8,
    portal6: 6,
    mobile: 4,
};
const margin = {
    tv: 64,
    portal8: 56,
    portal6: 56,
    mobile: 16,
};
const gutter = {
    tv: 16,
    portal8: 16,
    portal6: 16,
    mobile: 8,
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
    } else if (min !== null && max !== null) {
        return (content) => `@media (min-width: ${min}px) and (max-width: ${max}px) { ${content} }`;
    } else {
        return (content) => `@media (min-width: ${min}px) { ${content} }`;
    }
};

const StyledContainer = styled.div`
    margin: 0 auto;

    display: flex;
    box-sizing: border-box;
    flex-direction: column;

    width: 100%;
    max-width: 1200px;

    ${viewports.map((viewport) =>
        mediaQuery(viewport)(`
        padding-left: ${margin[viewport]}px;
        padding-right: ${margin[viewport]}px;
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
        margin-left: -${gutter[viewport] / 2}px;
        margin-right: -${gutter[viewport] / 2}px;
    `),
    )}
`;

export const Row: React.FC<{ className?: string }> = ({ children, className }) => (
    <StyledRow className={className}>{children}</StyledRow>
);

interface StyledColProps {
    /**
     * Размер ячейки, зависящий от максимального количества столбцов.
     */
    size: number;
    /**
     * Отступ ячейки, сдвинет ее на n ячеек вправо.
     */
    offset: number;
}

const StyledCol = styled.div<StyledColProps>`
    box-sizing: border-box;

    ${({ size, offset }) =>
        viewports.map((viewport) =>
            mediaQuery(viewport)(`
        width: ${(size / columns[viewport]) * 100}%;
        padding-left: ${gutter[viewport] / 2}px;
        padding-right: ${gutter[viewport] / 2}px;

        ${
            offset &&
            `
            margin-left: ${(offset / columns[viewport]) * 100}%;
        `
        }
    `),
        )}
`;

export interface ColProps extends Partial<StyledColProps> {
    className?: string;
}

export const Col: React.FC<ColProps> = ({ size = 1, offset = 0, children, className }) => (
    <StyledCol size={size} offset={offset} className={className}>
        {children}
    </StyledCol>
);
