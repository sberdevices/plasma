import React from 'react';
import styled from 'styled-components';
import { Story, Meta } from '@storybook/react';
import type { SnapType } from '@sberdevices/plasma-core';

import { isSberBox } from '../../utils';
import { disableProps } from '../../helpers';

import { DatePicker, TimePicker, DatePickerProps, TimePickerProps } from '.';

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

const propsToDisable = ['initialValue', 'minDate', 'maxDate'];

export default {
    title: 'Controls/Pickers',
    argTypes: {
        ...disableProps(propsToDisable),
    },
} as Meta;

interface DefaultStoryProps extends DatePickerProps {
    initialValue: string;
    minDate: string;
    maxDate: string;
    DatePickeSize: string;
    TimePickeSize: string;
    TimePickerStep: number;
    DatePickerVisibleItems: number;
    TimePickerVisibleItems: number;
    DatePickerNativeControl: boolean;
    TimePickerNativeControl: boolean;
    optionsYears: boolean;
    optionsMonths: boolean;
    optionsDays: boolean;
    optionsShortMonthName: boolean;
    optionsHours: boolean;
    optionsMinutes: boolean;
    optionsSeconds: boolean;
}

export const Default: Story<DefaultStoryProps> = (args) => {
    const [value, setValue] = React.useState(parseDateTime(args.initialValue));
    const min = parseDateTime(args.minDate);
    const max = parseDateTime(args.maxDate);
    const onChange = React.useCallback((v) => setValue(v), []);
    const years = args.optionsYears;
    const months = args.optionsMonths;
    const days = args.optionsDays;
    const shortMonthName = args.optionsShortMonthName;
    const hours = args.optionsHours;
    const minutes = args.optionsMinutes;
    const seconds = args.optionsSeconds;
    const dateOptions = React.useMemo(
        () => ({
            years,
            months,
            days,
            shortMonthName,
        }),
        [years, months, days, shortMonthName],
    );
    const timeOptions = React.useMemo(
        () => ({
            hours,
            minutes,
            seconds,
        }),
        [hours, minutes, seconds],
    );

    return (
        <StyledWrapper>
            <DatePicker
                id="datepicker"
                value={value}
                min={min}
                max={max}
                size={args.DatePickeSize as 's'}
                visibleItems={args.DatePickerVisibleItems as 3}
                scrollSnapType={args.scrollSnapType}
                options={dateOptions}
                disabled={args.disabled}
                controls={args.controls}
                autofocus={args.autofocus}
                infiniteScroll={args.infiniteScroll}
                onChange={onChange}
                enableNativeControl={args.DatePickerNativeControl}
                daysAriaLabel="день"
                monthsAriaLabel="месяц"
                yearsAriaLabel="год"
            />
            <TimePicker
                id="timepicker"
                value={value}
                min={min}
                max={max}
                step={args.TimePickerStep}
                size={args.TimePickeSize as 's'}
                visibleItems={args.TimePickerVisibleItems as 3}
                scrollSnapType={args.scrollSnapType}
                options={timeOptions}
                disabled={args.disabled}
                controls={args.controls}
                infiniteScroll={args.infiniteScroll}
                onChange={onChange}
                enableNativeControl={args.TimePickerNativeControl}
                secondsAriaLabel="секунды"
                minutesAriaLabel="минуты"
                hoursAriaLabel="часы"
            />
        </StyledWrapper>
    );
};

Default.args = {
    initialValue: '01.09.1980 00:28:59',
    minDate: '01.01.1975 01:15:29',
    maxDate: '31.12.1985 12:45:50',
    optionsYears: true,
    optionsMonths: true,
    optionsDays: true,
    optionsShortMonthName: false,
    optionsHours: true,
    optionsMinutes: true,
    optionsSeconds: true,
    disabled: false,
    controls: isSberbox,
    autofocus: true,
    scrollSnapType: isSberbox ? 'none' : 'mandatory',
    infiniteScroll: true,
    DatePickeSize: 's',
    DatePickerVisibleItems: 3,
    TimePickeSize: 's',
    TimePickerStep: 1,
    TimePickerVisibleItems: 5,
    DatePickerNativeControl: false,
    TimePickerNativeControl: false,
};

Default.argTypes = {
    DatePickeSize: {
        control: {
            type: 'inline-radio',
            options: ['l', 's', 'xs'],
        },
    },
    TimePickeSize: {
        control: {
            type: 'inline-radio',
            options: ['l', 's', 'xs'],
        },
    },
    DatePickerVisibleItems: {
        control: {
            type: 'inline-radio',
            options: [3, 5],
        },
    },
    TimePickerVisibleItems: {
        control: {
            type: 'inline-radio',
            options: [3, 5],
        },
    },
    scrollSnapType: {
        control: {
            type: 'select',
            options: snapTypes,
        },
    },
};

