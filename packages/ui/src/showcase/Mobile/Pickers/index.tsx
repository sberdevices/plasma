import React from 'react';

import { DatePicker as DatePickerComponent, TimePicker as TimePickerComponent } from '../../../components/Pickers';
import { ShowcaseDashedBorder } from '../../../helpers';
import { Panel } from '../../Panel';

export const DatePicker: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
    <Panel {...props}>
        <ShowcaseDashedBorder>
            <DatePickerComponent
                value={new Date(1980, 8, 1)}
                min={new Date(1975, 0, 1)}
                max={new Date(1985, 12, 31)}
                disabled={false}
                controls={false}
                visibleItems={5}
                onChange={() => undefined}
            />
        </ShowcaseDashedBorder>
    </Panel>
);

export const TimePicker: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
    <Panel {...props}>
        <ShowcaseDashedBorder>
            <TimePickerComponent
                value={new Date(1980, 8, 1, 0, 30, 59)}
                min={new Date(1975, 0, 1, 0, 15, 29)}
                max={new Date(1985, 12, 31, 12, 45, 59)}
                disabled={false}
                controls={false}
                onChange={() => undefined}
            />
        </ShowcaseDashedBorder>
    </Panel>
);
