import React from 'react';
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
import { IconChevronDown } from '@sberdevices/plasma-icons';

import { inputBorder, inputBorderHover } from '../../tokens';
import { Dropdown } from '../Dropdown';

import type { SelectRefElement, SelectViewProps } from './Select.types';

const statuses = {
    success,
    warning,
    error: critical,
};

const StyledDropdown = styled(Dropdown)`
    --plasma-dropdown-padding: 0.25rem;
    --plasma-dropdown-border-radius: 0.25rem;
    --plasma-dropdown-item-border-radius: 0.25rem;
    display: flex;
    width: 100%;
`;
const StyledArrow = styled(IconChevronDown)`
    margin-left: 0.75rem;
    transition: color 0.3s ease-in-out;
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
    border-radius: var(--plasma-dropdown-border-radius);

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
    ({ placeholder, value, helperText, disabled, status, className, style, items, onItemClick, ...rest }, ref) => {
        const hasItems = Array.isArray(items) && items.length > 0;

        return (
            <TextFieldRoot
                $size="m"
                $disabled={disabled}
                $isContentRight={hasItems}
                $isHelper={Boolean(helperText)}
                status={status}
                className={className}
                style={style}
            >
                <StyledDropdown items={items} onItemClick={onItemClick}>
                    <StyledButton
                        hasItems={hasItems}
                        ref={ref}
                        disabled={disabled}
                        status={status}
                        type="button"
                        {...rest}
                    >
                        {value && <StyledText>{value}</StyledText>}
                        {placeholder && !value && <StyledPlaceholder>{placeholder}</StyledPlaceholder>}
                        {hasItems && <StyledArrow size="xs" color="inherit" />}
                    </StyledButton>
                </StyledDropdown>
                {helperText && <TextFieldHelper status={status}>{helperText}</TextFieldHelper>}
            </TextFieldRoot>
        );
    },
);
