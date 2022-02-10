import type { TokenDataGroup, GeneratedFiles } from '../types';
import { generateTokens } from '../generation';

/**
 * Генерация тем на основе объекта.
 * @param {Record<string, TokenDataGroup<string>>} colorThemes Объект с темами
 * @return {GeneratedFiles}
 */
export const generateColorThemeValues = (colorThemes: Record<string, TokenDataGroup<string>>) => {
    const out: GeneratedFiles = [];

    for (const [name, theme] of Object.entries(colorThemes)) {
        out.push({ file: `${name}.ts`, content: generateTokens(theme) });
    }

    return out;
};
