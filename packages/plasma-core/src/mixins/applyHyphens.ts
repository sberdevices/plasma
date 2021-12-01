import { css, InterpolationFunction } from 'styled-components';

export interface BreakWordProps {
    breakWord?: boolean;
}

/*
 * Миксин переноса слов по слогам
 */
export const applyHyphens: InterpolationFunction<BreakWordProps> = ({ breakWord = true }) =>
    breakWord &&
    css`
        overflow-wrap: break-word;
        hyphens: auto;
    `;
