import React from 'react';
import { monthShortName, monthLongName } from '@sberdevices/plasma-core';

import { Picker, PickerProps } from './Picker';

type PickerType = 'day' | 'month' | 'year';
type MonthNameFormat = 'long' | 'short';

const labelFormatter = {
    day: (value: number) => `${value}`,
    year: (value: number) => `${value}`,
    month: monthLongName,
    monthShort: monthShortName,
};

const getFormatterKey = (type: PickerType, monthNameFormat?: MonthNameFormat): keyof typeof labelFormatter => {
    const isMonth = type === 'month';
    const isShortFormat = monthNameFormat === 'short';
    if (isMonth && isShortFormat) {
        return 'monthShort';
    }
    return type;
};

export interface SimpleDatePickerProps extends Omit<PickerProps, 'items'> {
    from: number;
    to: number;
    type: PickerType;
    monthNameFormat?: MonthNameFormat;
}

export const SimpleDatePicker: React.FC<SimpleDatePickerProps> = ({ id, type, from, to, monthNameFormat, ...rest }) => {
    const formatterKey = getFormatterKey(type, monthNameFormat);
    const formatter = labelFormatter[formatterKey];

    const items = Array.from({ length: to - from + 1 }, (_, i) => ({
        label: formatter(from + i),
        value: from + i,
    }));

    return <Picker id={id ? `${id}-${type}` : undefined} items={items} {...rest} />;
};
