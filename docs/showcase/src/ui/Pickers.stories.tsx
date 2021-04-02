import React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import {
    DatePicker as DatePickerComponent,
    TimePicker as TimePickerComponent,
} from '@sberdevices/plasma-ui/components/Pickers';
import { isSberBox } from '@sberdevices/plasma-ui/utils/deviceDetection';

import { ShowcaseDashedBorder, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Controls/Pickers',
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

const now = new Date();

const StyledWrapper = styled.div`
    display: flex;
`;

const DatePicker = () => {
    const isSberbox = isSberBox();

    return (
        <DatePickerComponent
            value={new Date(1980, 8, 1)}
            min={new Date(1975, 0, 1)}
            max={new Date(1985, 12, 31)}
            options={{
                years: true,
                months: true,
                days: true,
            }}
            disabled={false}
            controls={isSberbox}
            visibleItems={5}
            onChange={action('onChange')}
        />
    );
};

const TimePicker = () => {
    const isSberbox = isSberBox();

    return (
        <TimePickerComponent
            value={new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 30, 59)}
            min={new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 15, 29)}
            max={new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 45, 59)}
            options={{
                hours: true,
                minutes: true,
                seconds: true,
            }}
            disabled={false}
            controls={isSberbox}
            onChange={action('onChange')}
        />
    );
};

export const Default = () => (
    <StyledWrapper>
        <ShowcaseDashedBorder style={{ marginRight: '1rem' }}>
            <DatePicker />
        </ShowcaseDashedBorder>
        <ShowcaseDashedBorder>
            <TimePicker />
        </ShowcaseDashedBorder>
    </StyledWrapper>
);
