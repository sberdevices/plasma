import React from 'react';
import { padZeroNumber as formatter } from '@sberdevices/plasma-core/utils';
import { PickOptional } from '@sberdevices/plasma-core/types';

import { Picker, PickerProps } from './Picker';

interface SimpleTimePickerProps
    extends Pick<PickerProps, 'value' | 'onChange'>,
        PickOptional<PickerProps, 'disabled' | 'controls'>,
        Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    from: number;
    to: number;
}

export const SimpleTimePicker: React.FC<SimpleTimePickerProps> = ({
    value,
    from,
    to,
    disabled,
    controls,
    onChange,
    ...rest
}) => {
    const items = React.useMemo(
        () =>
            Array.from({ length: to - from + 1 }, (_, i) => ({
                label: formatter(from + i),
                value: from + i,
            })),
        [from, to],
    );

    return (
        <Picker
            size="s"
            items={items}
            value={value}
            disabled={disabled}
            controls={controls}
            onChange={onChange}
            visibleItems={3}
            {...rest}
        />
    );
};
