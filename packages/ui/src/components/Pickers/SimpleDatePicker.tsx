import React from 'react';
import styled from 'styled-components';
import { monthLongName, monthShortName } from '@sberdevices/plasma-core/utils';
import type { PickOptional } from '@sberdevices/plasma-core/types';

import { Picker, PickerProps } from './Picker';

type PickerType = 'day' | 'month' | 'monthShort' | 'year';

const labelFormatter = {
    day: (value: number) => `${value}`,
    year: (value: number) => `${value}`,
    monthShort: monthShortName,
    month: monthLongName,
};

const StyledPicker = styled(Picker)`
    & + & {
        margin-left: 1rem;
    }
`;

interface SimpleDatePickerProps
    extends Pick<PickerProps, 'value' | 'onChange'>,
        PickOptional<PickerProps, 'disabled' | 'controls' | 'visibleItems'>,
        Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    from: number;
    to: number;
    type: PickerType;
}

export const SimpleDatePicker: React.FC<SimpleDatePickerProps> = ({
    value,
    type,
    from,
    to,
    disabled,
    controls,
    visibleItems,
    onChange,
    ...rest
}) => {
    const formatter = labelFormatter[type];

    const items = Array.from({ length: to - from + 1 }, (_, i) => ({
        label: formatter(from + i),
        value: from + i,
    }));

    return (
        <StyledPicker
            size="s"
            items={items}
            value={value}
            disabled={disabled}
            controls={controls}
            visibleItems={visibleItems}
            onChange={onChange}
            {...rest}
        />
    );
};
