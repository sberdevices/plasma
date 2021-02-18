/**
 * Добавит ед./изм. value + px, если передан number
 */
export const toCssSize = (value: string | number): string => (typeof value === 'number' ? `${value}px` : value);
