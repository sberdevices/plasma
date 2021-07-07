import React from 'react';
import styled from 'styled-components';
import { boolean, number, select, text } from '@storybook/addon-knobs';
import type { SnapType } from '@sberdevices/plasma-core';

import { isSberBox } from '../../utils';

import { DatePicker, TimePicker } from '.';

const StyledWrapper = styled.div`
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(2, max-content);
    align-items: center;
`;

const isSberbox = isSberBox();
const snapTypes = ['mandatory', 'proximity'] as SnapType[];

const parseDateTime = (dateTime: string) => {
    const [date, time] = dateTime.split(' ');
    const dated = date.split('.').map(Number);
    const timed = time.split(':').map(Number);

    return new Date(dated[2], dated[1] - 1, dated[0], timed[0], timed[1], timed[2]);
};

export const Default = () => {
    const [value, setValue] = React.useState(parseDateTime(text('value', '01.09.1980 00:28:59')));
    const onChange = React.useCallback((v) => setValue(v), []);
    const min = parseDateTime(text('min', '01.01.1975 00:15:29'));
    const max = parseDateTime(text('max', '31.12.1985 12:45:50'));
    const years = boolean('options.years', true);
    const months = boolean('options.months', true);
    const days = boolean('options.days', true);
    const shortMonthName = boolean('options.shortMonthName', false);
    const hours = boolean('options.hours', true);
    const minutes = boolean('options.minutes', true);
    const seconds = boolean('options.seconds', true);
    const dateOptions = React.useMemo(
        () => ({
            years,
            months,
            days,
            shortMonthName,
        }),
        [years, months, days],
    );
    const timeOptions = React.useMemo(
        () => ({
            hours,
            minutes,
            seconds,
        }),
        [hours, minutes, seconds],
    );
    const disabled = boolean('disabled', false);
    const controls = boolean('controls', isSberbox);
    const autofocus = boolean('autofocus', true);
    const scrollSnapType = select('scrollSnapType', snapTypes, isSberbox ? 'none' : 'mandatory');

    return (
        <StyledWrapper>
            <DatePicker
                id="datepicker"
                value={value}
                min={min}
                max={max}
                size={select('DatePicker size', ['l', 's'], 's')}
                visibleItems={select('DatePicker visibleItems', [3, 5], 3)}
                scrollSnapType={scrollSnapType}
                options={dateOptions}
                disabled={disabled}
                controls={controls}
                autofocus={autofocus}
                onChange={onChange}
            />
            <TimePicker
                id="timepicker"
                value={value}
                min={min}
                max={max}
                step={number('TimePicker step', 1)}
                size={select('TimePicker size', ['l', 's'], 's')}
                visibleItems={select('TimePicker visibleItems', [3, 5], 5)}
                scrollSnapType={scrollSnapType}
                options={timeOptions}
                disabled={disabled}
                controls={controls}
                onChange={onChange}
            />
        </StyledWrapper>
    );
};

// eslint-disable-next-line @typescript-eslint/camelcase
export const Date_Picker = () => {
    const [value, setValue] = React.useState(parseDateTime(text('value', '01.09.1980 00:28:59')));
    const onChange = React.useCallback((v) => setValue(v), []);
    const min = parseDateTime(text('min', '01.01.1975 00:15:29'));
    const max = parseDateTime(text('max', '31.12.1985 12:45:50'));
    const years = boolean('options.years', true);
    const months = boolean('options.months', true);
    const days = boolean('options.days', true);
    const shortMonthName = boolean('options.shortMonthName', false);
    const options = React.useMemo(
        () => ({
            years,
            months,
            days,
            shortMonthName,
        }),
        [years, months, days],
    );

    return (
        <DatePicker
            id="example"
            value={value}
            min={min}
            max={max}
            size={select('size', ['l', 's'], 's')}
            visibleItems={select('visibleItems', [3, 5], 5)}
            scrollSnapType={select('scrollSnapType', snapTypes, isSberbox ? 'none' : 'mandatory')}
            options={options}
            disabled={boolean('disabled', false)}
            controls={boolean('controls', isSberbox)}
            autofocus={boolean('autofocus', true)}
            onChange={onChange}
        />
    );
};

// eslint-disable-next-line @typescript-eslint/camelcase
export const Time_Picker = () => {
    const [value, setValue] = React.useState(parseDateTime(text('value', '01.09.1980 00:28:59')));
    const onChange = React.useCallback((v) => setValue(v), []);
    const min = parseDateTime(text('min', '01.01.1975 00:15:29'));
    const max = parseDateTime(text('max', '31.12.1985 12:45:50'));
    const hours = boolean('options.hours', true);
    const minutes = boolean('options.minutes', true);
    const seconds = boolean('options.seconds', true);
    const options = React.useMemo(
        () => ({
            hours,
            minutes,
            seconds,
        }),
        [hours, minutes, seconds],
    );

    return (
        <TimePicker
            value={value}
            min={min}
            max={max}
            step={number('step', 1)}
            size={select('size', ['l', 's'], 'l')}
            visibleItems={select('visibleItems', [3, 5], 3)}
            scrollSnapType={select('scrollSnapType', snapTypes, isSberbox ? 'none' : 'mandatory')}
            options={options}
            disabled={boolean('disabled', false)}
            controls={boolean('controls', isSberbox)}
            autofocus={boolean('autofocus', true)}
            onChange={onChange}
        />
    );
};
