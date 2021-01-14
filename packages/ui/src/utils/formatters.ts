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
export const monthLongName = (val: number): string =>
    last(new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).formatToParts(new Date().setMonth(val)))
        .value;
