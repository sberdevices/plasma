import { CSSProperties, CSSRootTheme } from '../types';

/**
 * Обернуть переменные CSS в объект с корневыми переменными.
 */
export const attachToRoot = (cssVariables: CSSProperties): CSSRootTheme => {
    return {
        ':root': cssVariables,
    };
};
