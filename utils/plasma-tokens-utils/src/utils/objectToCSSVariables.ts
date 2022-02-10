import type { DataObject } from '../types';

import { escapeValue, join, getCSSVariableName } from './other';

/**
 * Преобразовать объект токенов в плоский объект,
 * где ключом выступает название CSS переменной, значением - значение переменной.
 * @param {string} prefix
 * @param {object} obj
 * @return {object}
 */
export const objectToCSSVariables = (obj: DataObject, prefix = '') => {
    let vars: Record<string, string | number> = {};

    for (const key in obj) {
        if (key !== 'modes' && key !== 'comment') {
            const name = join(prefix, key);
            const value = obj[key];

            if (value && typeof value === 'object') {
                vars = {
                    ...vars,
                    ...objectToCSSVariables(value, name),
                };
            } else {
                vars[getCSSVariableName(name)] = escapeValue(value);
            }
        }
    }
    return vars;
};
