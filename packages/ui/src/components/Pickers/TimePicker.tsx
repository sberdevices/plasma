import React from 'react';
import styled from 'styled-components';
import { accent } from '@sberdevices/plasma-tokens';

import { PickOptional } from '../../types';

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

    const intervals = React.useMemo(
        () => [
            [min.getHours(), max.getHours()],
            [min.getMinutes(), max.getMinutes()],
            [min.getSeconds(), max.getSeconds()],
        ],
        [min, max],
    );

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const onHoursChange = React.useCallback(({ value: h }) => setState(([_, m, s]) => [h, m, s]), []);
    const onMinutesChange = React.useCallback(({ value: m }) => setState(([h, _, s]) => [h, m, s]), []);
    const onSecondsChange = React.useCallback(({ value: s }) => setState(([h, m, _]) => [h, m, s]), []);
    /* eslint-enable @typescript-eslint/no-unused-vars */

    React.useLayoutEffect(() => {
        const [h, m, s] = getValues(value);
        if (h !== hours || m !== minutes || s !== seconds) {
            const newValue = new Date(value);
            newValue.setHours(hours);
            newValue.setMinutes(minutes);
            newValue.setSeconds(seconds);

            onChange?.(newValue);
        }
    }, [hours, minutes, seconds]);

    if (
        hours < intervals[0][0] ||
        hours > intervals[0][1] ||
        minutes < intervals[1][0] ||
        minutes > intervals[1][1] ||
        seconds < intervals[2][0] ||
        seconds > intervals[2][1]
    ) {
        return null;
    }

    return (
        <StyledWrapper>
            {options.hours && (
                <SimpleTimePicker from={intervals[0][0]} to={intervals[0][1]} value={hours} onChange={onHoursChange} />
            )}
            {options.hours && options.minutes && <StyledDividers />}
            {options.minutes && (
                <SimpleTimePicker
                    from={intervals[1][0]}
                    to={intervals[1][1]}
                    value={minutes}
                    onChange={onMinutesChange}
                />
            )}
            {options.minutes && options.seconds && <StyledDividers />}
            {options.seconds && (
                <SimpleTimePicker
                    from={intervals[2][0]}
                    to={intervals[2][1]}
                    value={seconds}
                    onChange={onSecondsChange}
                />
            )}
        </StyledWrapper>
    );
};
