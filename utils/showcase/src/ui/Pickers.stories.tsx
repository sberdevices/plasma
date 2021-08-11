import React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import {
    DatePicker as DatePickerComponent,
    DatePickerProps,
    TimePicker as TimePickerComponent,
    TimePickerProps,
} from '@sberdevices/plasma-ui/components/Pickers';

import { ShowcaseDashedBorder, ShowcaseHead, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Controls/Pickers',
    decorators: [UIStoryDecorator, InSpacingDecorator, withKnobs],
    chromatic: { delay: 700 },
};

const now = new Date();

const StyledRow = styled.div`
    & + & {
        margin-top: 1rem;
    }

    /* stylelint-disable-next-line selector-max-universal */
    & > * + * {
        margin-left: 1rem;
    }
`;
const StyledBorder = styled(ShowcaseDashedBorder)`
    display: inline-block;
`;

const DatePicker: React.FC<Omit<DatePickerProps, 'value' | 'max' | 'min'>> = (props) => {
    const [value, setValue] = React.useState(new Date(1980, 8, 1));

    return (
        <DatePickerComponent
            {...props}
            value={value}
            min={new Date(1975, 0, 1)}
            max={new Date(1985, 12, 31)}
            options={{
                years: true,
                months: true,
                days: true,
                shortMonthName: boolean('options.shortMonthName', false),
            }}
            visibleItems={5}
            onChange={(val) => {
                setValue(val);
                action('onChange')(val);
            }}
        />
    );
};

const TimePicker: React.FC<Omit<TimePickerProps, 'value' | 'max' | 'min'>> = (props) => {
    const [value, setValue] = React.useState(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 30, 59));

    return (
        <TimePickerComponent
            {...props}
            value={value}
            min={new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 15, 29)}
            max={new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 45, 50)}
            options={{
                hours: true,
                minutes: true,
                seconds: true,
            }}
            onChange={(val) => {
                setValue(val);
                action('onChange')(val);
            }}
        />
    );
};

export const Default = () => (
    <>
        <StyledRow>
            <StyledBorder>
                <ShowcaseHead>DatePicker L</ShowcaseHead>
                <DatePicker size="l" />
            </StyledBorder>
            <StyledBorder>
                <ShowcaseHead>TimePicker L</ShowcaseHead>
                <TimePicker size="l" />
            </StyledBorder>
        </StyledRow>
        <StyledRow>
            <StyledBorder>
                <ShowcaseHead>DatePicker S + Controls</ShowcaseHead>
                <DatePicker controls autofocus />
            </StyledBorder>
            <StyledBorder>
                <ShowcaseHead>TimePicker S + Controls</ShowcaseHead>
                <TimePicker controls />
            </StyledBorder>
        </StyledRow>
        <StyledRow>
            <StyledBorder>
                <ShowcaseHead>DatePicker S, Disabled</ShowcaseHead>
                <DatePicker disabled />
            </StyledBorder>
            <StyledBorder>
                <ShowcaseHead>TimePicker S, Disabled</ShowcaseHead>
                <TimePicker disabled />
            </StyledBorder>
        </StyledRow>
    </>
);
