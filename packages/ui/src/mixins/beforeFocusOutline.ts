import { css } from 'styled-components';

/**
 * @param {number} size (em)
 * @param {number} radius (em)
 * @param {number} offset (em)
 * @param {string} color (hex)
 * @param {boolean} focused Фокус через состояние или пропс
 */
export const beforeFocusOutline = (
    size: number,
    radius: number,
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
        border-radius: ${radius}em;
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
