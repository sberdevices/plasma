import React from 'react';
import { boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { isSberBox } from '../../utils';

import { DatePicker as DatePickerComponent, TimePicker as TimePickerComponent } from '.';

const now = new Date();

export const DatePicker = () => {
    const isSberbox = isSberBox();

    return (
        <DatePickerComponent
            value={new Date(number('year', 1980), number('month', 8), number('date', 1))}
            min={new Date(1975, 0, 1)}
            max={new Date(1985, 12, 31)}
            options={{
                years: boolean('options.years', true),
                months: boolean('options.months', true),
                days: boolean('options.days', true),
            }}
            disabled={boolean('disabled', false)}
            controls={boolean('controls', isSberbox)}
            visibleItems={select('visibleItems', [3, 5], 5)}
            onChange={action('onChange')}
        />
    );
};

export const TimePicker = () => {
    const isSberbox = isSberBox();

    return (
        <TimePickerComponent
            value={
                new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate(),
                    number('hours', 0),
                    number('minutes', 30),
                    number('seconds', 59),
                )
            }
            min={new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 15, 29)}
            max={new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 45, 59)}
            options={{
                hours: boolean('options.hours', true),
                minutes: boolean('options.minutes', true),
                seconds: boolean('options.seconds', true),
            }}
            disabled={boolean('disabled', false)}
            controls={boolean('controls', isSberbox)}
            onChange={action('onChange')}
        />
    );
};
