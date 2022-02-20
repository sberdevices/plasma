import React, { FC, ReactNode, useRef, useCallback, useMemo } from 'react';
import styled, { css } from 'styled-components';
import {
    body1,
    accent,
    primary,
    surfaceLiquid02,
    surfaceLiquid03,
    applyDisabled,
    applyEllipsis,
} from '@sberdevices/plasma-core';
import { IconChevronRight, IconDone } from '@sberdevices/plasma-icons';

import { DropdownItem as DropdownItemType, DropdownNode as DropdownNodeType } from './Dropdown.types';

export interface DropdownItemProps
    extends DropdownNodeType,
        Omit<
            React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
            'onClick' | 'ref'
        > {
    isActive?: boolean;
    isHovered?: boolean;
    color?: string;
    contentLeft?: ReactNode;
    onClick?: (item: DropdownItemType) => void;
    onHover?: () => void;
    onFocus?: () => void;
    multiselect?: boolean;
}

const StyledDropdownItem = styled.a<{ isHovered?: boolean; $disabled?: boolean; $color?: string }>`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;

    text-decoration: none;

    height: var(--plasma-dropdown-item-height, 3rem);
    padding: var(--plasma-dropdown-item-padding, 1rem);
    border-radius: var(--plasma-dropdown-item-border-radius, 0);

    font-family: var(--plasma-dropdown-item-font-family, ${body1.fontFamily});
    font-size: var(--plasma-dropdown-item-font-size, ${body1.fontSize});
    font-weight: var(--plasma-dropdown-item-font-weight, ${body1.fontWeight});
    line-height: var(--plasma-dropdown-item-line-height, ${body1.lineHeight});
    letter-spacing: var(--plasma-dropdown-item-letter-spacing, ${body1.letterSpacing});

    background-color: transparent;
    color: ${({ $color }) => $color || primary};
    transition: background-color 0.3s ease-in-out;
    cursor: pointer;

    /* stylelint-disable-next-line selector-nested-pattern */
    &:hover,
    &:focus {
        color: ${({ $color }) => $color || primary};
        background-color: ${surfaceLiquid02};
    }

    ${({ isHovered, $color }) =>
        isHovered &&
        css`
            color: ${() => $color || primary};
            background-color: ${surfaceLiquid02};
        `}

    &:active {
        background-color: ${surfaceLiquid03};
    }

    ${({ $disabled }) =>
        $disabled &&
        css`
            &,
            &:hover,
            &:focus,
            &:active {
                background-color: transparent;
            }
        `}
    ${applyDisabled}
`;
const StyledContent = styled.div`
    display: inline-flex;
    margin-right: 0.375rem;
`;
const StyledText = styled.span`
    ${applyEllipsis}

    margin-right: 0.625rem;
    pointer-events: none;
    user-select: none;
`;
const StyledChevron = styled(IconChevronRight)`
    margin-left: auto;
    pointer-events: none;
    margin-right: -0.25rem;
`;
const StyledCheck = styled(IconDone)`
    margin-left: auto;
    pointer-events: none;
    margin-right: -0.5rem;
`;
const StyledDot = styled.div`
    width: 0.375rem;
    height: 0.375rem;

    background-color: ${accent};
    border-radius: 50%;
`;

/**
 * Элемент выпадающего списка.
 */
export const DropdownItem: FC<DropdownItemProps> = ({
    value,
    label,
    isActive,
    isDisabled,
    isHovered,
    color,
    contentLeft,
    items = [],
    onClick: onClickExternal,
    onHover,
    onFocus,
    multiselect,
    ...rest
}) => {
    const itemRef = useRef<HTMLAnchorElement>(null);
    const hasItems = Boolean(items.length);
    const isActiveNode = Boolean(isActive || items.filter((item) => item.isActive)?.length);
    const contentRight = useMemo(() => {
        if (hasItems) {
            return (
                <>
                    {isActiveNode && <StyledDot />}
                    <StyledChevron size="xs" />
                </>
            );
        }

        if (isActive) {
            return <StyledCheck size="s" color={accent} />;
        }

        return null;
    }, [isActive, isActiveNode, hasItems]);

    const onClick = useCallback(
        (event) => {
            event.preventDefault();

            const targetIsItem = event.target === itemRef.current;
            const targetInItem = itemRef.current?.contains(event.target);

            if (value !== undefined && !isDisabled && (targetIsItem || targetInItem)) {
                onClickExternal?.({ value, label });
            }
        },
        [value, label, isDisabled, onClickExternal],
    );

    return (
        <StyledDropdownItem
            isHovered={isHovered}
            ref={itemRef}
            $disabled={isDisabled}
            $color={color}
            onClick={onClick}
            role={multiselect ? 'menuitemcheckbox' : 'menuitemradio'}
            aria-checked={isActiveNode}
            aria-label={label}
            onMouseOver={onHover}
            onFocus={onFocus}
            {...rest}
        >
            {contentLeft && <StyledContent>{contentLeft}</StyledContent>}
            {label && <StyledText>{label}</StyledText>}
            {contentRight}
        </StyledDropdownItem>
    );
};
