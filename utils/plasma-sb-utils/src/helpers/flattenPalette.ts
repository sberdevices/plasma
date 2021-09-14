import type { PlasmaSaturation, PlasmaColor, PlasmaPalette } from '@sberdevices/plasma-colors';

type ColorsRow = Array<[PlasmaSaturation, string]>;
export type ColorsGrid = Array<{ name: string; row: ColorsRow }>;

const flattenRow = (row: PlasmaColor) =>
    Object.entries(row)
        .reduce<ColorsRow>((acc, [sat, hex]) => {
            acc.push([(sat as unknown) as PlasmaSaturation, hex as any]);
            return acc;
        }, [])
        .sort((a, b) => b[0] - a[0]);

/**
 * Преобразует сетку цветов плазмы (plasma-colors)
 * в список для построения таблицы, где строки
 * являются группы цветов, а столбцы - оттенки цвета.
 */
export const flattenPalette = (colors: PlasmaPalette) =>
    Object.entries(colors).reduce<ColorsGrid>((acc, [name, row]) => {
        acc.push({
            name: name[0].toUpperCase() + name.slice(1),
            row: flattenRow(row),
        });
        return acc;
    }, []);
