import { css } from 'styled-components';
import type { InterpolationFunction } from 'styled-components';

import { prepareStandardBreakpointTypo } from './helpers';

const typoS = prepareStandardBreakpointTypo({
    'dspl-l': {
        'font-size': '5.5rem',
        'font-weight': '600',
        'line-height': '5.75rem',
    },
    'dspl-m': {
        'font-size': '3.5rem',
        'font-weight': '600',
        'line-height': '3.875rem',
    },
    'dspl-s': {
        'font-size': '2.5rem',
        'font-weight': '600',
        'line-height': '2.875rem',
    },
    h1: {
        'font-size': '1.75rem',
        'font-weight': '600',
        'line-height': '2.125rem',
    },
    h2: {
        'font-size': '1.5rem',
        'font-weight': '600',
        'line-height': '1.875rem',
    },
    h3: {
        'font-size': '1.25rem',
        'font-weight': '600',
        'line-height': '1.625rem',
    },
    h4: {
        'font-size': '1.125rem',
        'font-weight': '600',
        'line-height': '1.5rem',
    },
    h5: {
        'font-size': '0.875rem',
        'font-weight': '600',
        'line-height': '1.375rem',
    },
    'body-l': {
        'font-size': '1.125rem',
        'font-weight': '400',
        'line-height': '1.375rem',
    },
    'body-l-bold': {
        'font-size': '1.125rem',
        'font-weight': '600',
        'line-height': '1.375rem',
    },
    'body-m': {
        'font-size': '1rem',
        'font-weight': '400',
        'line-height': '1.25rem',
    },
    'body-m-bold': {
        'font-size': '1rem',
        'font-weight': '600',
        'line-height': '1.25rem',
    },
    'body-s': {
        'font-size': '0.875rem',
        'font-weight': '400',
        'line-height': '1.125rem',
    },
    'body-s-bold': {
        'font-size': '0.875rem',
        'font-weight': '600',
        'line-height': '1.125rem',
    },
    'body-xs': {
        'font-size': '0.75rem',
        'font-weight': '400',
        'line-height': '0.875rem',
    },
    'body-xs-bold': {
        'font-size': '0.75rem',
        'font-weight': '600',
        'line-height': '0.875rem',
    },
    'body-xxs': {
        'font-size': '0.625rem',
        'font-weight': '400',
        'line-height': '0.75rem',
    },
    'body-xxs-bold': {
        'font-size': '0.625rem',
        'font-weight': '600',
        'line-height': '0.75rem',
    },
    'text-l': {
        'font-size': '1.125rem',
        'font-weight': '400',
        'line-height': '1.625rem',
    },
    'text-l-bold': {
        'font-size': '1.125rem',
        'font-weight': '600',
        'line-height': '1.625rem',
    },
    'text-m': {
        'font-size': '1rem',
        'font-weight': '400',
        'line-height': '1.5rem',
    },
    'text-m-bold': {
        'font-size': '1rem',
        'font-weight': '600',
        'line-height': '1.5rem',
    },
    'text-s': {
        'font-size': '0.875rem',
        'font-weight': '400',
        'line-height': '1.25rem',
    },
    'text-s-bold': {
        'font-size': '0.875rem',
        'font-weight': '600',
        'line-height': '1.25rem',
    },
    'text-xs': {
        'font-size': '0.75rem',
        'font-weight': '400',
        'line-height': '1rem',
    },
    'text-xs-bold': {
        'font-size': '0.75rem',
        'font-weight': '600',
        'line-height': '1rem',
    },
});
const typoM = prepareStandardBreakpointTypo({
    'dspl-l': {
        'font-size': '7rem',
        'font-weight': '600',
        'line-height': '7rem',
    },
    'dspl-m': {
        'font-size': '4.5rem',
        'font-weight': '600',
        'line-height': '4.75rem',
    },
    'dspl-s': {
        'font-size': '3rem',
        'font-weight': '600',
        'line-height': '3.375rem',
    },
    h1: {
        'font-size': '2.5rem',
        'font-weight': '600',
        'line-height': '2.875rem',
    },
    h2: {
        'font-size': '1.75rem',
        'font-weight': '600',
        'line-height': '2.125rem',
    },
    h3: {
        'font-size': '1.25rem',
        'font-weight': '600',
        'line-height': '1.625rem',
    },
    h4: {
        'font-size': '1.125rem',
        'font-weight': '600',
        'line-height': '1.5rem',
    },
    h5: {
        'font-size': '1rem',
        'font-weight': '600',
        'line-height': '1.375rem',
    },
    'body-l': {
        'font-size': '1.125rem',
        'font-weight': '400',
        'line-height': '1.375rem',
    },
    'body-l-bold': {
        'font-size': '1.125rem',
        'font-weight': '600',
        'line-height': '1.375rem',
    },
    'body-m': {
        'font-size': '1rem',
        'font-weight': '400',
        'line-height': '1.25rem',
    },
    'body-m-bold': {
        'font-size': '1rem',
        'font-weight': '600',
        'line-height': '1.25rem',
    },
    'body-s': {
        'font-size': '0.875rem',
        'font-weight': '400',
        'line-height': '1.125rem',
    },
    'body-s-bold': {
        'font-size': '0.875rem',
        'font-weight': '600',
        'line-height': '1.125rem',
    },
    'body-xs': {
        'font-size': '0.75rem',
        'font-weight': '400',
        'line-height': '0.875rem',
    },
    'body-xs-bold': {
        'font-size': '0.75rem',
        'font-weight': '600',
        'line-height': '0.875rem',
    },
    'body-xxs': {
        'font-size': '0.625rem',
        'font-weight': '400',
        'line-height': '0.75rem',
    },
    'body-xxs-bold': {
        'font-size': '0.625rem',
        'font-weight': '600',
        'line-height': '0.75rem',
    },
    'text-l': {
        'font-size': '1.25rem',
        'font-weight': '400',
        'line-height': '1.75rem',
    },
    'text-l-bold': {
        'font-size': '1.25rem',
        'font-weight': '600',
        'line-height': '1.75rem',
    },
    'text-m': {
        'font-size': '1rem',
        'font-weight': '400',
        'line-height': '1.5rem',
    },
    'text-m-bold': {
        'font-size': '1rem',
        'font-weight': '600',
        'line-height': '1.5rem',
    },
    'text-s': {
        'font-size': '0.875rem',
        'font-weight': '400',
        'line-height': '1.25rem',
    },
    'text-s-bold': {
        'font-size': '0.875rem',
        'font-weight': '600',
        'line-height': '1.25rem',
    },
    'text-xs': {
        'font-size': '0.75rem',
        'font-weight': '400',
        'line-height': '1rem',
    },
    'text-xs-bold': {
        'font-size': '0.75rem',
        'font-weight': '600',
        'line-height': '1rem',
    },
});
const typoL = prepareStandardBreakpointTypo({
    'dspl-l': {
        'font-size': '8rem',
        'font-weight': '600',
        'line-height': '8rem',
    },
    'dspl-m': {
        'font-size': '5.5rem',
        'font-weight': '600',
        'line-height': '5.75rem',
    },
    'dspl-s': {
        'font-size': '4rem',
        'font-weight': '600',
        'line-height': '4.25rem',
    },
    h1: {
        'font-size': '3rem',
        'font-weight': '600',
        'line-height': '3.375rem',
    },
    h2: {
        'font-size': '2rem',
        'font-weight': '600',
        'line-height': '2.375rem',
    },
    h3: {
        'font-size': '1.5rem',
        'font-weight': '600',
        'line-height': '1.875rem',
    },
    h4: {
        'font-size': '1.25rem',
        'font-weight': '600',
        'line-height': '1.625rem',
    },
    h5: {
        'font-size': '1.125rem',
        'font-weight': '600',
        'line-height': '1.5rem',
    },
    'body-l': {
        'font-size': '1.125rem',
        'font-weight': '400',
        'line-height': '1.375rem',
    },
    'body-l-bold': {
        'font-size': '1.125rem',
        'font-weight': '600',
        'line-height': '1.375rem',
    },
    'body-m': {
        'font-size': '1rem',
        'font-weight': '400',
        'line-height': '1.25rem',
    },
    'body-m-bold': {
        'font-size': '1rem',
        'font-weight': '600',
        'line-height': '1.25rem',
    },
    'body-s': {
        'font-size': '0.875rem',
        'font-weight': '400',
        'line-height': '1.125rem',
    },
    'body-s-bold': {
        'font-size': '0.875rem',
        'font-weight': '600',
        'line-height': '1.125rem',
    },
    'body-xs': {
        'font-size': '0.75rem',
        'font-weight': '400',
        'line-height': '0.875rem',
    },
    'body-xs-bold': {
        'font-size': '0.75rem',
        'font-weight': '600',
        'line-height': '0.875rem',
    },
    'body-xxs': {
        'font-size': '0.625rem',
        'font-weight': '400',
        'line-height': '0.75rem',
    },
    'body-xxs-bold': {
        'font-size': '0.625rem',
        'font-weight': '600',
        'line-height': '0.75rem',
    },
    'text-l': {
        'font-size': '1.5rem',
        'font-weight': '400',
        'line-height': '2rem',
    },
    'text-l-bold': {
        'font-size': '1.5rem',
        'font-weight': '600',
        'line-height': '2rem',
    },
    'text-m': {
        'font-size': '1.125rem',
        'font-weight': '400',
        'line-height': '1.625rem',
    },
    'text-m-bold': {
        'font-size': '1.125rem',
        'font-weight': '600',
        'line-height': '1.625rem',
    },
    'text-s': {
        'font-size': '0.875rem',
        'font-weight': '400',
        'line-height': '1.25rem',
    },
    'text-s-bold': {
        'font-size': '0.875rem',
        'font-weight': '600',
        'line-height': '1.25rem',
    },
    'text-xs': {
        'font-size': '0.75rem',
        'font-weight': '400',
        'line-height': '1rem',
    },
    'text-xs-bold': {
        'font-size': '0.75rem',
        'font-weight': '600',
        'line-height': '1rem',
    },
});

