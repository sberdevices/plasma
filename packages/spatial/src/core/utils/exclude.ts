function exclude<T>(itemList: T[], excludedListOrItem: T): T[];

function exclude<T>(itemList: T[], excludedListOrItem: T[]): T[];

function exclude<T>(itemList: T[], excludedListOrItem: T | T[]): T[] {
    let toExclude: T[] = [];

    if (!Array.isArray(excludedListOrItem)) {
        toExclude = [excludedListOrItem];
    } else if (Array.isArray(excludedListOrItem)) {
        toExclude = excludedListOrItem;
    }

    for (const item of toExclude) {
        const indexOfElementToExclude = itemList.indexOf(item);

        if (indexOfElementToExclude >= 0) {
            itemList.splice(indexOfElementToExclude, 1);
        }
    }

    return itemList;
}

export { exclude };
