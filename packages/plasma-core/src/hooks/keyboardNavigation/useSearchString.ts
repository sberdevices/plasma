import { useCallback, useRef, useState } from 'react';

export const useSearchString = () => {
    const [searchString, setSearchString] = useState('');

    const searchTimeout = useRef<number | null>(null);

    const getSearchString = useCallback(
        (char: string) => {
            // Скидываем таймаут и начинаем новый
            // Это позволяет делать поиск с несколькими буквами, как нативный селект
            if (searchTimeout.current) {
                window.clearTimeout(searchTimeout.current);
            }

            searchTimeout.current = window.setTimeout(() => {
                setSearchString('');
            }, 500);

            // Добавляем последнюю букву в поисковой строке
            setSearchString((prev) => prev + char);
            return searchString + char;
        },
        [searchString],
    );

    const resetSearchString = useCallback(() => {
        if (searchTimeout.current) {
            window.clearTimeout(searchTimeout.current);
        }
        setSearchString('');
    }, []);

    return {
        getSearchString,
        resetSearchString,
    };
};