export const standard: InterpolationFunction<{ deviceScale?: number }> = ({ deviceScale = 1 }) => css`
    :root {
        --plasma-typo-display-font-family: 'SB Sans Display', sans-serif;
        --plasma-typo-text-font-family: 'SB Sans Text', sans-serif;
        --plasma-typo-dspl-l-font-family: var(--plasma-typo-display-font-family);
        --plasma-typo-dspl-l-font-style: normal;
        --plasma-typo-dspl-l-letter-spacing: normal;
        --plasma-typo-dspl-m-font-family: var(--plasma-typo-display-font-family);
        --plasma-typo-dspl-m-font-style: normal;
        --plasma-typo-dspl-m-letter-spacing: normal;
        --plasma-typo-dspl-s-font-family: var(--plasma-typo-display-font-family);
        --plasma-typo-dspl-s-font-style: normal;
        --plasma-typo-dspl-s-letter-spacing: normal;
        --plasma-typo-h1-font-family: var(--plasma-typo-display-font-family);
        --plasma-typo-h1-font-style: normal;
        --plasma-typo-h1-letter-spacing: normal;
        --plasma-typo-h2-font-family: var(--plasma-typo-display-font-family);
        --plasma-typo-h2-font-style: normal;
        --plasma-typo-h2-letter-spacing: normal;
        --plasma-typo-h3-font-family: var(--plasma-typo-display-font-family);
        --plasma-typo-h3-font-style: normal;
        --plasma-typo-h3-letter-spacing: normal;
        --plasma-typo-h4-font-family: var(--plasma-typo-display-font-family);
        --plasma-typo-h4-font-style: normal;
        --plasma-typo-h4-letter-spacing: normal;
        --plasma-typo-h5-font-family: var(--plasma-typo-display-font-family);
        --plasma-typo-h5-font-style: normal;
        --plasma-typo-h5-letter-spacing: normal;
        --plasma-typo-body-l-font-family: var(--plasma-typo-text-font-family);
        --plasma-typo-body-l-font-style: normal;
        --plasma-typo-body-l-letter-spacing: normal;
        --plasma-typo-body-m-font-family: var(--plasma-typo-text-font-family);
        --plasma-typo-body-m-font-style: normal;
        --plasma-typo-body-m-letter-spacing: normal;
        --plasma-typo-body-s-font-family: var(--plasma-typo-text-font-family);
        --plasma-typo-body-s-font-style: normal;
        --plasma-typo-body-s-letter-spacing: normal;
        --plasma-typo-body-xs-font-family: var(--plasma-typo-text-font-family);
        --plasma-typo-body-xs-font-style: normal;
        --plasma-typo-body-xs-letter-spacing: normal;
        --plasma-typo-body-xxs-font-family: var(--plasma-typo-text-font-family);
        --plasma-typo-body-xxs-font-style: normal;
        --plasma-typo-body-xxs-letter-spacing: normal;
        --plasma-typo-text-l-font-family: var(--plasma-typo-text-font-family);
        --plasma-typo-text-l-font-style: normal;
        --plasma-typo-text-l-letter-spacing: -0.019em;
        --plasma-typo-text-m-font-family: var(--plasma-typo-text-font-family);
        --plasma-typo-text-m-font-style: normal;
        --plasma-typo-text-m-letter-spacing: -0.019em;
        --plasma-typo-text-s-font-family: var(--plasma-typo-text-font-family);
        --plasma-typo-text-s-font-style: normal;
        --plasma-typo-text-s-letter-spacing: -0.019em;
        --plasma-typo-text-xs-font-family: var(--plasma-typo-text-font-family);
        --plasma-typo-text-xs-font-style: normal;
        --plasma-typo-text-xs-letter-spacing: -0.019em;

        font-size: ${16 * deviceScale}px;

        @media (max-width: ${559 * deviceScale}px) {
            ${typoS}
        }

        @media (min-width: ${560 * deviceScale}px) and (max-width: ${959 * deviceScale}px) {
            ${typoM}
        }

        @media (min-width: ${960 * deviceScale}px) {
            ${typoL}
        }
    }
`;
