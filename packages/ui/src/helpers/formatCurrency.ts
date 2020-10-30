export const formatCurrency = (value: number, currency: string | undefined): string => {
    const formatter = new Intl.NumberFormat('ru', {
        style: 'currency',
        currency: currency || 'rub',
        minimumFractionDigits: 0,
    });

    return formatter.format(value);
};
