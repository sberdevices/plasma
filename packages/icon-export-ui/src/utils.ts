export const compose = <R>(...fns: Array<(a: R) => R>) => (x: R) => fns.reduce((v, f) => f(v), x);

export const removeLineBreak = (source: string) => source.replace(/\n/g, '');

export const capitalizeFirstLetter = (source: string) => source[0].toLocaleLowerCase() + source.slice(1);

export const insertString = (source: string, index: number, add: string) =>
    source.substring(0, index) + add + source.substring(index, source.length);

export const camelize = (source: string) => source.replace(/-./g, (x) => x[1].toUpperCase());
