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
import { SelectDropdown, SelectArrow } from '@sberdevices/plasma-web';
import type { SelectViewProps, SelectRefElement } from '@sberdevices/plasma-web';

import { SelectGroup } from './SelectGroup';

const statuses = {
    success,
    warning,
    error: critical,
};

const StyledArrow = styled(SelectArrow)`
    margin-left: 0.75rem;
    color: ${primary};

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
    hasItems?: boolean;
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
    --plasma-dropdown-padding: 0.125rem;
    --plasma-dropdown-border-radius: 0.875rem;
    --plasma-dropdown-item-height: 2.75rem;
    --plasma-dropdown-item-padding: 0.875rem;
    --plasma-dropdown-item-border-radius: 0.75rem;
    --plasma-dropdown-item-font-size: ${button2.fontSize};
    --plasma-dropdown-item-font-weight: ${button2.fontWeight};
    --plasma-dropdown-item-line-height: ${button2.lineHeight};
    --plasma-dropdown-item-letter-spacing: ${button2.letterSpacing};

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
                <SelectDropdown
                    items={items}
                    trigger="click"
                    placement="bottom"
                    onItemClick={onItemClick}
                    disclosure={
                        <StyledButton
                            ref={ref}
                            disabled={disabled}
                            status={status}
                            type="button"
                            hasItems={hasItems}
                            {...rest}
                        >
                            {value && <StyledText>{value}</StyledText>}
                            {placeholder && !value && <StyledPlaceholder>{placeholder}</StyledPlaceholder>}
                            {hasItems && <StyledArrow size="xs" color="inherit" />}
                        </StyledButton>
                    }
                />
                {helperText && <TextFieldHelper status={status}>{helperText}</TextFieldHelper>}
            </StyledRoot>
        );
    },
);
