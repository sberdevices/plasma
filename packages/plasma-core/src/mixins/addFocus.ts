import { css, FlattenSimpleInterpolation, InterpolationFunction } from 'styled-components';

import { buttonFocused } from '../tokens';

import 'focus-visible';

export interface FocusProps {
    /**
     * Компонент в фокусе
     */
    focused?: boolean;
}

export interface OutlinedProps {
    /**
     * Добавить рамку при фокусе
     */
    outlined?: boolean;
}

type SynthesizeFocus = (ruleset: FlattenSimpleInterpolation, focused?: boolean) => FlattenSimpleInterpolation;

interface OutlineProps {
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
    /**
     * Пользовательская функция синтетического фокуса
     */
    synthesizeFocus?: SynthesizeFocus;
}

export const syntheticFocus: SynthesizeFocus = (ruleset, focused) => css`
    &.focus-visible:focus {
        outline: none;
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
export const addFocus: InterpolationFunction<FocusProps & OutlinedProps & OutlineProps> = ({
    focused,
    outlined = true,
    outlineSize = '0.125rem',
    outlineOffset = outlineSize,
    outlineColor = buttonFocused,
    outlineRadius = 0,
    synthesizeFocus = syntheticFocus,
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

            border: ${outlineSize} solid transparent;
            border-radius: ${outlineRadius};

            transition: box-shadow 0.2s ease-in-out;

            pointer-events: none;
        }

        ${synthesizeFocus(
            css`
                &::before {
                    box-shadow: 0 0 0 ${outlineSize} ${outlineColor};
                }
            `,
            focused,
        )}
    `;
