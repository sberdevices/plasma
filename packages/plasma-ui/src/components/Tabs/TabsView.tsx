import styled, { css } from 'styled-components';
import { Tabs as BaseTabs, TabsProps as BaseTabsProps } from '@sberdevices/plasma-core';
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
        --tabs-shifting: -${stretch ? 0.875 : 1.625}rem;
        --tab-item-padding-x: ${stretch ? 0.75 : 1.5}rem;
        --tab-item-padding-y: 0.875rem;
        --tab-item-padding-y-reduced: 0.75rem;
        --tab-item-height: 3rem;
        --tab-item-border-radius: 1rem;
        --plasma-tabs-list-height: 3.25rem;
        --plasma-tabs-list-border-radius: 1.125rem;

        height: 3.5rem;
    `,
    m: (stretch: boolean) => css`
        --tabs-shifting: -${stretch ? 0.875 : 1.375}rem;
        --tab-item-padding-x: ${stretch ? 0.75 : 1.25}rem;
        --tab-item-padding-y: 0.75rem;
        --tab-item-padding-y-reduced: 0.5rem;
        --tab-item-height: 2.5rem;
        --tab-item-border-radius: 0.75rem;
        --plasma-tabs-list-height: 2.75rem;
        --plasma-tabs-list-border-radius: 0.875rem;

        height: 3rem;
    `,
    s: (stretch: boolean) => css`
        --tabs-shifting: -${stretch ? 0.75 : 1.125}rem;
        --tab-item-padding-x: ${stretch ? 0.625 : 1}rem;
        --tab-item-padding-y: 0.625rem;
        --tab-item-padding-y-reduced: 0.375rem;
        --tab-item-height: 2.25rem;
        --tab-item-border-radius: 0.75rem;
        --plasma-tabs-list-height: 2.5rem;
        --plasma-tabs-list-border-radius: 0.875rem;

        height: 2.75rem;
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
    --plasma-tabs-list-background: ${({ view = 'secondary' }) => views[view]};

    padding: 0.125rem;
    margin: -0.125rem;

    &:focus {
        outline: 0 none;
    }

    ${({ size = 'l', stretch = false, shiftLeft, shiftRight }) =>
        css`
            ${sizes[size](stretch)};

            ${
                stretch &&
                css`
                    ${StyledTabItem} {
                        min-width: calc(25% - 0.25rem);
                        max-width: calc(50% - 0.25rem);
                    }
                `
            }

            ${
                shiftLeft &&
                css`
                    margin-left: var(--tabs-shifting);
                `
            }

            ${
                shiftRight &&
                css`
                    margin-right: var(--tabs-shifting);
                `
            }
        `};

    ${({ pilled }) =>
        pilled &&
        css`
            --tab-item-border-radius: 6.25rem;
            border-radius: 6.25rem;
        `}

    ${({ size = 'l' }) => css`
        --tab-item-outline-radius: ${outlineSizes[size].radius};
    `}

    /* stylelint-disable-next-line selector-max-universal */
    ${StyledTabItem} {
        ${applyInteraction};

        margin-left: 0.125rem;
        margin-right: 0.125rem;
    }
`;
