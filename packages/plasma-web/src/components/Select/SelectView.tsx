import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import {
    TextFieldRoot,
    TextFieldHelper,
    body1,
    accent,
    primary,
    secondary,
    tertiary,
    success,
    warning,
    critical,
    applyEllipsis,
} from '@sberdevices/plasma-core';
import type { TextFieldProps as BaseProps } from '@sberdevices/plasma-core';

import { inputBorder, inputBorderHover } from '../../tokens';

import { SelectDropdown } from './SelectDropdown';
import { SelectArrow } from './SelectArrow';
import type { SelectRefElement, SelectViewProps } from './Select.types';

const statuses = {
    success,
    warning,
    error: critical,
};

const StyledRoot = styled(TextFieldRoot)`
    --plasma-dropdown-padding: 0.25rem;
    --plasma-dropdown-border-radius: 0.25rem;
    --plasma-dropdown-item-border-radius: 0.25rem;
`;
const StyledText = styled.span`
    ${applyEllipsis}

    color: ${primary};
    transition: color 0.3s ease-in-out;
    pointer-events: none;
    user-select: none;
`;
const StyledPlaceholder = styled.span`
    ${applyEllipsis}

    color: ${tertiary};
    pointer-events: none;
    user-select: none;
`;

interface StyledButtonProps extends Pick<BaseProps, 'status'> {
    focused?: boolean;
    hasItems?: boolean;
}
const StyledButton = styled.button<StyledButtonProps>`
    ${body1};

    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;

    width: 100%;
    height: 3rem;

    /* stylelint-disable-next-line number-max-precision */
    padding: 0.875rem 0.9375rem;
    border: 1px solid ${inputBorder};
    border-radius: 0.25rem;

    background-color: transparent;
    color: ${secondary};
    transition: border-color 0.3s ease-in-out;

    &:disabled {
        cursor: inherit;
    }

    ${({ hasItems }) =>
        hasItems &&
        css`
            &:hover:not(:disabled) {
                cursor: pointer;
                border-color: ${inputBorderHover};
                color: ${secondary};
            }
        `}

    &:focus:not(:disabled) {
        outline: 0 none;
        border-color: ${accent};
        color: ${accent};

        /* stylelint-disable-next-line selector-nested-pattern */
        ${StyledText} {
            color: ${accent};
        }
    }

    ${({ focused }) =>
        focused &&
        css`
            border-color: ${accent};
            color: ${accent};

            ${StyledText} {
                color: ${accent};
            }
        `}

    ${({ status }) =>
        status &&
        css`
            border-color: ${statuses[status]};
            color: ${statuses[status]};

            /* stylelint-disable-next-line selector-nested-pattern */
            &:hover,
            &:focus,
            &:disabled {
                border-color: ${statuses[status]};
            }
        `}
`;

/**
 * Поле с выпадающим списком.
 */
export const SelectView = React.forwardRef<SelectRefElement, SelectViewProps>(
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
            onItemClick,
            ...rest
        },
        ref,
    ) => {
        const hasItems = Array.isArray(items) && items.length > 0;
        const [selectedItem, setSelectedItem] = useState<string | undefined>(undefined);
        const [isOpen, setOpen] = useState(false);
        const handleBlur = useCallback(() => {
            setOpen(false);
            setSelectedItem(undefined);
        }, []);

        return (
            <StyledRoot
                id={id}
                $size="m"
                $disabled={disabled}
                $isContentRight={hasItems}
                $isHelper={Boolean(helperText)}
                status={status}
                className={className}
                style={style}
            >
                <SelectDropdown
                    id={id ? `${id}-popup` : undefined}
                    items={items}
                    onToggle={setOpen}
                    trigger="click"
                    placement="bottom"
                    listId={id ? `${id}-listbox` : undefined}
                    multiselect={multiselect}
                    disabled={disabled}
                    onItemClick={onItemClick}
                    onActiveChange={setSelectedItem}
                    disclosure={
                        <StyledButton
                            ref={ref}
                            onBlur={handleBlur}
                            disabled={disabled}
                            status={status}
                            aria-activedescendant={selectedItem}
                            aria-controls={id ? `${id}-listbox` : undefined}
                            aria-expanded={isOpen}
                            aria-haspopup="menu"
                            role="combobox"
                            type="button"
                            hasItems={hasItems}
                            {...rest}
                        >
                            {value && <StyledText>{value}</StyledText>}
                            {placeholder && !value && <StyledPlaceholder>{placeholder}</StyledPlaceholder>}
                            {hasItems && <SelectArrow size="xs" color="inherit" />}
                        </StyledButton>
                    }
                />
                {helperText && <TextFieldHelper>{helperText}</TextFieldHelper>}
            </StyledRoot>
        );
    },
);
