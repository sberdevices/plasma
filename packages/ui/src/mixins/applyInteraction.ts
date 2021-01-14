import { css, InterpolationFunction } from 'styled-components';

export interface InteractionProps {
    /**
     * Увеличение по нажатию и ховеру
     */
    scaleOnInteraction?: boolean;
}

export const applyInteraction: InterpolationFunction<InteractionProps> = ({ scaleOnInteraction }) =>
    scaleOnInteraction &&
    css`
        transition: transform 0.1s ease-in-out;

        &:hover {
            transform: scale(1.04);
        }

        &:active {
            transform: scale(0.96);
        }
    `;
