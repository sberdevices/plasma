import type { HTMLAttributes } from 'react';
import type { TextFieldProps } from '@sberdevices/plasma-core';

import type { DropdownProps } from '../Dropdown';

export type SelectRefElement = HTMLButtonElement;

export interface SelectViewProps
    extends Pick<TextFieldProps, 'status' | 'placeholder' | 'helperText' | 'disabled'>,
        Pick<DropdownProps, 'items' | 'onItemClick'>,
        Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> {
    value?: string | number | null;
    multiselect?: boolean;
}
