import { css } from 'styled-components';

/**
 * @param {number} size (em)
 * @param {number|string} radius (em) Числовое значение в em или css-значение с ед./изм.
 * @param {number} offset (em)
 * @param {string} color (hex)
 * @param {boolean} focused Фокус через состояние или пропс
 * @example
 * // Выведет outline размером 2em, скруглением 5em, отступом 2em и цветом 'rebeccapurple'.
 * beforeFocusOutline(2, 5, 2, 'rebeccapurple');
 * @example
 * // Выведет outline размером 4em, скруглением 10px 1px, без отступа и цветом 'greenyellow'.
 * beforeFocusOutline(4, '10px 1px', 0, 'greenyellow');
 */
export const beforeFocusOutline = (
    size: number,
    radius: number|string,
    offset: number,
    color: string,
    focused?: boolean,
) => css`
    position: relative;

    &::before {
        position: absolute;
        top: -${offset}em;
        left: -${offset}em;
        right: -${offset}em;
        bottom: -${offset}em;

        width: 100%;
        height: 100%;

        border: ${size}em solid transparent;
        border-radius: ${typeof radius === 'number' ? `${radius}em` : radius};
        content: '';

        transition: box-shadow 0.2s ease-in-out;
    }

    &:focus::before {
        box-shadow: 0 0 0 ${size}em ${color};
    }

    ${focused &&
    css`
        &::before {
            box-shadow: 0 0 0 ${size}em ${color};
        }
    `};
`;
