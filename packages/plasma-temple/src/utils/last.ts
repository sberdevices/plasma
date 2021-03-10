export const last = <T>(array: T[]): T => array[array.length - 1];

export const replaceLast = <T>(array: T[], lastItem: T): T[] => array.slice(0, -1).concat(lastItem);
