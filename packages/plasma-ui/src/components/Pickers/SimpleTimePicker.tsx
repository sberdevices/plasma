import React from 'react';
import { padZeroNumber as formatter } from '@sberdevices/plasma-core';

import { Picker, PickerProps } from './Picker';

export interface SimpleTimePickerProps extends Omit<PickerProps, 'items'> {
    range: number[];
}

export const SimpleTimePicker: React.FC<SimpleTimePickerProps> = ({ range, ...rest }) => {
    const items = React.useMemo(
        () =>
            range.map((value) => ({
                label: formatter(value),
                value,
            })),
        [range],
    );

    return <Picker items={items} {...rest} />;
};
