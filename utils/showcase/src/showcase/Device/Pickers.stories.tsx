import React from 'react';
import { DatePicker, TimePicker } from '@sberdevices/plasma-ui/components/Pickers';

import { ShowcasePanel, ShowcaseDashedBorder, ShowcaseSectionName, UIStoryDecorator } from '../../helpers';

export default {
    title: 'Showcase/Device',
    decorators: [UIStoryDecorator],
    parameters: {
        chromatic: {
            disable: true,
        },
        docs: {
            page: null,
        },
    },
};

const DateP: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
    <ShowcasePanel {...props}>
        <ShowcaseDashedBorder>
            <DatePicker
                value={new Date(1980, 8, 1)}
                min={new Date(1975, 0, 1)}
                max={new Date(1985, 12, 31)}
                disabled={false}
                controls={false}
                visibleItems={5}
                onChange={() => undefined}
            />
        </ShowcaseDashedBorder>
    </ShowcasePanel>
);

const TimeP: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
    <ShowcasePanel {...props}>
        <ShowcaseDashedBorder>
            <TimePicker
                value={new Date(1980, 8, 1, 0, 30, 59)}
                min={new Date(1975, 0, 1, 0, 15, 29)}
                max={new Date(1985, 12, 31, 12, 45, 59)}
                disabled={false}
                controls={false}
                onChange={() => undefined}
            />
        </ShowcaseDashedBorder>
    </ShowcasePanel>
);

export const Pickers = () => (
    <>
        <ShowcaseSectionName title="DatePicker" subTitle="Выбор даты" />
        <DateP style={{ maxWidth: '33.75rem', marginBottom: 0 }} />
        <ShowcaseSectionName title="TimePicker" subTitle="Выбор времени" />
        <TimeP style={{ maxWidth: '33.75rem' }} />
    </>
);
