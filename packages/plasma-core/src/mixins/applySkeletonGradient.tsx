import { css, keyframes, InterpolationFunction } from 'styled-components';

import { skeletonGradient, skeletonGradientLighter } from '../tokens';

const loading = keyframes`
    from {
        background-position: 0vw 0%;
    }

    to {
        background-position: 100vw 0%;
    }
`;

export interface SkeletonGradientProps {
    lighter?: boolean;
}

export const applySkeletonGradient: InterpolationFunction<SkeletonGradientProps> = ({ lighter }) =>
    css`
        background-image: ${lighter ? skeletonGradientLighter : skeletonGradient};
        background-size: 100vw 100vh;

        animation: ${loading} 4s linear infinite;
    `;
