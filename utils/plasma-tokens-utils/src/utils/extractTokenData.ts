import type { TokenDataGroup } from '../types';

/**
 * Вытащит `value` токенов, заменив ими токены в объекте.
 */
export const extractTokenData = <T extends string>(theme: TokenDataGroup<T>) => {
    return Object.entries(theme).reduce((acc, [key, token]) => {
        acc[key] = token.value;
        return acc;
    }, {} as Record<string, string>);
};
