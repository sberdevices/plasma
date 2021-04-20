import React from 'react';
import { boolean, number, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { isSberBox } from '../../utils';

import { DatePicker as DatePickerComponent, TimePicker as TimePickerComponent } from '.';

const now = new Date();

export const DatePicker = () => {
    const [value, setValue] = React.useState(new Date(number('year', 1980), number('month', 8), number('date', 1)));
    const isSberbox = isSberBox();

    return (
        <DatePickerComponent
            value={value}
            min={new Date(1975, 0, 1)}
            max={new Date(1985, 12, 31)}
            size={select('size', ['l', 's'], 's')}
            visibleItems={select('visibleItems', [3, 5], 5)}
            options={{
                years: boolean('options.years', true),
                months: boolean('options.months', true),
                days: boolean('options.days', true),
            }}
            disabled={boolean('disabled', false)}
            controls={boolean('controls', isSberbox)}
            autofocus={boolean('autofocus', true)}
            onChange={(newValue) => {
                setValue(newValue);
            }}
        />
    );
};

export const TimePicker = () => {
    const [value, setValue] = React.useState(
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...text('value', '0:28:59').split(':').map(Number)),
    );
    const isSberbox = isSberBox();

    return (
        <TimePickerComponent
            value={value}
            min={
                new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate(),
                    ...text('min', '0:15:29').split(':').map(Number),
                )
            }
            max={
                new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate(),
                    ...text('max', '12:45:50').split(':').map(Number),
                )
            }
            step={number('step', 1)}
            size={select('size', ['l', 's'], 'l')}
            visibleItems={select('visibleItems', [3, 5], 3)}
            options={{
                hours: boolean('options.hours', true),
                minutes: boolean('options.minutes', true),
                seconds: boolean('options.seconds', true),
            }}
            disabled={boolean('disabled', false)}
            controls={boolean('controls', isSberbox)}
            autofocus={boolean('autofocus', true)}
            onChange={(val) => {
                setValue(val);
                action('onChange')(val);
            }}
        />
    );
};
