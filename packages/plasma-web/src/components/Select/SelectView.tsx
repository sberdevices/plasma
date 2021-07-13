import React, { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import {
    TextFieldRoot,
    TextFieldHelper,
    TextFieldProps as BaseProps,
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
import { IconChevronDown } from '@sberdevices/plasma-icons';

import { inputBorder, inputBorderHover } from '../../tokens';
import { Dropdown, DropdownProps } from '../Dropdown';

export type RefElement = HTMLButtonElement;

export interface SelectViewProps
    extends Pick<BaseProps, 'status' | 'placeholder' | 'helperText' | 'disabled'>,
        Pick<DropdownProps, 'items' | 'onItemClick'>,
        Omit<HTMLAttributes<RefElement>, 'onChange'> {
    value?: string | number | null;
}

const statuses = {
    success,
    warning,
    error: critical,
};

const StyledDropdown = styled(Dropdown)`
    --plasma-dropdown-padding: 0.25rem;
    --plasma-dropdown-border-radius: 0.25rem;
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
    cursor: pointer;

    &:disabled {
        cursor: inherit;
    }

    &:hover:not(:disabled) {
        border-color: ${inputBorderHover};
        color: ${secondary};
    }

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
export const SelectView = React.forwardRef<RefElement, SelectViewProps>(
    ({ placeholder, value, helperText, disabled, status, className, style, items, onItemClick, ...rest }, ref) => {
        const isIcon = Boolean(items && items.length);

        return (
            <TextFieldRoot
                $size="m"
                $disabled={disabled}
                $isContentRight={isIcon}
                $isHelper={Boolean(helperText)}
                status={status}
                className={className}
                style={style}
            >
                <StyledDropdown offsetTop="0.25rem" items={items} onItemClick={onItemClick}>
                    <StyledButton ref={ref} disabled={disabled} status={status} {...rest}>
                        {value && <StyledText>{value}</StyledText>}
                        {placeholder && !value && <StyledPlaceholder>{placeholder}</StyledPlaceholder>}
                        {isIcon && <StyledArrow size="xs" color="inherit" />}
                    </StyledButton>
                </StyledDropdown>
                {helperText && <TextFieldHelper status={status}>{helperText}</TextFieldHelper>}
            </TextFieldRoot>
        );
    },
);
