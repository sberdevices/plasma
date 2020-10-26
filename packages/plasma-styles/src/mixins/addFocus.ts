import { css, FlattenSimpleInterpolation, InterpolationFunction } from 'styled-components';
import { buttonFocused } from '@sberdevices/plasma-tokens';

export interface FocusProps {
    /**
     * Состояние в фокусе
     */
    focused?: boolean;
    /**
     * Есть ли рамка у компонента при фокусе
     */
    outlined?: boolean;
    /**
     * Размер фокусной рамки
     */
    outlineSize?: string;
    /**
     * Отступ фокусной рамки от родителя
     */
    outlineOffset?: string;
    /**
     * Цвет фокусной рамки
     */
    outlineColor?: string;
    /**
     * Радиус фокусной рамки
     */
    outlineRadius?: string;
}

export const syntheticFocus = (
    ruleset: FlattenSimpleInterpolation,
    focused?: boolean,
): FlattenSimpleInterpolation => css`
    &:focus {
        ${ruleset}
    }

    ${focused && ruleset};
`;

/**
 * Миксин для добавления фокусной рамки к элементу через псевдоэлемент before
 * @param {FocusProps} props
 * @example
 * // Выведет фокусную рамку размером 2em, скруглением 5em, отступом 2em и цветом 'rebeccapurple'.
 * addFocus({
 *  outlineSize: '2em',
 *  outlineOffset: '2em',
 *  outlineRadius: '5em',
 *  outlineColor: 'rebeccapurple',
 * });
 * @example
 * // Выведет outline размером 4em, скруглением 10px 1px, без отступа и цветом 'greenyellow'.
 * addFocus({
 *  outlineSize: '4em',
 *  outlineOffset: '0',
 *  outlineRadius: '10em 1em',
 *  outlineColor: 'greenyellow',
 * });
 */
export const addFocus: InterpolationFunction<FocusProps> = ({
    focused,
    outlined = true,
    outlineSize = 0,
    outlineOffset = outlineSize,
    outlineColor = buttonFocused,
    outlineRadius = 0,
}) =>
    outlined &&
    css`
        position: relative;

        &::before {
            content: '';

            position: absolute;
            top: -${outlineOffset};
            left: -${outlineOffset};
            right: -${outlineOffset};
            bottom: -${outlineOffset};

            display: block;
            box-sizing: content-box;

            width: 100%;
            height: 100%;

            border: ${outlineSize} solid transparent;
            border-radius: ${outlineRadius};

            transition: box-shadow 0.2s ease-in-out;

            pointer-events: none;
        }

        ${syntheticFocus(
            css`
                &::before {
                    box-shadow: 0 0 0 ${outlineSize} ${outlineColor};
                }
            `,
            focused,
        )}
    `;
