import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import {
    TextFieldRoot,
    TextFieldHelper,
    button2,
    surfaceLiquid01,
    surfaceLiquid02,
    primary,
    success,
    warning,
    critical,
} from '@sberdevices/plasma-core';
import {
    SelectDropdown as BaseDropdown,
    SelectButton as BaseButton,
    withAssistiveDropdown,
} from '@sberdevices/plasma-web';
import type { SelectViewProps, SelectRefElement } from '@sberdevices/plasma-web';

import { SelectGroup } from './SelectGroup';

const statuses = {
    success,
    warning,
    error: critical,
};

const SelectButton = styled(BaseButton)`
    ${button2}

    --plasma-select-button-arrow-margin: 0 -0.25rem 0 0.75rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;

    width: 100%;
    height: 3rem;
    padding: 1rem;

    background-color: ${surfaceLiquid01};
    border: 0 none;
    border-radius: 0.75rem;
    color: ${primary};
    transition: background-color 0.3s ease-in-out;

    &:focus {
        outline: 0 none;
    }

    &:disabled {
        cursor: inherit;
    }

    ${({ hasItems }) =>
        hasItems &&
        css`
            &:hover:not(:disabled),
            &:focus:not(:disabled) {
                background-color: ${surfaceLiquid02};
                color: ${primary};
                cursor: pointer;
            }
        `}

    &:focus:not(:disabled) {
        background-color: ${surfaceLiquid02};
    }

    ${({ status }) =>
        status &&
        css`
            color: ${statuses[status]};
        `}
`;
const StyledRoot = styled(TextFieldRoot)`
    /* stylelint-disable-next-line declaration-block-semicolon-newline-after, rule-empty-line-before */
    ${SelectGroup} &:not(:last-child) {
        margin-right: 0.125rem;
    }

    /* stylelint-disable-next-line declaration-block-semicolon-newline-after, rule-empty-line-before */
    ${SelectGroup} &:not(:first-child) ${SelectButton} {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    /* stylelint-disable-next-line declaration-block-semicolon-newline-after, rule-empty-line-before */
    ${SelectGroup} &:not(:last-child) ${SelectButton} {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
`;
const SelectDropdown = styled(BaseDropdown)`
    --plasma-dropdown-padding: 0.125rem;
    --plasma-dropdown-border-radius: 0.875rem;
    --plasma-dropdown-item-height: 2.75rem;
    --plasma-dropdown-item-padding: 0.875rem;
    --plasma-dropdown-item-border-radius: 0.75rem;
    --plasma-dropdown-item-font-size: ${button2.fontSize};
    --plasma-dropdown-item-font-weight: ${button2.fontWeight};
    --plasma-dropdown-item-line-height: ${button2.lineHeight};
    --plasma-dropdown-item-letter-spacing: ${button2.letterSpacing};
`;

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
            <StyledRoot
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
            </StyledRoot>
        );
    },
);