interface DatePickerStoryProps extends DatePickerProps {
    initialValue: string;
    minDate: string;
    maxDate: string;
    optionsYears: boolean;
    optionsMonths: boolean;
    optionsDays: boolean;
    optionsShortMonthName: boolean;
}

// eslint-disable-next-line @typescript-eslint/camelcase
export const Date_Picker: Story<DatePickerStoryProps> = ({
    initialValue,
    minDate,
    maxDate,
    optionsYears,
    optionsMonths,
    optionsDays,
    optionsShortMonthName,
    ...rest
}) => {
    const [value, setValue] = React.useState(parseDateTime(initialValue));
    const min = parseDateTime(minDate);
    const max = parseDateTime(maxDate);
    const onChange = React.useCallback((v) => setValue(v), []);
    const years = optionsYears;
    const months = optionsMonths;
    const days = optionsDays;
    const shortMonthName = optionsShortMonthName;

    const options = React.useMemo(
        () => ({
            years,
            months,
            days,
            shortMonthName,
        }),
        [years, months, days, shortMonthName],
    );

    return (
        <DatePicker
            id="example"
            value={value}
            min={min}
            max={max}
            options={options}
            onChange={onChange}
            daysAriaLabel="день"
            monthsAriaLabel="месяц"
            yearsAriaLabel="год"
            {...rest}
        />
    );
};

// eslint-disable-next-line @typescript-eslint/camelcase
Date_Picker.args = {
    initialValue: '01.09.1980 00:28:59',
    minDate: '01.02.1975 01:15:29',
    maxDate: '30.11.1985 12:45:50',
    optionsYears: true,
    optionsMonths: true,
    optionsDays: true,
    optionsShortMonthName: false,
    disabled: false,
    controls: true,
    autofocus: true,
    scrollSnapType: isSberbox ? 'none' : 'mandatory',
    size: 's',
    visibleItems: 5,
    infiniteScroll: true,
};

// eslint-disable-next-line @typescript-eslint/camelcase
Date_Picker.argTypes = {
    size: {
        control: {
            type: 'inline-radio',
            options: ['l', 's'],
        },
    },
    visibleItems: {
        control: {
            type: 'inline-radio',
            options: [3, 5],
        },
    },
    scrollSnapType: {
        control: {
            type: 'select',
            options: snapTypes,
        },
    },
};

interface TimePickerStoryProps extends TimePickerProps {
    initialValue: string;
    minDate: string;
    maxDate: string;
    optionsHours: boolean;
    optionsMinutes: boolean;
    optionsSeconds: boolean;
}

// eslint-disable-next-line @typescript-eslint/camelcase
export const Time_Picker: Story<TimePickerStoryProps> = ({
    initialValue,
    minDate,
    maxDate,
    optionsHours,
    optionsMinutes,
    optionsSeconds,
    ...rest
}) => {
    const [value, setValue] = React.useState(parseDateTime(initialValue));
    const min = parseDateTime(minDate);
    const max = parseDateTime(maxDate);
    const onChange = React.useCallback((v) => setValue(v), []);
    const hours = optionsHours;
    const minutes = optionsMinutes;
    const seconds = optionsSeconds;

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
            key={rest.size}
            value={value}
            min={min}
            max={max}
            options={options}
            onChange={onChange}
            secondsAriaLabel="секунды"
            minutesAriaLabel="минуты"
            hoursAriaLabel="часы"
            {...rest}
        />
    );
};

// eslint-disable-next-line @typescript-eslint/camelcase
Time_Picker.args = {
    initialValue: '01.09.1980 00:28:59',
    minDate: '01.09.1980 00:15:29',
    maxDate: '01.09.1980 12:30:30',
    optionsHours: true,
    optionsMinutes: true,
    optionsSeconds: true,
    disabled: false,
    controls: true,
    autofocus: true,
    scrollSnapType: isSberbox ? 'none' : 'mandatory',
    size: 'l',
    visibleItems: 3,
    step: 1,
    infiniteScroll: true,
};

// eslint-disable-next-line @typescript-eslint/camelcase
Time_Picker.argTypes = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    ...Date_Picker.argTypes,
    size: {
        control: {
            type: 'inline-radio',
            options: ['l', 's', 'xs'],
        },
    },
};
