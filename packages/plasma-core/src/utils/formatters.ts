export const last = <T>(array: Array<T>): T => array[array.length - 1];

export const padZeroNumber = (value: number) => `${value}`.padStart(2, '0');

/**
 * Форматирование названия месяца.
 * Если не передавать `day`, то название месяца будет, например, `июнь`.
 * В данном случае вернется `июня`.
 * Так же результат выполнения метода `formatToParts` является массивом,
 * в котором находятся части даты, форматированной на основнии `options`.
 * То есть в данном случае вернется массив [`day`, `separator`, `month`]
 */
export const monthName = (val: number, monthFormat: Intl.DateTimeFormatOptions['month']): string => {
    const targetMonth = new Date(2000, val, 1);
    return last(new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: monthFormat }).formatToParts(targetMonth))
        .value;
};

export const monthLongName = (val: number): string => monthName(val, 'long');

export const monthShortName = (val: number): string => monthName(val, 'short').replace('.', '');
