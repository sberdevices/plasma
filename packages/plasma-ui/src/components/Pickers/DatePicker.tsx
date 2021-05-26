import React from 'react';
import styled from 'styled-components';

import { SimpleDatePicker, SimpleDatePickerProps } from './SimpleDatePicker';

const maxDayInMonth = (month: number, year: number): number => new Date(year, month + 1, 0).getDate();
const getValues = (date: Date) => [date.getFullYear(), date.getMonth(), date.getDate()];
const defaultOptions = {
    years: true,
    months: true,
    days: true,
    shortMonthName: false,
};

const StyledWrapper = styled.div`
    display: flex;
    width: max-content;
`;

export interface DatePickerProps extends Omit<SimpleDatePickerProps, 'type' | 'from' | 'to' | 'onChange'> {
    /**
     * Обработчик изменения
     */
    onChange?: (value: Date) => void;
    /**
     * Значение контрола
     */
    value: Date;
    /**
     * Максимальное значение даты
     */
    max: Date;
    /**
     * Минимальное значение даты
     */
    min: Date;
    /**
     * Формат выводимого значения
     */
    options?: Partial<typeof defaultOptions>;
}

/**
 * Компонент для выбора даты.
 */
export const DatePicker: React.FC<DatePickerProps> = ({
    options = defaultOptions,
    size,
    value,
    max,
    min,
    disabled,
    controls,
    autofocus,
    visibleItems,
    onChange,
}) => {
    const [[year, month, day], setState] = React.useState(getValues(value));
    const yearsInterval = React.useMemo(() => [min.getFullYear(), max.getFullYear()], [min, max]);

    const monthsInterval = React.useMemo(() => {
        if (yearsInterval[0] >= value.getFullYear()) {
            return [min.getMonth(), 11];
        }

        if (yearsInterval[1] <= value.getFullYear()) {
            return [0, max.getMonth()];
        }

        return [0, 11];
    }, [max, min, value, yearsInterval]);

    const daysInterval = React.useMemo(() => {
        const valueYear = value.getFullYear();
        const valueMonth = value.getMonth();

        if (valueYear >= yearsInterval[1] && max.getMonth() === valueMonth) {
            return [1, max.getDate()];
        }

        const maxDay = maxDayInMonth(valueMonth, valueYear);

        if (valueYear <= yearsInterval[0] && min.getMonth() === valueMonth) {
            return [min.getDate(), maxDay];
        }

        return [1, maxDay];
    }, [min, yearsInterval, value, max]);

    const getNextMonth = React.useCallback(
        (nextMonth: number, nextYear: number): number => {
            if (nextYear >= yearsInterval[1] && nextMonth >= max.getMonth()) {
                return max.getMonth();
            }

            if (nextYear <= yearsInterval[0] && nextMonth <= max.getMonth()) {
                return min.getMonth();
            }

            return nextMonth;
        },
        [max, min, yearsInterval],
    );

    const getNextDay = React.useCallback(
        (nextDay: number, nextMonth: number, nextYear: number): number => {
            if (nextYear >= yearsInterval[1] && nextMonth >= max.getMonth() && nextDay >= max.getDate()) {
                return max.getDate();
            }

            if (nextYear <= yearsInterval[0] && nextMonth <= max.getMonth() && nextDay <= min.getDate()) {
                return min.getDate();
            }

            const possibleMaxDayInMonth = maxDayInMonth(nextMonth, nextYear);

            if (possibleMaxDayInMonth < nextDay) {
                return possibleMaxDayInMonth;
            }

            return nextDay;
        },
        [yearsInterval, max, min],
    );

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const onYearChange = React.useCallback(
        ({ value: y }) => {
            setState(([_, m, d]) => {
                const nextMonth = getNextMonth(m, y);
                const nextDay = getNextDay(d, nextMonth, y);

                return [y, nextMonth, nextDay];
            });
        },
        [getNextDay, getNextMonth],
    );
    const onMonthChange = React.useCallback(
        ({ value: m }) => {
            setState(([y, _, d]) => {
                const nextDay = getNextDay(d, m, y);

                return [y, m, nextDay];
            });
        },
        [getNextDay],
    );
    const onDayChange = React.useCallback(({ value: d }) => setState(([y, m]) => [y, m, d]), []);
    /* eslint-enable @typescript-eslint/no-unused-vars */

    /**
     * При очередном прогоне, если значения year, month, day изменились,
     * необходимо вызвать событие изменения, создав новый экземпляр Date
     */
    React.useLayoutEffect(() => {
        const [oldYear, oldMonth, oldDay] = getValues(value);
        const isChanged = oldYear !== year || oldMonth !== month || oldDay !== day;
        if (onChange && isChanged) {
            onChange(new Date(year, month, day));
        }
    }, [year, month, day]);

    const getOption = (key: keyof typeof defaultOptions) => (key in options ? options[key] : defaultOptions[key]);

    const daysOption = getOption('days');
    const monthsOption = getOption('months');
    const yearsOption = getOption('years');
    const shortMonthNameOption = getOption('shortMonthName');
    const monthNameFormat = shortMonthNameOption ? 'short' : 'long';
    return (
        <StyledWrapper>
            {daysOption && (
                <SimpleDatePicker
                    autofocus={autofocus}
                    size={size}
                    type="day"
                    value={day}
                    from={daysInterval[0]}
                    to={daysInterval[1]}
                    disabled={disabled}
                    controls={controls}
                    visibleItems={visibleItems}
                    onChange={onDayChange}
                />
            )}
            {monthsOption && (
                <SimpleDatePicker
                    autofocus={autofocus && !options.days}
                    size={size}
                    type="month"
                    monthNameFormat={monthNameFormat}
                    value={month}
                    from={monthsInterval[0]}
                    to={monthsInterval[1]}
                    disabled={disabled}
                    controls={controls}
                    visibleItems={visibleItems}
                    onChange={onMonthChange}
                />
            )}
            {yearsOption && (
                <SimpleDatePicker
                    autofocus={autofocus && !options.days && !options.months}
                    size={size}
                    type="year"
                    value={year}
                    from={yearsInterval[0]}
                    to={yearsInterval[1]}
                    disabled={disabled}
                    controls={controls}
                    visibleItems={visibleItems}
                    onChange={onYearChange}
                />
            )}
        </StyledWrapper>
    );
};
