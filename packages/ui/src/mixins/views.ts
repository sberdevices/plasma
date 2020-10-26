import { css } from 'styled-components';
import { colors } from '@sberdevices/plasma-tokens';

/**
 * Общие стили оформления кнопок, баджей и т.п.
 */
export const views = {
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
};

export type View = keyof typeof views;
