import React from 'react';
import styled from 'styled-components';
import { accent } from '@sberdevices/plasma-tokens';
import type { PickOptional } from '@sberdevices/plasma-core/types';

import { SimpleTimePicker } from './SimpleTimePicker';
import type { PickerProps } from './Picker';

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

const getValues = (date: Date) => [date.getHours(), date.getMinutes(), date.getSeconds()];
const defaultOptions = {
    hours: true,
    minutes: true,
    seconds: true,
};

export interface TimePickerProps extends PickOptional<PickerProps, 'focused' | 'disabled' | 'controls'> {
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
}

/**
 * Компонент для выбора времени.
 */
export const TimePicker: React.FC<TimePickerProps> = ({ options = defaultOptions, value, min, max, onChange }) => {
    const [[hours, minutes, seconds], setState] = React.useState(getValues(value));

    // Диапозоны для списков зависят от min и max,
    // при чем min и max принимаются как возможные предельные значения,
    // а не как контейнеры для компонент hours, minutes, seconds
    const [[fromHours, toHours], [fromMins, toMins], [fromSecs, toSecs]] = React.useMemo(() => {
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

        return [
            [minHours, maxHours],
            [minMins, maxMins],
            [minSecs, maxSecs],
        ];
    }, [min, max, hours, minutes]);

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
    if (hours < fromHours) {
        // Часов меньше минимума
        setState([fromHours, fromMins, fromSecs]);
    } else if (hours > toHours) {
        // Часов больше максимума
        setState([toHours, toMins, toSecs]);
    } else if (minutes < fromMins) {
        // Минут меньше минимума
        setState(([h]) => [h, fromMins, fromSecs]);
    } else if (minutes > toMins) {
        // Минут больше максимума
        setState(([h]) => [h, toMins, toSecs]);
    } else if (seconds < fromSecs) {
        // Секунд меньше минимума
        setState(([h, m]) => [h, m, fromSecs]);
    } else if (seconds > toSecs) {
        // Секунд больше максимума
        setState(([h, m]) => [h, m, toSecs]);
    }

    return (
        <StyledWrapper>
            {options.hours && <SimpleTimePicker from={fromHours} to={toHours} value={hours} onChange={onHoursChange} />}
            {options.hours && options.minutes && <StyledDividers />}
            {options.minutes && (
                <SimpleTimePicker from={fromMins} to={toMins} value={minutes} onChange={onMinutesChange} />
            )}
            {options.minutes && options.seconds && <StyledDividers />}
            {options.seconds && (
                <SimpleTimePicker from={fromSecs} to={toSecs} value={seconds} onChange={onSecondsChange} />
            )}
        </StyledWrapper>
    );
};
