import { FlattenSimpleInterpolation, css } from 'styled-components';
import { scalingPixelBasis } from '@sberdevices/plasma-tokens';

export const breakpointValues = {
    xl: 960 / scalingPixelBasis, // TV
    lg: 769 / scalingPixelBasis, // Portal 8 cols
    md: 560 / scalingPixelBasis, // Portal 6 cols
    sm: 0, // Mobile
};

export type MediaQueryFunction = (content: FlattenSimpleInterpolation | string) => FlattenSimpleInterpolation;
export type Breakpoint = keyof typeof breakpointValues;

export const breakpoints = Object.keys(breakpointValues) as Breakpoint[];

export const mediaQuery = (breakpoint: Breakpoint): MediaQueryFunction => {
    const index = breakpoints.indexOf(breakpoint);
    const nextBreakpoint = breakpoints[index - 1] as Breakpoint;
    const min = breakpointValues[breakpoint] > 0 ? breakpointValues[breakpoint] : null;
    const max = breakpointValues[nextBreakpoint] ? breakpointValues[nextBreakpoint] - 1 / scalingPixelBasis : null;

    if (min === null && max !== null) {
        return (content) =>
            css`
                @media (max-width: ${max}rem) {
                    ${content}
                }
            `;
    }

    if (min !== null && max !== null) {
        return (content) =>
            css`
                @media (min-width: ${min}rem) and (max-width: ${max}rem) {
                    ${content}
                }
            `;
    }

    return (content) =>
        css`
            @media (min-width: ${min}rem) {
                ${content}
            }
        `;
};
