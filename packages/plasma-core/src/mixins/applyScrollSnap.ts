import { css, InterpolationFunction } from 'styled-components';

import type { SnapAlign } from '../types';

export interface ScrollSnapProps {
    scrollSnapAlign?: SnapAlign;
}

export const applyScrollSnap: InterpolationFunction<ScrollSnapProps> = ({ scrollSnapAlign }) =>
    scrollSnapAlign &&
    css`
        scroll-snap-align: ${scrollSnapAlign};
    `;
