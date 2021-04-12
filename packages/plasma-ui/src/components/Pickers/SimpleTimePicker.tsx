import React from 'react';
import { padZeroNumber as formatter } from '@sberdevices/plasma-core/utils';

import { Picker, PickerProps } from './Picker';

export interface SimpleTimePickerProps extends Omit<PickerProps, 'items'> {
    from: number;
    to: number;
}

export const SimpleTimePicker: React.FC<SimpleTimePickerProps> = ({ from, to, ...rest }) => {
    const items = React.useMemo(
        () =>
            Array.from({ length: to - from + 1 }, (_, i) => ({
                label: formatter(from + i),
                value: from + i,
            })),
        [from, to],
    );

    return <Picker items={items} {...rest} />;
};
