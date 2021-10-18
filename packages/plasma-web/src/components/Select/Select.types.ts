import type { HTMLAttributes } from 'react';
import type { TextFieldProps } from '@sberdevices/plasma-core';

import type { DropdownProps } from '../Dropdown';
import type { PopupProps } from '../Popup';

export type SelectRefElement = HTMLButtonElement;

export interface SelectDopdownProps extends PopupProps, Pick<DropdownProps, 'items' | 'onItemClick'> {
    children?: never;
}

export interface SelectViewProps
    extends Pick<TextFieldProps, 'status' | 'placeholder' | 'helperText' | 'disabled'>,
        Pick<SelectDopdownProps, 'items' | 'onItemClick'>,
        Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> {
    value?: string | number | null;
}
