import { InterpolationFunction } from 'styled-components';

import {
    accent,
    white,
    text,
    buttonAccent,
    buttonSecondary,
    buttonSuccess,
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
    accent: {
        backgroundColor: accent,
        color: white,
    },
    primary: {
        backgroundColor: buttonAccent,
        color: white,
    },
    secondary: {
        backgroundColor: buttonSecondary,
        color: text,
    },
    success: {
        backgroundColor: buttonSuccess,
        color: white,
    },
    warning: {
        backgroundColor: buttonWarning,
        color: white,
    },
    critical: {
        backgroundColor: buttonCritical,
        color: white,
    },
    checked: {
        backgroundColor: buttonChecked,
        /**
         * FixMe: Заменить на соответствующий цвет при исправлении токенов дизайнерами
         */
        color: background,
    },
    clear: {
        backgroundColor: transparent,
        color: text,
    },
    overlay: {
        backgroundColor: blackSecondary,
        color: white,
    },
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
