import { useCallback } from 'react';

import { DropdownItem } from '../Dropdown.types';

import { getIndexByLetter } from './utils';
import { useSearchString } from './useSearchString';

export const useOnComboType = ({ items, index }: { items: DropdownItem[]; index: number }) => {
    const { getSearchString, resetSearchString } = useSearchString();

    return useCallback(
        (letter: string) => {
            // Находим индекс первого подходящего айтема
            const updatedSearchString = getSearchString(letter);
            const searchIndex = getIndexByLetter(
                items.map((item) => item.label),
                updatedSearchString,
                index + 1,
            );

            // Если есть подходящая опция - переходим к ней
            if (searchIndex >= 0) {
                return searchIndex;
            }

            resetSearchString();

            return undefined;
        },
        [items, index, getSearchString, resetSearchString],
    );
};
