import React from 'react';
import styled from 'styled-components';

import { padZeroNumber as formatter } from '../../utils/formatters';
import { PickOptional } from '../../types';

import { Picker, PickerProps } from './Picker';

const StyledPicker = styled(Picker)`
    width: 4.75rem;
`;

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
    const items = Array.from({ length: to - from + 1 }, (_, i) => ({
        label: formatter(from + i),
        value: from + i,
    }));

    return (
        <StyledPicker
            size="l"
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
