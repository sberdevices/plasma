import type { DropdownNode } from '../Dropdown.types';

export enum Actions {
    Close,
    CloseSelect,
    First,
    Last,
    Next,
    Open,
    PageDown,
    PageUp,
    Previous,
    Select,
    Type,
    OpenSub,
    CloseSub,
}

export enum Keys {
    Home = 'Home',
    ArrowUp = 'ArrowUp',
    ArrowDown = 'ArrowDown',
    ArrowLeft = 'ArrowLeft',
    ArrowRight = 'ArrowRight',
    Enter = 'Enter',
    Space = ' ',
    End = 'End',
    Backspace = 'Backspace',
    Clear = 'Clear',
    PageUp = 'PageUp',
    PageDown = 'PageDown',
    Escape = 'Escape',
}

/**
 * Возвращает экшн в соответствии с нажатой клавишей.
 */
export const getActionFromKey = (event: KeyboardEvent, isOpen?: boolean) => {
    const { altKey, ctrlKey, metaKey } = event;

    // Все кнопки, которые открывают селект
    const key = event.key as Keys;
    const openKeys = [Keys.ArrowUp, Keys.ArrowDown, Keys.Enter, Keys.Space];

    // Обработка открытия когда селект закрыт
    if (!isOpen && openKeys.includes(key)) {
        return Actions.Open;
    }

    // Кнопки Home и End должны перемещать всегда(открыт или закрыт)
    if (key === Keys.Home) {
        return Actions.First;
    }
    if (key === Keys.End) {
        return Actions.Last;
    }

    // Обработка ввода на клавиатуре при открытом и закрытом селекте
    if (
        key === Keys.Backspace ||
        key === Keys.Clear ||
        (key.length === 1 && key !== Keys.Space && !altKey && !ctrlKey && !metaKey)
    ) {
        return Actions.Type;
    }

    // Обработка когда селект открыт
    if (isOpen) {
        if (key === Keys.ArrowUp && altKey) {
            return Actions.CloseSelect;
        }
        if (key === Keys.ArrowDown && !altKey) {
            return Actions.Next;
        }
        if (key === Keys.ArrowUp) {
            return Actions.Previous;
        }
        if (key === Keys.ArrowRight) {
            return Actions.OpenSub;
        }
        if (key === Keys.ArrowLeft) {
            return Actions.CloseSub;
        }
        if (key === Keys.PageUp) {
            return Actions.PageUp;
        }
        if (key === Keys.PageDown) {
            return Actions.PageDown;
        }
        if (key === Keys.Escape) {
            return Actions.Close;
        }
        if (key === Keys.Enter || key === Keys.Space) {
            return Actions.Select;
        }
    }
    return null;
};

export const getUpdatedIndex = (action: Actions, index: number, items: DropdownNode[]) => {
    const pageSize = 10; // Используется для pageup/pagedown
    const maxIndex = items.length - 1;
    let newIndex;

    switch (action) {
        case Actions.First:
            newIndex = 0;
            break;
        case Actions.Last:
            newIndex = maxIndex;
            break;
        case Actions.Previous:
            newIndex = index - 1 >= 0 ? index - 1 : maxIndex;
            break;
        case Actions.Next:
            newIndex = index + 1 <= maxIndex ? index + 1 : 0;
            break;
        case Actions.PageUp:
            newIndex = Math.max(0, index - pageSize);
            break;
        case Actions.PageDown:
            newIndex = Math.min(maxIndex, index + pageSize);
            break;
        default:
            newIndex = index;
    }

    let item = items[newIndex];

    while (item.isDisabled) {
        if (action !== Actions.Previous) {
            newIndex = items.length - 1 === newIndex + 1 ? 0 : newIndex + 1;
        } else {
            newIndex = newIndex - 1 === -1 ? items.length - 1 : newIndex - 1;
        }
        item = items[newIndex];
    }

    return newIndex;
};

// Фильтрует массив по входной строке
// Возвращает массив параметров, которые начинаются со строки filter, независимо от регистра
export const filterOptions = (options: string[] = [], filter: string, exclude: string[] = []) => {
    const lowerCaseFilter = filter.toLowerCase();
    return options.filter((option) => {
        const matches = option.toLowerCase().indexOf(lowerCaseFilter) === 0;
        return matches && exclude.indexOf(option) < 0;
    });
};

// Возвращает индекс параметра из массива параметров на основе строки поиска
// Если filter - это несколько итераций одной и той же буквы (например, "aaa"), то ищем только по одной букве
export const getIndexByLetter = (options: string[], filter: string, startIndex = 0) => {
    const orderedOptions = [...options.slice(startIndex), ...options.slice(0, startIndex)];
    const firstMatch = filterOptions(orderedOptions, filter)[0];
    const allSameLetter = (array: string[]) => array.every((letter) => letter === array[0]);

    // Сначала проверяем, есть ли точное совпадение для введенной строки
    if (firstMatch) {
        return options.indexOf(firstMatch);
    }

    // Если повторяется одна и та же буква, то ищем только по одной букве
    if (allSameLetter(filter.split(''))) {
        const matches = filterOptions(orderedOptions, filter[0]);
        return options.indexOf(matches[0]);
    }

    // Если нет совпадений, возвращаем -1

    return -1;
};
