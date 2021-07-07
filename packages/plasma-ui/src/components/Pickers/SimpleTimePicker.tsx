import React from 'react';
import { padZeroNumber as formatter } from '@sberdevices/plasma-core';

import { Picker, PickerProps } from './Picker';

export interface SimpleTimePickerProps extends Omit<PickerProps, 'items'> {
    type: 'hours' | 'minutes' | 'seconds';
    range: number[];
}

export const SimpleTimePicker = React.memo<SimpleTimePickerProps>(({ id, type, range, ...rest }) => {
    const items = range.map((value) => ({
        label: formatter(value),
        value,
    }));

    return <Picker id={id ? `${id}-${type}` : undefined} items={items} {...rest} />;
});
