import React from 'react';

import { SectionName } from '../../SectionName';
import { ThemeProvider } from '../../ThemeProvider';

import { DatePicker, TimePicker } from '.';

export default {
    title: 'Showcase/Mobile',
    parameters: {
        chromatic: {
            disable: true,
        },
        docs: {
            page: null,
        },
    },
};

export const Pickers = () => (
    <ThemeProvider>
        <SectionName title="DatePicker" description="Выбор даты" />
        <DatePicker style={{ maxWidth: '33.75rem', marginBottom: 0 }} />
        <SectionName title="TimePicker" description="Выбор времени" />
        <TimePicker style={{ maxWidth: '33.75rem' }} />
    </ThemeProvider>
);
