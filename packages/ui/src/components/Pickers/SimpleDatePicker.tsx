import React from 'react';
import styled, { css } from 'styled-components';
import { scalingPixelBasis } from '@sberdevices/plasma-tokens';

import { monthLongName } from '../../utils/formatters';
import { PickOptional } from '../../types';

import { Picker, PickerProps } from './Picker';

type PickerType = 'day' | 'month' | 'year';

const labelFormatter = {
    day: (value: number) => `${value}`,
    year: (value: number) => `${value}`,
    month: monthLongName,
};

const width = {
    day: 48 / scalingPixelBasis,
    year: 80 / scalingPixelBasis,
    month: 180 / scalingPixelBasis,
};

const StyledPicker = styled(Picker)<{ $width: keyof typeof width }>`
    ${({ $width }) =>
        css`
            width: ${width[$width]}rem;
        `}

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
            $width={type}
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
