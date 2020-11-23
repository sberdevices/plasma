import { css, keyframes, InterpolationFunction } from 'styled-components';

const gradientAnimation = (brightness = 0.1) => `linear-gradient(
    90deg,
    rgba(255, 255, 255, ${0.9 * brightness}) 0%,
    rgba(255, 255, 255, ${0.8 * brightness}) 6.25%,
    rgba(255, 255, 255, ${0.5 * brightness}) 12.5%,
    rgba(255, 255, 255, ${0.1 * brightness}) 25%,
    rgba(255, 255, 255, ${0.5 * brightness}) 37.5%,
    rgba(255, 255, 255, ${0.8 * brightness}) 43.75%,
    rgba(255, 255, 255, ${0.9 * brightness}) 50%,
    rgba(255, 255, 255, ${0.8 * brightness}) 56.25%,
    rgba(255, 255, 255, ${0.5 * brightness}) 62.5%,
    rgba(255, 255, 255, ${0.1 * brightness}) 75%,
    rgba(255, 255, 255, ${0.5 * brightness}) 87.5%,
    rgba(255, 255, 255, ${0.8 * brightness}) 93.75%,
    rgba(255, 255, 255, ${0.9 * brightness}) 100%
)`;

const loading = keyframes`
    from {
        background-position: 0vw 0%;
    }

    to {
        background-position: 100vw 0%;
    }
`;

export const applySkeletonGradient: InterpolationFunction<{ $lighter?: boolean }> = ({ $lighter }) =>
    css`
        background-image: ${gradientAnimation($lighter ? 0.4 : 0.1)};
        background-size: 100vw 100vh;

        animation: ${loading} 4s linear infinite;
    `;
