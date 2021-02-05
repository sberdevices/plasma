function exclude<T>(itemList: T[], excludedListOrItem: T): T[];

function exclude<T>(itemList: T[], excludedListOrItem: T[]): T[];

function exclude<T>(itemList: T[], excludedListOrItem: T | T[]): T[] {
    let toExclude: T[] = [];
    if (!Array.isArray(excludedListOrItem)) {
        toExclude = [excludedListOrItem];
    } else if (Array.isArray(excludedListOrItem)) {
        toExclude = excludedListOrItem;
    }

    for (let i = 0; i < toExclude.length; i += 1) {
        const indexOfElementToExclude = itemList.indexOf(toExclude[i]);
        if (indexOfElementToExclude >= 0) {
            itemList.splice(indexOfElementToExclude, 1);
        }
    }
    return itemList;
}

export { exclude };

export default exclude;
