import { css, InterpolationFunction } from 'styled-components';

export interface MaxLinesProps {
    /**
     * Максимальное количество отображаемых строк,
     * в последней будет многоточие
     */
    maxLines?: number;
}

export const applyMaxLines: InterpolationFunction<MaxLinesProps> = ({ maxLines }) =>
    maxLines &&
    css`
        display: -webkit-box;
        overflow: hidden;
        box-sizing: border-box;

        white-space: normal;

        -webkit-box-orient: vertical;
        -webkit-line-clamp: ${maxLines};
    `;
