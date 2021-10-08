import React, { FC, createContext } from 'react';

export const SSRContext = createContext<{ uniqId: number | null }>({
    uniqId: null,
});

/**
 * Провайдер обязателен для использования, необходимо обернуть в него все приложение.
 *
 * Используется для корректного озвучивания скринридерами Radiobox и Checkbox компонент.
 */
export const SSRProvider: FC = ({ children }) => {
    const value = {
        uniqId: 0,
    };

    return <SSRContext.Provider value={value}>{children}</SSRContext.Provider>;
};
