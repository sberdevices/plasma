import React from 'react';
import styled from 'styled-components';
import { accent } from '@sberdevices/plasma-tokens';

import { SimpleTimePicker, SimpleTimePickerProps } from './SimpleTimePicker';

const StyledWrapper = styled.div`
    display: flex;
    width: max-content;
    align-items: stretch;
`;

const StyledDividers = styled.div`
    position: relative;
    margin-left: 0.375rem;
    margin-right: 0.375rem;
    width: 0.25rem;

    /* stylelint-disable-next-line selector-nested-pattern */
    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 0.25rem;
        height: 0.25rem;
        background-color: ${accent};
        border-radius: 50%;
    }

    &::before {
        margin-top: -0.625rem;
    }

    &::after {
        margin-top: 0.375rem;
    }
`;

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
 * Вернет массив с временными компонентами переданной даты.
 */
const getValues = (date: Date) => [date.getHours(), date.getMinutes(), date.getSeconds()];
const defaultOptions = {
    hours: true,
    minutes: true,
    seconds: true,
};

export interface TimePickerProps extends Omit<SimpleTimePickerProps, 'range' | 'onChange'> {
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
}

/**
 * Компонент для выбора времени.
 */
export const TimePicker: React.FC<TimePickerProps> = ({
    options = defaultOptions,
    step,
    size,
    value,
    min,
    max,
    disabled,
    controls,
    autofocus,
    onChange,
    ...rest
}) => {
    const [[hours, minutes, seconds], setState] = React.useState(getValues(value));

    // Диапозоны для списков зависят от min и max,
    // при чем min и max принимаются как возможные предельные значения,
    // а не как контейнеры для компонент hours, minutes, seconds
    const [hoursRange, minsRange, secsRange] = React.useMemo(() => {
        const minHours = min.getHours();
        const maxHours = max.getHours();
        let minMins = 0;
        let maxMins = 59;
        let minSecs = 0;
        let maxSecs = 59;

        if (hours === minHours) {
            minMins = min.getMinutes();
        }

        if (minutes === min.getMinutes()) {
            minSecs = min.getSeconds();
        }

        if (hours === maxHours) {
            maxMins = max.getMinutes();
        }

        if (minutes === max.getMinutes()) {
            maxSecs = max.getSeconds();
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
    }, [min, max, hours, minutes, step]);

    const onHoursChange = React.useCallback(({ value: h }) => setState(([, m, s]) => [h, m, s]), []);
    const onMinutesChange = React.useCallback(({ value: m }) => setState(([h, , s]) => [h, m, s]), []);
    const onSecondsChange = React.useCallback(({ value: s }) => setState(([h, m]) => [h, m, s]), []);

    // При очередном прогоне, если значения hours, minutes, seconds изменились,
    // необходимо вызвать событие изменения, создав новый экземпляр Date
    React.useLayoutEffect(() => {
        const [oldHours, oldMinutes, oldSeconds] = getValues(value);

        if (oldHours !== hours || oldMinutes !== minutes || oldSeconds !== seconds) {
            const newValue = new Date(value);
            newValue.setHours(hours);
            newValue.setMinutes(minutes);
            newValue.setSeconds(seconds);

            onChange?.(newValue);
        }
    }, [hours, minutes, seconds]);

    // Для того, чтобы значение не выпадало из диапозона,
    // надо выставить в соответствии с последним
    if (hoursRange.indexOf(hours) === -1 || minsRange.indexOf(minutes) === -1 || secsRange.indexOf(seconds) === -1) {
        const newHours = hoursRange.indexOf(hours) === -1 ? getClosestValue(hoursRange, hours) : hours;
        const newMins = minsRange.indexOf(minutes) === -1 ? getClosestValue(minsRange, minutes) : minutes;
        const newSecs = secsRange.indexOf(seconds) === -1 ? getClosestValue(secsRange, seconds) : seconds;

        // eslint-disable-next-line no-restricted-globals
        if (isNaN(newHours) || isNaN(newMins) || isNaN(newSecs)) {
            throw new Error(`Passed value ${value} is out of range`);
        }
        if (newHours !== hours || newMins !== minutes || newSecs !== seconds) {
            setState([newHours, newMins, newSecs]);
        }
    }

    return (
        <StyledWrapper {...rest}>
            {options.hours && (
                <SimpleTimePicker
                    autofocus={autofocus}
                    disabled={disabled}
                    controls={controls}
                    size={size}
                    range={hoursRange}
                    value={hours}
                    onChange={onHoursChange}
                />
            )}
            {options.hours && options.minutes && <StyledDividers />}
            {options.minutes && (
                <SimpleTimePicker
                    autofocus={autofocus && !options.hours}
                    disabled={disabled}
                    controls={controls}
                    size={size}
                    range={minsRange}
                    value={minutes}
                    onChange={onMinutesChange}
                />
            )}
            {options.minutes && options.seconds && <StyledDividers />}
            {options.seconds && (
                <SimpleTimePicker
                    autofocus={autofocus && !options.hours && !options.minutes}
                    disabled={disabled}
                    controls={controls}
                    size={size}
                    range={secsRange}
                    value={seconds}
                    onChange={onSecondsChange}
                />
            )}
        </StyledWrapper>
    );
};
