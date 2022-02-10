import { DESIGN_SYSTEM_PREFIX } from '../constants';

/**
 * В строковых значениях токенов встречаются нежелательные символы,
 * их нужно очищать перед размещением в CSS Var или JSON.
 * @param {string|number} value
 * @return {string|number}
 */
export const escapeValue = <T = string | number>(value: T) => {
    if (typeof value === 'string') {
        return value.replace(/\s+/g, ' ');
    }
    return value;
};

export const join = (...args: (string | undefined)[]) => args.filter(Boolean).join('-');

export const getCSSVariableName = (key: string) => `--${DESIGN_SYSTEM_PREFIX}-${key}`;
