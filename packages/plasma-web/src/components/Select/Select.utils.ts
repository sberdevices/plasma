import { DropdownNodeType } from '../Dropdown';

/**
 * Пройдется по списку рекурсивно, вернув новый список с подсписками, поднятыми на верхний уровень.
 */
export const flattenItemsRecursive = (list: DropdownNodeType[]) =>
    list.reduce<DropdownNodeType[]>((acc, { items, ...rest }) => {
        acc.push(rest);

        if (items) {
            acc.push(...flattenItemsRecursive(items));
        }

        return acc;
    }, []);

/**
 * Пройдется по списку рекурсивно, вернув новый список с новыми объектами с флагом `isActive`.
 */
export const setActiveRecursive = (list: DropdownNodeType[], isActive: (item: DropdownNodeType) => boolean) =>
    list.map((item) => {
        const newItem = { ...item, isActive: isActive(item) };

        if (item.items) {
            newItem.items = setActiveRecursive(item.items, isActive);
        }

        return newItem;
    });
