import { FlattenSimpleInterpolation, css } from 'styled-components';
import { scalingPixelBasis, sberPortalScale } from '@sberdevices/plasma-tokens';

export const breakpoints = {
    XL: 960, // TV
    L: 769, // Portal 8 cols
    M: 560, // Portal 6 cols
    S: 0, // Mobile
};
export const columns = {
    XL: 12,
    L: 8,
    M: 6,
    S: 4,
};
export const margins = {
    XL: 64 / scalingPixelBasis,
    L: 56 / scalingPixelBasis,
    M: 56 / scalingPixelBasis,
    S: 16 / scalingPixelBasis,
};
export const gutters = {
    XL: 16 / scalingPixelBasis,
    L: 16 / scalingPixelBasis,
    M: 16 / scalingPixelBasis,
    S: 8 / scalingPixelBasis,
};

export type MediaQueryFunction = (content: FlattenSimpleInterpolation | string) => FlattenSimpleInterpolation;
export type Breakpoint = keyof typeof breakpoints;

export const sizes = Object.keys(breakpoints) as Breakpoint[];

/**
 * Обертка над css-медиазапросами с заранее определенными брейкпоинтами.
 */
export const mediaQuery = (breakpoint: Breakpoint, deviceScale: number = sberPortalScale): MediaQueryFunction => {
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
