import { css, InterpolationFunction } from 'styled-components';

export const applyOutline: InterpolationFunction<{}> = () => css`
    position: relative;

    &::before {
        content: '';

        position: absolute;
        top: var(--plasma-outline-offset);
        left: var(--plasma-outline-offset);
        right: var(--plasma-outline-offset);
        bottom: var(--plasma-outline-offset);

        display: block;
        box-sizing: border-box;

        border: var(--plasma-outline-offset) solid transparent;
        border-radius: var(--plasma-outline-radius);

        transition: box-shadow 0.2s ease-in-out;

        pointer-events: none;
    }

    &:focus::before {
        box-shadow: 0 0 0 var(--plasma-outline-size) var(--plasma-outline-radius);
    }
`;
