import { css, InterpolationFunction } from 'styled-components';
import { colors } from '@sberdevices/plasma-tokens';

/**
 * Общие цветовые стили оформления кнопок, баджей и т.п.
 */
export const views = {
    accent: css`
        background-color: ${colors.accent};
        color: ${colors.text};
    `,
    primary: css`
        background-color: ${colors.buttonAccent};
        color: ${colors.text};
    `,
    secondary: css`
        background-color: ${colors.buttonSecondary};
        color: ${colors.text};
    `,
    checked: css`
        background-color: ${colors.buttonChecked};
        color: ${colors.black};
    `,
    warning: css`
        background-color: ${colors.buttonWarning};
        color: ${colors.text};
    `,
    critical: css`
        background-color: ${colors.buttonCritical};
        color: ${colors.text};
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
    view: View;
}

/**
 * Миксин для применения общих цветовых стилей.
 */
export const applyView: InterpolationFunction<ViewProps> = ({ view }) => views[view];
