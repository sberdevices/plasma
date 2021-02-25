import { css, InterpolationFunction } from 'styled-components';

/**
 * Набор часто встречающихся скруглений.
 */
export const radiuses = {
    250: 15.625,
    32: 2,
    28: 1.75,
    24: 1.5,
    20: 1.25,
    18: 1.125,
    16: 1,
    14: 0.875,
    12: 0.75,
    8: 0.5,
    0: 0,
};

export type Roundness = keyof typeof radiuses;
export interface RoundnessProps {
    /**
     * Скругленность
     */
    roundness: Roundness;
}

/**
 * Миксин скругленности.
 */
export const applyRoundness: InterpolationFunction<RoundnessProps> = ({ roundness }) =>
    css`
        border-radius: ${radiuses[roundness]}rem;
    `;
