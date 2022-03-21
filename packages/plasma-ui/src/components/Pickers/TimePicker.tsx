import React from 'react';
import styled from 'styled-components';
import { useIsomorphicLayoutEffect } from '@sberdevices/plasma-core';

import { PickerDots } from './PickerDots';
import { SimpleTimePicker, SimpleTimePickerProps } from './SimpleTimePicker';
import { getNormalizeValues, getTimeValues, isChanged } from './utils';
import type { PickerItem, TimeType, PickerItemValue } from './types';

const StyledWrapper = styled.div`
    display: flex;
    width: max-content;
    align-items: stretch;
`;

const defaultOptions = {
    hours: true,
    minutes: true,
    seconds: true,
};

/**
 * Вернет массив чисел от `from` до `to` с интервалом `step`.
 */
const getRange = (from: number, to: number, step: number) => {
    const range = [];
    for (let i = from; i <= to; i += step) {
        range.push(i);
    }
    return range;
};

/**
 * Сравнит число с массивом чисел и вернет значение массива,
 * максимальное близкое заданному числу.
 */
const getClosestValue = (range: number[], value: number) => {
    if (value === 0) {
        return range[0];
    }
    const weights = range.map((i) => (value <= i ? value / i : i / value));
    return range[weights.indexOf(Math.max(...weights))];
};

/**
 * Вернёт секунды
 */
const getSeconds = ([hours, minutes, seconds]: TimeType) => hours * 60 * 60 + minutes * 60 + seconds;

/**
 * Для того, чтобы значение не выпадало из диапозона,
 * надо выставить в соответствии с последним
 */
const getValuesInRange = (
    [hoursRange, minsRange, secsRange]: number[][],
    [hours, minutes, seconds]: number[],
    value: Date,
) => {
    if (hoursRange.indexOf(hours) === -1 || minsRange.indexOf(minutes) === -1 || secsRange.indexOf(seconds) === -1) {
        const newHours = hoursRange.indexOf(hours) === -1 ? getClosestValue(hoursRange, hours) : hours;
        const newMins = minsRange.indexOf(minutes) === -1 ? getClosestValue(minsRange, minutes) : minutes;
        const newSecs = secsRange.indexOf(seconds) === -1 ? getClosestValue(secsRange, seconds) : seconds;

        // eslint-disable-next-line no-restricted-globals
        if (isNaN(newHours) || isNaN(newMins) || isNaN(newSecs)) {
            throw new Error(`Passed value ${value} is out of range`);
        }

        return [newHours, newMins, newSecs] as const;
    }

    return [hours, minutes, seconds] as const;
};

export interface TimePickerProps extends Omit<SimpleTimePickerProps, 'type' | 'range' | 'onChange'> {
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
    options?: typeof defaultOptions;
    /**
     * Интервалы в секундах.
     * @example:
     * 7200 = интервал в 2 часа
     * 300 = интервал в 5 минут
     * 5 = интервал в 5 секунд
     * 7505 = интервалы 2 часа, 5 минут, 5 секунд
     */
    step?: number;
    /**
     * Сменить WAI-ARIA Label списка дней.
     */
    secondsAriaLabel?: string;
    /**
     * Сменить WAI-ARIA Label списка месяцев.
     */
    minutesAriaLabel?: string;
    /**
     * Сменить WAI-ARIA Label списка годов.
     */
    hoursAriaLabel?: string;
}

/**
 * Компонент для выбора времени.
 */
