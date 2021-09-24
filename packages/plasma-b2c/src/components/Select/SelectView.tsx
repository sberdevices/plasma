import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import {
    TextFieldRoot,
    TextFieldHelper,
    button2,
    surfaceLiquid01,
    surfaceLiquid02,
    primary,
    accent,
    tertiary,
    success,
    warning,
    critical,
    applyEllipsis,
} from '@sberdevices/plasma-core';
import { IconChevronDown } from '@sberdevices/plasma-icons';
import type { SelectViewProps, SelectRefElement } from '@sberdevices/plasma-web';

import { Dropdown } from '../Dropdown';

import { SelectGroup } from './SelectGroup';

const statuses = {
    success,
    warning,
    error: critical,
};

const StyledDropdown = styled(Dropdown)`
    --plasma-dropdown-padding: 0.125rem;
    --plasma-dropdown-border-radius: 0.875rem;
    --plasma-dropdown-item-height: 2.75rem;
    --plasma-dropdown-item-padding: 0.875rem;
    --plasma-dropdown-item-border-radius: 0.75rem;
    --plasma-dropdown-item-font-size: ${button2.fontSize};
    --plasma-dropdown-item-font-weight: ${button2.fontWeight};
    --plasma-dropdown-item-line-height: ${button2.lineHeight};
    --plasma-dropdown-item-letter-spacing: ${button2.letterSpacing};
    display: flex;
    width: 100%;
`;
const StyledArrow = styled(IconChevronDown)<{ isOpen?: boolean }>`
    margin-left: 0.75rem;
    color: ${primary};
    transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;

    &:hover {
        color: ${accent};
    }

    ${({ isOpen }) =>
        isOpen &&
        css`
            transform: rotate(-180deg);
        `}
`;
const StyledText = styled.span`
    ${applyEllipsis}

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

interface StyledButtonProps extends Pick<SelectViewProps, 'status'> {
    focused?: boolean;
}
const StyledButton = styled.button<StyledButtonProps>`
    ${button2}

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
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:focus {
        outline: 0 none;
    }

    &:disabled {
        cursor: inherit;
    }

    &:hover:not(:disabled),
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
    ${SelectGroup} &:not(:first-child) ${StyledButton} {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    /* stylelint-disable-next-line declaration-block-semicolon-newline-after, rule-empty-line-before */
    ${SelectGroup} &:not(:last-child) ${StyledButton} {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
`;

/**
 * Поле с выпадающим списком.
 */
export const SelectView = React.forwardRef<SelectRefElement, SelectViewProps>(
    ({ placeholder, value, helperText, disabled, status, className, style, items, onItemClick, ...rest }, ref) => {
        const isIcon = Boolean(items && items.length);
        const [isOpen, setIsOpen] = useState(false);
        const onToggle = useCallback((is) => setIsOpen(is), []);

        return (
            <StyledRoot
                $size="m"
                $disabled={disabled}
                $isContentRight={isIcon}
                $isHelper={Boolean(helperText)}
                status={status}
                className={className}
                style={style}
            >
                <StyledDropdown offsetTop="0.125rem" items={items} onItemClick={onItemClick} onToggle={onToggle}>
                    <StyledButton ref={ref} disabled={disabled} status={status} type="button" {...rest}>
                        {value && <StyledText>{value}</StyledText>}
                        {placeholder && !value && <StyledPlaceholder>{placeholder}</StyledPlaceholder>}
                        {isIcon && <StyledArrow size="xs" color="inherit" isOpen={isOpen} />}
                    </StyledButton>
                </StyledDropdown>
                {helperText && <TextFieldHelper status={status}>{helperText}</TextFieldHelper>}
            </StyledRoot>
        );
    },
);
