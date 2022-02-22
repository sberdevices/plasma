import React, { forwardRef } from 'react';
import { TextFieldRoot, TextFieldHelper } from '@sberdevices/plasma-core';

import { withAssistiveDropdown } from '../Dropdown';
import type { FieldProps } from '../Field';

import { SelectDropdown, SelectDropdownProps } from './SelectDropdown';
import { SelectButton, SelectButtonProps, SelectRefElement } from './SelectButton';

export interface SelectViewProps
    extends Pick<FieldProps, 'status' | 'placeholder' | 'helperText' | 'disabled'>,
        Pick<SelectDropdownProps, 'items' | 'onItemSelect'>,
        Omit<SelectButtonProps, 'hasItems' | 'isExpanded' | 'onChange'> {
    /**
     * Выбор нескольких значений.
     */
    multiselect?: boolean;
}

const DropdownButton = withAssistiveDropdown(SelectButton, SelectDropdown);

/**
 * Поле с выпадающим списком.
 */
export const SelectView = forwardRef<SelectRefElement, SelectViewProps>(
    (
        {
            id,
            placeholder,
            value,
            helperText,
            disabled,
            status,
            className,
            style,
            items,
            multiselect,
            onItemSelect,
            ...rest
        },
        ref,
    ) => {
        const hasItems = Array.isArray(items) && items.length > 0;

        return (
            <TextFieldRoot
                id={id}
                $size="m"
                $disabled={disabled}
                $isContentRight={hasItems}
                $isHelper={Boolean(helperText)}
                status={status}
                className={className}
                style={style}
            >
                <DropdownButton
                    {...rest}
                    ref={ref}
                    id={id ? `${id}-dropdown` : id}
                    role="combobox"
                    menuRole="listbox"
                    menuItemRole="option"
                    value={value}
                    placeholder={placeholder}
                    hasItems={hasItems}
                    status={status}
                    items={items}
                    disabled={disabled}
                    closeOnSelect={!multiselect}
                    onItemSelect={onItemSelect}
                />
                {helperText && <TextFieldHelper>{helperText}</TextFieldHelper>}
            </TextFieldRoot>
        );
    },
);
