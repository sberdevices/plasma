import { css, InterpolationFunction } from 'styled-components';

import {
    accent,
    white,
    text,
    buttonAccent,
    buttonSecondary,
    buttonWarning,
    buttonCritical,
    buttonChecked,
    transparent,
    background,
    blackSecondary,
} from '../tokens';

/**
 * Общие цветовые стили оформления кнопок, баджей и т.п.
 */
export const views = {
    accent: css`
        background-color: ${accent};
        color: ${white};
    `,
    primary: css`
        background-color: ${buttonAccent};
        color: ${white};
    `,
    secondary: css`
        background-color: ${buttonSecondary};
        color: ${text};
    `,
    warning: css`
        background-color: ${buttonWarning};
        color: ${white};
    `,
    critical: css`
        background-color: ${buttonCritical};
        color: ${white};
    `,
    checked: css`
        background-color: ${buttonChecked};
        /**
         * FixMe: Заменить на соответствующий цвет при исправлении токенов дизайнерами
         */
        color: ${background};
    `,
    clear: css`
        background-color: ${transparent};
        color: ${text};
    `,
    overlay: css`
        background-color: ${blackSecondary};
        color: ${white};
    `,
};

export type View = keyof typeof views;
export interface ViewProps {
    /**
     * Вид компонента
     */
    view: View;
}

/**
 * Миксин для применения общих цветовых стилей.
 */
export const applyView: InterpolationFunction<ViewProps> = ({ view }) => views[view];
