import { associatedDocs } from './packages';
import { compose } from './utils';

const ccRegExp = /(\w+)(\(.*\))?:\s?(.+)/;

type ParsedCommit = {
    type: string;
    names?: string[];
    message: string;
};

type DocCommit = {
    type: string;
    names: string[];
    message: string;
};

/**
 * Распарсит коммиты на составные части.
 */
const parseCommits = (commits: string[]) =>
    commits
        .map((commit: string): ParsedCommit | null => {
            const match = commit.match(ccRegExp);

            if (!match) {
                return null;
            }

            const [, type, names, message] = match;
            return { type, names: names ? names.replace(/\(|\)|\s/g, '').split(',') : undefined, message };
        })
        .filter((info) => info);

/**
 * Отфильтрует коммиты по следующим признакам:
 * - по наличию ключа "docs(package)", с пакетом (-ами) в круглых скобках;
 * - по наличию ключевого слова "[docs]", (в квадратных скобках);
 */
const filterCommits = (commits: ParsedCommit[]) =>
    commits.filter(({ type, names, message }) => {
        if (!names || !names.length) {
            return false;
        }
        if (type === 'docs') {
            return true;
        }
        if ((type === 'feat' || type === 'fix') && message.match(/\[docs\]/)) {
            return true;
        }
        return false;
    });

/**
 * Вытащит из коммитов список пакетов.
 */
const extractPackages = (commits: DocCommit[]) => commits.reduce<string[]>((acc, { names }) => [...acc, ...names], []);

/**
 * Сопоставит библиотечные пакеты с доками.
 */
const mapToAssociated = (names: string[]) => names.map((name) => associatedDocs[name]);

/**
 * Удаление дубликатов.
 */
const unique = (names: string[]) => Array.from(new Set(names));

/**
 * Удаление выпавших пакетов (тех, у которых нет приложений документации)
 */
const filterPackages = (names: (string | undefined)[]) => names.filter((name) => name);

/**
 * Из лога коммитов вытащит названия пакетов, для которых нужно выпустить версии документации.
 */
export const getDocPackages = compose<string[]>(
    filterPackages,
    unique,
    mapToAssociated,
    extractPackages,
    filterCommits,
    parseCommits,
);