export const TimePicker: React.FC<TimePickerProps> = ({
    id,
    options = defaultOptions,
    step,
    size,
    value,
    min,
    max,
    disabled,
    controls,
    autofocus,
    scrollSnapType,
    visibleItems,
    onChange,
    name,
    enableNativeControl,
    secondsAriaLabel,
    minutesAriaLabel,
    hoursAriaLabel,
    infiniteScroll = true,
    ...rest
}) => {
    const normalizeValues = React.useMemo(() => getNormalizeValues(getTimeValues, getSeconds)(value, min, max), [
        value,
        min,
        max,
    ]);

    const [[hours, minutes, seconds], setState] = React.useState(normalizeValues);
    const [minHours, minMinutes, minSeconds] = getTimeValues(min);
    const [maxHours, maxMinutes, maxSeconds] = getTimeValues(max);

    // Диапазоны для списков зависят от min и max,
    // при чем min и max принимаются как возможные предельные значения,
    // а не как контейнеры для компонент hours, minutes, seconds
    const [hoursRange, minsRange, secsRange] = React.useMemo(() => {
        let minMins = 0;
        let maxMins = 59;
        let minSecs = 0;
        let maxSecs = 59;

        if (hours === minHours) {
            minMins = minMinutes;
        }

        if (hours === maxHours) {
            maxMins = maxMinutes;
        }

        if (hours === minHours && minutes === minMinutes) {
            minSecs = minSeconds;
        }

        if (hours === maxHours && minutes === maxMinutes) {
            maxSecs = maxSeconds;
        }

        let hoursStep = 1;
        let minsStep = 1;
        let secsStep = 1;

        if (step) {
            const hoursMod = step % 3600;
            const minsMod = hoursMod % 60;
            hoursStep = (step - hoursMod) / 3600 || 1;
            minsStep = (hoursMod - minsMod) / 60 || 1;
            secsStep = minsMod || 1;
        }

        return [
            getRange(minHours, maxHours, hoursStep),
            getRange(minMins, maxMins, minsStep),
            getRange(minSecs, maxSecs, secsStep),
        ];
    }, [minHours, maxHours, minMinutes, maxMinutes, minSeconds, maxSeconds, hours, minutes, step]);

    const onHoursChange = React.useCallback(({ value: h }: PickerItemValue) => setState(([, m, s]) => [h, m, s]), []);
    const onMinutesChange = React.useCallback(({ value: m }: PickerItemValue) => setState(([h, , s]) => [h, m, s]), []);
    const onSecondsChange = React.useCallback(({ value: s }: PickerItemValue) => setState(([h, m]) => [h, m, s]), []);

    // При очередном прогоне, если значения hours, minutes, seconds изменились,
    // необходимо вызвать событие изменения, создав новый экземпляр Date
    useIsomorphicLayoutEffect(() => {
        const oldTime = normalizeValues;

        if (onChange && isChanged(oldTime, [hours, minutes, seconds])) {
            const newValue = new Date(value);
            newValue.setHours(hours);
            newValue.setMinutes(minutes);
            newValue.setSeconds(seconds);

            onChange(newValue);
        }
    }, [hours, minutes, seconds]);

    /**
     * Если значение value обновилось извне, необходимо изменить стейт
     * и вызвать событие изменения, создав новый экземпляр Date
     */
    useIsomorphicLayoutEffect(() => {
        setState((prevTime) => {
            const [newHours, newMins, newSecs] = normalizeValues;

            if (!isChanged(prevTime, [newHours, newMins, newSecs])) {
                return prevTime;
            }

            if (onChange) {
                const newValue = new Date(value);
                newValue.setHours(newHours);
                newValue.setMinutes(newMins);
                newValue.setSeconds(newSecs);

                onChange(newValue);
            }

            return [newHours, newMins, newSecs];
        });
    }, [value, normalizeValues, min, max]);

    const newTime = getValuesInRange([hoursRange, minsRange, secsRange], [hours, minutes, seconds], value);
    if (isChanged([hours, minutes, seconds], newTime)) {
        setState(newTime);
    }

    return (
        <StyledWrapper id={id} {...rest}>
            {options.hours && (
                <SimpleTimePicker
                    id={id}
                    type="hours"
                    autofocus={autofocus}
                    disabled={disabled}
                    controls={controls}
                    visibleItems={visibleItems}
                    size={size}
                    range={hoursRange}
                    value={hours}
                    scrollSnapType={scrollSnapType}
                    infiniteScroll={infiniteScroll}
                    onChange={onHoursChange}
                    aria-label={hoursAriaLabel}
                />
            )}
            {options.hours && options.minutes && <PickerDots $size={size} />}
            {options.minutes && (
                <SimpleTimePicker
                    id={id}
                    type="minutes"
                    autofocus={autofocus && !options.hours}
                    disabled={disabled}
                    controls={controls}
                    visibleItems={visibleItems}
                    size={size}
                    range={minsRange}
                    value={minutes}
                    scrollSnapType={scrollSnapType}
                    infiniteScroll={infiniteScroll}
                    onChange={onMinutesChange}
                    aria-label={minutesAriaLabel}
                />
            )}
            {options.minutes && options.seconds && <PickerDots $size={size} />}
            {options.seconds && (
                <SimpleTimePicker
                    id={id}
                    type="seconds"
                    autofocus={autofocus && !options.hours && !options.minutes}
                    disabled={disabled}
                    controls={controls}
                    visibleItems={visibleItems}
                    size={size}
                    range={secsRange}
                    value={seconds}
                    scrollSnapType={scrollSnapType}
                    infiniteScroll={infiniteScroll}
                    onChange={onSecondsChange}
                    aria-label={secondsAriaLabel}
                />
            )}
            {enableNativeControl && <input type="hidden" value={value.toISOString()} name={name} />}
        </StyledWrapper>
    );
};
