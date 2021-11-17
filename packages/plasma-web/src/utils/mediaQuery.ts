import { css } from 'styled-components';
import { gridBreakpoints, gridColumns, gridGutters, gridMargins, MediaQueryFunction } from '@sberdevices/plasma-core';

export const breakpoints = {
    XXL: 1200, // Desktop large
    ...gridBreakpoints,
};
export const columns = {
    XXL: 16,
    ...gridColumns,
};
export const margins = {
    XXL: 4,
    ...gridMargins,
    XL: 4,
};
export const gutters = {
    XXL: 1,
    ...gridGutters,
};

export type Breakpoint = keyof typeof breakpoints;

export const sizes = Object.keys(breakpoints) as Breakpoint[];

/**
 * Обертка над css-медиазапросами с заранее определенными брейкпоинтами.
 */
export const mediaQuery = (breakpoint: Breakpoint, deviceScale = 1): MediaQueryFunction => {
    const index = sizes.indexOf(breakpoint);
    const nextBreakpoint = sizes[index - 1] as Breakpoint;
    const min = breakpoints[breakpoint] > 0 ? breakpoints[breakpoint] * deviceScale : null;
    const max = breakpoints[nextBreakpoint] ? (breakpoints[nextBreakpoint] - 1) * deviceScale : null;

    if (min === null && max !== null) {
        return (content) =>
            css`
                @media (max-width: ${max}px) {
                    ${content}
                }
            `;
    }

    if (min !== null && max !== null) {
        return (content) =>
            css`
                @media screen and (min-width: ${min}px) and (max-width: ${max}px) {
                    ${content}
                }
            `;
    }

    return (content) =>
        css`
            @media (min-width: ${min}px) {
                ${content}
            }
        `;
};
