export enum SelectActions {
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
}

export enum ActionKeys {
    Home = 'Home',
    ArrowDown = 'ArrowDown',
    ArrowUp = 'ArrowUp',
    Enter = 'Enter',
    Space = ' ',
    End = 'End',
    Backspace = 'Backspace',
    Clear = 'Clear',
    PageUp = 'PageUp',
    PageDown = 'PageDown',
    Escape = 'Escape',
}

export const getActionFromKey = (event: KeyboardEvent, menuOpen: boolean) => {
    const { altKey, ctrlKey, metaKey } = event;
    // Все кнопки, которые открывают селект
    const key = event.key as ActionKeys;
    const openKeys = [ActionKeys.ArrowDown, ActionKeys.ArrowUp, ActionKeys.Enter, ActionKeys.Space];
    // Обработка открытия когда селект закрыт
    if (!menuOpen && openKeys.includes(key)) {
        return SelectActions.Open;
    }

    // Кнопки Home и End должны перемещать всегда(открыт или закрыт)
    if (key === ActionKeys.Home) {
        return SelectActions.First;
    }
    if (key === ActionKeys.End) {
        return SelectActions.Last;
    }

    // Обработка ввода на клавиатуре при открытом и закрытом селекте
    if (
        key === ActionKeys.Backspace ||
        key === ActionKeys.Clear ||
        (key.length === 1 && key !== ActionKeys.Space && !altKey && !ctrlKey && !metaKey)
    ) {
        return SelectActions.Type;
    }

    // Обработка когда селект открыт
    if (menuOpen) {
        if (key === ActionKeys.ArrowUp && altKey) {
            return SelectActions.CloseSelect;
        }
        if (key === ActionKeys.ArrowDown && !altKey) {
            return SelectActions.Next;
        }
        if (key === ActionKeys.ArrowUp) {
            return SelectActions.Previous;
        }
        if (key === ActionKeys.PageUp) {
            return SelectActions.PageUp;
        }
        if (key === ActionKeys.PageDown) {
            return SelectActions.PageDown;
        }
        if (key === ActionKeys.Escape) {
            return SelectActions.Close;
        }
        if (key === ActionKeys.Enter || key === ActionKeys.Space) {
            return SelectActions.CloseSelect;
        }
    }
    return null;
};

export const getUpdatedIndex = (currentIndex: number, maxIndex: number, action: number) => {
    const pageSize = 10; // Используется для pageup/pagedown

    switch (action) {
        case SelectActions.First:
            return 0;
        case SelectActions.Last:
            return maxIndex;
        case SelectActions.Previous: {
            if (currentIndex - 1 < 0) {
                return maxIndex;
            }
            return currentIndex - 1;
        }
        case SelectActions.Next: {
            if (currentIndex + 1 === maxIndex + 1) {
                return 0;
            }
            return currentIndex + 1;
        }
        case SelectActions.PageUp:
            return Math.max(0, currentIndex - pageSize);
        case SelectActions.PageDown:
            return Math.min(maxIndex, currentIndex + pageSize);
        default:
            return currentIndex;
    }
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

export const noop = () => {};
