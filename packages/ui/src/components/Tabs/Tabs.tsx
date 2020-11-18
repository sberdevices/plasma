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

import { addFocus, FocusProps } from '../../mixins/addFocus';
import { applyMotion, MotionProps } from '../../mixins/applyMotion';
import { applyDisabled, DisabledProps } from '../../mixins/applyDisabled';
import { ShiftProps, StylingProps } from '../../types';

import { StyledTabItem } from './TabItem';

/**
 * Размеры в ремах
 */
const padding = `${2 / scalingPixelBasis}rem`;
const pilledRadius = `${100 / scalingPixelBasis}rem`;
const pilledOutlineRadius = `${102 / scalingPixelBasis}rem`;

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
        --tab-item-padding-y: ${14 / scalingPixelBasis}rem;
        --tab-item-padding-y-reduced: ${12 / scalingPixelBasis}rem;
        --tab-item-height: ${48 / scalingPixelBasis}rem;
        --tab-item-border-radius: ${16 / scalingPixelBasis}rem;
        height: ${52 / scalingPixelBasis}rem;
        border-radius: ${18 / scalingPixelBasis}rem;
        ${button1};
    `,
    m: (fixedWidth: boolean) => css`
        --tabs-shifting: -${((fixedWidth ? 12 : 20) + 2) / scalingPixelBasis}rem;
        --tab-item-padding-x: ${(fixedWidth ? 12 : 20) / scalingPixelBasis}rem;
        --tab-item-padding-y: ${12 / scalingPixelBasis}rem;
        --tab-item-padding-y-reduced: ${8 / scalingPixelBasis}rem;
        --tab-item-height: ${40 / scalingPixelBasis}rem;
        --tab-item-border-radius: ${12 / scalingPixelBasis}rem;
        height: ${44 / scalingPixelBasis}rem;
        border-radius: ${14 / scalingPixelBasis}rem;
        ${button2};
    `,
    s: (fixedWidth: boolean) => css`
        --tabs-shifting: -${((fixedWidth ? 10 : 16) + 2) / scalingPixelBasis}rem;
        --tab-item-padding-x: ${(fixedWidth ? 10 : 16) / scalingPixelBasis}rem;
        --tab-item-padding-y: ${10 / scalingPixelBasis}rem;
        --tab-item-padding-y-reduced: ${6 / scalingPixelBasis}rem;
        --tab-item-height: ${36 / scalingPixelBasis}rem;
        --tab-item-border-radius: ${12 / scalingPixelBasis}rem;
        height: ${40 / scalingPixelBasis}rem;
        border-radius: ${14 / scalingPixelBasis}rem;
        ${button2};
    `,
};
const outlineSizes = {
    l: {
        radius: `${18 / scalingPixelBasis}rem`,
    },
    m: {
        radius: `${14 / scalingPixelBasis}rem`,
    },
    s: {
        radius: `${14 / scalingPixelBasis}rem`,
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

interface StyledTabsProps extends FocusProps, MotionProps, DisabledProps, ShiftProps {
    $size: TabsSize;
    $view: TabsView;
    $fixedWidth: boolean;
    $pilled: boolean;
}

/**
 * Миксин для фокуса
 */
const applyFocus = ({ $size, $pilled, focused, outlined }: StyledTabsProps) => css`
    ${addFocus({
        focused,
        outlined,
        outlineRadius: $pilled ? pilledOutlineRadius : outlineSizes[$size].radius,
    })}
`;

const StyledTabs = styled.ul<StyledTabsProps>`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    flex-wrap: nowrap;
    justify-content: stretch;

    margin: 0;
    padding: ${padding};
    width: max-content;

    list-style-type: none;
    user-select: none;

    background-color: ${({ $view }) => views[$view]};

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
                min-width: 25%;
                max-width: 50%;
                width: 100%;
            }
        `}

    ${({ $pilled }) =>
        $pilled &&
        css`
            border-radius: ${pilledRadius};

            & ${StyledTabItem} {
                border-radius: ${pilledRadius};
            }
        `}

    & ${StyledTabItem} {
        ${applyFocus}
        ${applyMotion}
        ${applyDisabled}
    }
`;

export interface TabsProps
    extends React.HTMLAttributes<HTMLUListElement>,
        FocusProps,
        MotionProps,
        DisabledProps,
        ShiftProps,
        StylingProps {
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
 * Основной компонент, контейнер табов.
 */
export const Tabs: React.FC<TabsProps> = ({
    size = 'l',
    view = 'secondary',
    fixedWidth = false,
    pilled = false,
    children,
    ...rest
}) => (
    <StyledTabs $size={size} $view={view} $fixedWidth={fixedWidth} $pilled={pilled} {...rest}>
        {children}
    </StyledTabs>
);
