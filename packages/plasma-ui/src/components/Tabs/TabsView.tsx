import styled, { css } from 'styled-components';
import { Tabs as BaseTabs, TabsProps as BaseTabsProps, StyledTabs } from '@sberdevices/plasma-core';
import { surfaceLiquid01, blackSecondary, transparent } from '@sberdevices/plasma-tokens';
import type { FocusProps, OutlinedProps, ShiftProps } from '@sberdevices/plasma-core';

import { applyInteraction } from '../../mixins';
import type { InteractionProps } from '../../mixins';

import { StyledTabItem } from './TabItem';

/**
 * Размеры для контейнера и айтемов (в css vars).
 * Паддинги айтемов дополнительно обыгрываются в TabItem.
 * Так нужно поступать, потому что у айтемов есть своя логика паддингов,
 * а размеры (свойство size) задаются через компонент Tabs.
 */
const sizes = {
    l: (stretch: boolean) => css`
        --tab-item-padding-x: ${stretch ? 0.75 : 1.5}rem;
        --tab-item-padding-y: 0.875rem;
        --tab-item-padding-y-reduced: 0.75rem;
        --tab-item-height: 3rem;
        --tab-item-border-radius: 1rem;
        height: 3.25rem;
        border-radius: 1.125rem;
    `,
    m: (stretch: boolean) => css`
        --tab-item-padding-x: ${stretch ? 0.75 : 1.25}rem;
        --tab-item-padding-y: 0.75rem;
        --tab-item-padding-y-reduced: 0.5rem;
        --tab-item-height: 2.5rem;
        --tab-item-border-radius: 0.75rem;
        height: 2.75rem;
        border-radius: 0.875rem;
    `,
    s: (stretch: boolean) => css`
        --tab-item-padding-x: ${stretch ? 0.625 : 1}rem;
        --tab-item-padding-y: 0.625rem;
        --tab-item-padding-y-reduced: 0.375rem;
        --tab-item-height: 2.25rem;
        --tab-item-border-radius: 0.75rem;
        height: 2.5rem;
        border-radius: 0.875rem;
    `,
};

const shiftingSizes = {
    l: (stretch: boolean) => `-${stretch ? 0.875 : 1.625}rem`,
    m: (stretch: boolean) => `-${stretch ? 0.875 : 1.375}rem`,
    s: (stretch: boolean) => `-${stretch ? 0.75 : 1.125}rem`,
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
    black: blackSecondary,
    clear: transparent,
};

type TabsView = keyof typeof views;
type TabsSize = keyof typeof sizes;

export interface TabsViewProps
    extends BaseTabsProps,
        FocusProps,
        OutlinedProps,
        ShiftProps,
        Pick<InteractionProps, 'scaleOnPress'> {
    /**
     * Размер компонента
     */
    size?: TabsSize;
    /**
     * Вид компонента
     */
    view?: TabsView;
    /**
     * Кнопки табов и контейнер примут вид скругленных "капсул"
     */
    pilled?: boolean;
}

/**
 * Визуальная составляющая контейнера (списка) вкладок.
 */
export const TabsView = styled(BaseTabs)<TabsViewProps>`
    --tab-focus-border-size: 0.125rem;
    --tabs-margin: var(--plasma-grid-margin, 0rem);

    ${({ size = 'l', stretch = false, shiftLeft, shiftRight }) =>
        css`
            ${
                shiftLeft &&
                css`
                    margin-left: calc(${shiftingSizes[size](stretch)} - var(--tab-focus-border-size) * 2);
                `
            }

            ${
                shiftRight &&
                css`
                    margin-right: ${shiftingSizes[size](stretch)};
                `
            }

            ${
                stretch &&
                css`
                    width: calc(100% + var(--tab-focus-border-size));
                `
            }
        `};

    ${StyledTabs} {
        padding: var(--tab-focus-border-size) 0;

        background-color: ${({ view = 'secondary' }) => views[view]};

        &:focus {
            outline: 0 none;
        }

        ${({ size = 'l', stretch = false }) =>
            css`
                ${sizes[size](stretch)};

                ${stretch &&
                css`
                    width: calc(100% - var(--tab-focus-border-size));

                    & > * {
                        min-width: calc(25% - 0.25rem);
                        max-width: calc(50% - 0.25rem);
                    }
                `}
            `};

        ${({ pilled }) =>
            pilled &&
            css`
                --tab-item-border-radius: 6.25rem;
                border-radius: 6.25rem;
            `}

        ${({ size = 'l', pilled }) => css`
            --tab-item-outline-radius: ${pilled ? '6.375rem' : outlineSizes[size].radius};
        `}

        /* stylelint-disable-next-line selector-max-universal */
        & > ${StyledTabItem} {
            ${(props) => !props.disabled && applyInteraction(props)}

            margin-left: var(--tab-focus-border-size);
            margin-right: var(--tab-focus-border-size);
        }
    }
`;
