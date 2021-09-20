import React from 'react';
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
const StyledArrow = styled(IconChevronDown)`
    margin-left: 0.75rem;
    color: ${primary};
    transition: color 0.3s ease-in-out;

    &:hover {
        color: ${accent};
    }
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

/**
 * Поле с выпадающим списком.
 */
export const SelectView = React.forwardRef<SelectRefElement, SelectViewProps>(
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
                <StyledDropdown offsetTop="0.125rem" items={items} onItemClick={onItemClick}>
                    <StyledButton ref={ref} disabled={disabled} status={status} type="button" {...rest}>
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
