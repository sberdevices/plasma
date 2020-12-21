import { css, InterpolationFunction } from 'styled-components';
import { colors } from '@sberdevices/plasma-tokens';

/**
 * Общие цветовые стили оформления кнопок, баджей и т.п.
 */
export const views = {
    accent: css`
        background-color: ${colors.accent};
        color: ${colors.white};
    `,
    primary: css`
        background-color: ${colors.buttonAccent};
        color: ${colors.white};
    `,
    secondary: css`
        background-color: ${colors.buttonSecondary};
        color: ${colors.text};
    `,
    checked: css`
        background-color: ${colors.buttonChecked};
        /**
         * FixMe: Заменить на соответствующий цвет при исправлении токенов дизайнерами
         */
        color: ${colors.background};
    `,
    warning: css`
        background-color: ${colors.buttonWarning};
        color: ${colors.white};
    `,
    critical: css`
        background-color: ${colors.buttonCritical};
        color: ${colors.white};
    `,
    clear: css`
        background-color: ${colors.transparent};
        color: ${colors.text};
    `,
    index: css`
        background-color: ${colors.blackSecondary};
        color: ${colors.text};
    `,
};

export type View = keyof typeof views;
export interface ViewProps {
    /**
     * Вид компонента
     */
    view?: View;
}

/**
 * Миксин для применения общих цветовых стилей.
 */
export const applyView: InterpolationFunction<ViewProps> = ({ view }) => view && views[view];
