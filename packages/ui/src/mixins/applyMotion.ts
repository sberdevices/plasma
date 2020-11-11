import { css, InterpolationFunction } from 'styled-components';

export interface MotionProps {
    /**
     * Увеличение по нажатию и ховеру, по умолчанию включено
     */
    motion?: boolean;
}

export const applyMotion: InterpolationFunction<MotionProps> = ({ motion }) =>
    motion &&
    css`
        transition: transform 0.1s ease-in-out;

        &:hover {
            transform: scale(1.04);
        }
        &:active {
            transform: scale(0.96);
        }
    `;
