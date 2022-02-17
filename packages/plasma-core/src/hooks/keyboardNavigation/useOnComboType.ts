import { useCallback } from 'react';

import { getIndexByLetter } from './helpers';
import { useSearchString } from './useSearchString';
import { Item } from './useKeyboardNavigation';

export const useOnComboType = ({
    updateOpen,
    items,
    activeIndex,
    setActiveIndex,
}: {
    updateOpen: (open: boolean) => void;
    items: Item[];
    activeIndex: number;
    setActiveIndex: (activeIndex: number) => void;
}) => {
    const { getSearchString, resetSearchString } = useSearchString();

    return useCallback(
        (letter: string) => {
            // Открываем дропдаун если закрыт
            updateOpen(true);

            // Находим индекс первого подходящего айтема
            const updatedSearchString = getSearchString(letter);
            const searchIndex = getIndexByLetter(
                items.map((item) => item.label),
                updatedSearchString,
                activeIndex + 1,
            );

            // Если есть подходящая опция - переходим к ней
            if (searchIndex >= 0) {
                setActiveIndex(searchIndex);
            } else {
                resetSearchString();
            }
        },
        [updateOpen, getSearchString, items, activeIndex, setActiveIndex, resetSearchString],
    );
};
