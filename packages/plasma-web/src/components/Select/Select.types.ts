import type { HTMLAttributes } from 'react';
import type { TextFieldProps } from '@sberdevices/plasma-core';

import type { DropdownProps } from '../Dropdown';
import type { PopupProps } from '../Popup';

export type SelectRefElement = HTMLButtonElement;

export interface SelectDopdownProps extends PopupProps, Pick<DropdownProps, 'items' | 'onItemClick'> {
    /**
     * Выбор нескольких значений.
     */
    multiselect?: boolean;
    disabled?: boolean;
    children?: never;

    /**
     * id для listbox(контейнера для опций). Используется для a11y. Должен быть уникальным
     */
    listId?: string;

    onActiveChange?: (id: string) => void;

    isNested?: boolean;
}

export interface SelectViewProps
    extends Pick<TextFieldProps, 'status' | 'placeholder' | 'helperText' | 'disabled'>,
        Pick<SelectDopdownProps, 'items' | 'multiselect' | 'onItemClick' | 'listId'>,
        Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> {
    value?: string | number | null;
}
