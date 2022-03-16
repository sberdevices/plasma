import { compare as semverCompare } from 'semver';

/**
 * Function composition.
 */
export function compose<R>(...funcs: Function[]) {
    return (initialValue: R) => funcs.reduceRight((result, func) => func(result), initialValue);
}

export const sortVersions = (json: Record<string, string>) => {
    const sortArray = Object.entries(json);

    sortArray.sort((a, b) => semverCompare(b[0], a[0]));

    return sortArray.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};
