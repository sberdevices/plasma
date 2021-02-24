const uppercaseCheck = /([A-Z])/;
const uppercasePattern = /([A-Z])/g;
const prefixAndLowerCase = (char: string): string => `-${char.toLowerCase()}`;
const hyphenate = (str: string) => (uppercaseCheck.test(str) ? str.replace(uppercasePattern, prefixAndLowerCase) : str);

/**
 * Транформирует объект стилей,
 * оставляя значения как есть (например, не добавляя "px" к числам),
 * а ключи переводя в kebab-case.
 * Подходит для подготовки типографической темы.
 */
export const transformStyles = (styles: object) =>
    Object.entries(styles)
        .map(([key, value]) => `${hyphenate(key)}: ${value}`)
        .join(';');
