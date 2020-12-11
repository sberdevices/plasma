import { css, InterpolationFunction } from 'styled-components';
import { scalingPixelBasis } from '@sberdevices/plasma-tokens';

/**
 * Набор часто встречающихся скруглений.
 */
export const radiuses = {
    250: 250 / scalingPixelBasis,
    32: 32 / scalingPixelBasis,
    28: 28 / scalingPixelBasis,
    24: 24 / scalingPixelBasis,
    20: 20 / scalingPixelBasis,
    18: 18 / scalingPixelBasis,
    16: 16 / scalingPixelBasis,
    14: 14 / scalingPixelBasis,
    12: 12 / scalingPixelBasis,
    8: 8 / scalingPixelBasis,
    0: 0,
};

export type Roundness = keyof typeof radiuses;
export interface RoundnessProps {
    /**
     * Скругленность
     */
    roundness?: Roundness;
}

/**
 * Миксин скругленности.
 */
export const applyRoundness: InterpolationFunction<RoundnessProps> = ({ roundness }) =>
    !!roundness &&
    css`
        border-radius: ${radiuses[roundness]}rem;
    `;
