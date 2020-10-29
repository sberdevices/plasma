import { css, FlattenSimpleInterpolation } from 'styled-components';

/**
 * @param {string} size css-значение с ед./изм.
 * @param {string} radius css-значение с ед./изм.
 * @param {string} offset css-значение с ед./изм.
 * @param {string} color hex, rgba, alias
 * @param {boolean} focused Фокус через состояние или пропс
 * @example
 * // Выведет outline размером 2em, скруглением 5em, отступом 2em и цветом 'rebeccapurple'.
 * beforeFocusOutline(2, 5, 2, 'rebeccapurple');
 * @example
 * // Выведет outline размером 4em, скруглением 10px 1px, без отступа и цветом 'greenyellow'.
 * beforeFocusOutline(4, '10px 1px', 0, 'greenyellow');
 */
export const beforeFocusOutline = (
    size: string,
    radius: string,
    offset: string,
    color: string,
    focused?: boolean,
): FlattenSimpleInterpolation => css`
    position: relative;

    &::before {
        position: absolute;
        top: -${offset};
        left: -${offset};
        right: -${offset};
        bottom: -${offset};

        width: 100%;
        height: 100%;

        border: ${size} solid transparent;
        border-radius: ${radius};
        content: '';

        transition: box-shadow 0.2s ease-in-out;
    }

    &:focus::before {
        box-shadow: 0 0 0 ${size} ${color};
    }

    ${focused &&
    css`
        &::before {
            box-shadow: 0 0 0 ${size} ${color};
        }
    `};
`;
