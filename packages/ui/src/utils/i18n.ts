let globalLocale = 'ru-RU';

export function setLocale(locale: string) {
    globalLocale = locale;
}

export function getLocale() {
    return globalLocale;
}

export function formatCurrency(val: number, currency = 'RUB') {
    const formatter = new Intl.NumberFormat(globalLocale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
    });

    return formatter.format(val);
}
