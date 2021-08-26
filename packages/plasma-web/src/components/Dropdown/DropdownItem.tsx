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

export interface DropdownItemProps extends DropdownNodeType {
    isActive?: boolean;
    color?: string;
    contentLeft?: ReactNode;
    onClick?: (item: DropdownItemType) => void;
}

const StyledDropdownItem = styled.a<{ $disabled?: boolean; $color?: string }>`
    ${body1};

    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;

    height: 3rem;
    padding: 0.875rem 1rem;
    border-radius: var(--plasma-dropdown-border-radius, 0);

    background-color: transparent;
    color: ${({ $color }) => $color || primary};
    transition: background-color 0.3s ease-in-out;
    cursor: pointer;

    /* stylelint-disable-next-line selector-nested-pattern */
    &:hover,
    &:focus {
        background-color: ${surfaceLiquid02};
    }

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
const StyledIconSlot = styled.div`
    display: flex;
    justify-content: center;

    width: 1.5rem;
    margin-left: auto;
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
    color,
    contentLeft,
    items = [],
    onClick: onClickExternal,
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
                    <StyledIconSlot>
                        <IconChevronRight size="xs" />
                    </StyledIconSlot>
                </>
            );
        }

        if (isActive) {
            return (
                <StyledIconSlot>
                    <IconDone size="s" color={accent} />
                </StyledIconSlot>
            );
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
        <StyledDropdownItem ref={itemRef} $disabled={isDisabled} $color={color} onClick={onClick} {...rest}>
            {contentLeft && <StyledContent>{contentLeft}</StyledContent>}
            {label && <StyledText>{label}</StyledText>}
            {contentRight}
        </StyledDropdownItem>
    );
};
