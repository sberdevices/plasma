import React from 'react';
import styled, { css } from 'styled-components';
import {
    surfaceLiquid01,
    blackSecondary,
    transparent,
    button1,
    button2,
    scalingPixelBasis,
} from '@sberdevices/plasma-tokens';

import { addFocus, FocusProps, OutlinedProps } from '../../mixins/addFocus';
import { applyDisabled, DisabledProps } from '../../mixins/applyDisabled';
import { applyInteraction, InteractionProps } from '../../mixins/applyInteraction';
import { ShiftProps } from '../../types';

import { StyledTabItem } from './TabItem';

/**
 * Размеры для контейнера и айтемов (в css vars).
 * Паддинги айтемов дополнительно обыгрываются в TabItem.
 * Так нужно поступать, потому что у айтемов есть своя логика паддингов,
 * а размеры (свойство size) задаются через компонент Tabs.
 */
const sizes = {
    l: (fixedWidth: boolean) => css`
        --tabs-shifting: -${((fixedWidth ? 12 : 24) + 2) / scalingPixelBasis}rem;
        --tab-item-padding-x: ${(fixedWidth ? 12 : 24) / scalingPixelBasis}rem;
        --tab-item-padding-y: 0.875rem;
        --tab-item-padding-y-reduced: 0.75rem;
        --tab-item-height: 3rem;
        --tab-item-border-radius: 1rem;
        height: 3.25rem;
        border-radius: 1.125rem;
        ${button1};
    `,
    m: (fixedWidth: boolean) => css`
        --tabs-shifting: -${((fixedWidth ? 12 : 20) + 2) / scalingPixelBasis}rem;
        --tab-item-padding-x: ${(fixedWidth ? 12 : 20) / scalingPixelBasis}rem;
        --tab-item-padding-y: 0.75rem;
        --tab-item-padding-y-reduced: 0.5rem;
        --tab-item-height: 2.5rem;
        --tab-item-border-radius: 0.75rem;
        height: 2.75rem;
        border-radius: 0.875rem;
        ${button2};
    `,
    s: (fixedWidth: boolean) => css`
        --tabs-shifting: -${((fixedWidth ? 10 : 16) + 2) / scalingPixelBasis}rem;
        --tab-item-padding-x: ${(fixedWidth ? 10 : 16) / scalingPixelBasis}rem;
        --tab-item-padding-y: 0.625rem;
        --tab-item-padding-y-reduced: 0.375rem;
        --tab-item-height: 2.25rem;
        --tab-item-border-radius: 0.75rem;
        height: 2.5rem;
        border-radius: 0.875rem;
        ${button2};
    `,
};
const outlineSizes = {
    l: {
        radius: '1.125rem',
    },
    m: {
        radius: '0.875rem',
    },
    s: {
        radius: '0.875rem',
    },
};

/**
 * Цвета контейнера.
 */
const views = {
    secondary: surfaceLiquid01,
    index: blackSecondary,
    clear: transparent,
};

export type TabsView = keyof typeof views;
export type TabsSize = keyof typeof sizes;

interface StyledTabsProps extends InteractionProps, FocusProps, OutlinedProps, DisabledProps, ShiftProps {
    $size: TabsSize;
    $view: TabsView;
    $fixedWidth: boolean;
    $pilled: boolean;
    $scaleOnPress?: boolean;
}

/**
 * Миксин для фокуса
 */
const applyFocus = ({ $size, $pilled, focused, outlined }: StyledTabsProps) => css`
    ${addFocus({
        focused,
        outlined,
        outlineRadius: $pilled ? '6.375rem' : outlineSizes[$size].radius,
    })}
`;

const StyledTabs = styled.ul<StyledTabsProps>`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    flex-wrap: nowrap;
    justify-content: stretch;

    margin: 0;
    padding: 0.125rem 0;
    width: max-content;

    list-style-type: none;
    user-select: none;

    background-color: ${({ $view }) => views[$view]};
    transition: background-color 0.3s ease-in-out, transform 0.1s ease-in-out;

    ${({ $size, $fixedWidth, shiftLeft, shiftRight }) =>
        css`
            ${sizes[$size]($fixedWidth)};

            ${shiftLeft &&
            css`
                margin-left: var(--tabs-shifting);
            `}

            ${shiftRight &&
            css`
                margin-right: var(--tabs-shifting);
            `}
        `};

    /**
     * Стили айтемов, зависимые от модификаторов контейнера, определяем тут.
     */
    ${({ $fixedWidth }) =>
        $fixedWidth &&
        css`
            width: 100%;

            /**
             * Айтемы помещаются максимум по 4 штуки в контейнер,
             * а при минимальном количестве занимают максимум половину ширины.
             */
            & ${StyledTabItem} {
                min-width: calc(25% - 0.25rem);
                max-width: calc(50% - 0.25rem);
                width: 100%;
            }
        `}

    ${({ $pilled }) =>
        $pilled &&
        css`
            border-radius: 6.25rem;

            & ${StyledTabItem} {
                border-radius: 6.25rem;
            }
        `}

    & ${StyledTabItem} {
        ${applyFocus}
        ${applyDisabled}
        ${applyInteraction}

        margin-left: 0.125rem;
        margin-right: 0.125rem;
    }
`;

export interface TabsProps
    extends FocusProps,
        OutlinedProps,
        DisabledProps,
        ShiftProps,
        Pick<InteractionProps, 'scaleOnPress'>,
        React.HTMLAttributes<HTMLUListElement> {
    /**
     * Размер компонента
     */
    size?: TabsSize;
    /**
     * Вид компонента
     */
    view?: TabsView;
    /**
     * Кнопки табов примут фиксированную ширину,
     * максимально равную 25% контейнера Tabs,
     * в количестве, максимально равном 4
     */
    fixedWidth?: boolean;
    /**
     * Кнопки табов и контейнер примут вид скругленных "капсул"
     */
    pilled?: boolean;
}

/**
 * Контейнер вкладок.
 */
export const Tabs: React.FC<TabsProps> = ({
    size = 'l',
    view = 'secondary',
    fixedWidth = false,
    pilled = false,
    scaleOnPress = true,
    children,
    ...rest
}) => (
    <StyledTabs
        $size={size}
        $view={view}
        $fixedWidth={fixedWidth}
        $pilled={pilled}
        scaleOnPress={scaleOnPress}
        {...rest}
    >
        {children}
    </StyledTabs>
);
