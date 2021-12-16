import fs from 'fs';
import { promisify } from 'util';

import { associatedPackages } from './packages';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const lstat = promisify(fs.lstat);

/**
 * При наличии файла в формате JSON, вернет его содержимое.
 */
const readJson = async <T>(path: string): Promise<T | undefined> => {
    const stats = await lstat(path);

    if (!stats.isFile()) {
        return;
    }

    const rawData = await readFile(path);
    return JSON.parse(rawData.toString());
};

/**
 * Записать JSON с версиями и ссылками на них.
 */
export const writeVersionsJson = async (path: string, version: string, url: string) => {
    const json = (await readJson<Record<string, string>>(path)) || {};

    return writeFile(path, JSON.stringify({ ...json, [version]: url }));
};

/**
 * Найдет пакеты и их версии по ассоциированным с ними сайтами документации.
 */
export const findAssociatedVersions = async (names: string[]) => {
    const result: Record<string, string> = {};

    await Promise.all(
        names.map(async (name) => {
            const pckgName = associatedPackages[name];
            const path = `./packages/${pckgName}/package.json`;
            const pckgJson = await readJson<{ version: string }>(path);

            if (!pckgJson) {
                throw new Error(`package.json not found for chain "${name} - ${pckgName}"`);
            }

            result[pckgName] = pckgJson.version;
        }),
    );

    return result;
};
