import React from 'react';
import { monthLongName } from '@sberdevices/plasma-core';

import { Picker, PickerProps } from './Picker';

type PickerType = 'day' | 'month' | 'year';

const labelFormatter = {
    day: (value: number) => `${value}`,
    year: (value: number) => `${value}`,
    month: monthLongName,
};

export interface SimpleDatePickerProps extends Omit<PickerProps, 'items'> {
    from: number;
    to: number;
    type: PickerType;
}

export const SimpleDatePicker: React.FC<SimpleDatePickerProps> = ({ type, from, to, ...rest }) => {
    const formatter = labelFormatter[type];

    const items = Array.from({ length: to - from + 1 }, (_, i) => ({
        label: formatter(from + i),
        value: from + i,
    }));

    return <Picker items={items} {...rest} />;
};
