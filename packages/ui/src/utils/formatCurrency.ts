/**
 * Форматирование числа в цену.
 * @param {number} value
 * @param {string} currency
 * @param {number} minimumFractionDigits
 * @return {string}
 */
export const formatCurrency = (value: number, currency: string, minimumFractionDigits: number): string => {
    const formatter = new Intl.NumberFormat('ru', {
        style: 'currency',
        currency,
        minimumFractionDigits,
    });

    return formatter.format(value);
};
