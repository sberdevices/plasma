import React from 'react';

const noop = () => {
    /* noop */
};

export interface UIContextProps {
    currencyFormat(val: number, currency?: string): string;
    lang: string;
    setLang(val: string): void;
}

const defaultUIContext: UIContextProps = {
    currencyFormat: () => '',
    lang: '',
    setLang: noop,
};

export function useUIContext(): UIContextProps {
    const [lang, setLang] = React.useState('RU-ru');

    const currencyFormat = React.useCallback(
        (val: number, currency = 'RUB') => {
            const formatter = new Intl.NumberFormat(lang, {
                style: 'currency',
                currency,
                minimumFractionDigits: 0,
            });

            return formatter.format(val);
        },
        [lang],
    );

    return {
        currencyFormat,
        lang,
        setLang,
    };
}

export const UIContext = React.createContext<UIContextProps>(defaultUIContext);

export default UIContext;
