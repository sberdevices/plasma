import styled, { css } from 'styled-components';
import {
    Tabs as BaseTabs,
    TabsProps as BaseTabsProps,
    TabItem as BaseTabItem,
    TabItemProps as BaseTabItemProps,
    addFocus,
} from '@sberdevices/plasma-core';
import { button2, surfaceCard, surfaceLiquid01, blackSecondary, transparent } from '@sberdevices/plasma-tokens';
import type { FocusProps, OutlinedProps, ShiftProps } from '@sberdevices/plasma-core';

import { applyInteraction } from '../../mixins';
import type { InteractionProps } from '../../mixins';

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
        height: 3.25rem;
        border-radius: 1.125rem;
    `,
    m: (stretch: boolean) => css`
        --tabs-shifting: -${stretch ? 0.875 : 1.375}rem;
        --tab-item-padding-x: ${stretch ? 0.75 : 1.25}rem;
        --tab-item-padding-y: 0.75rem;
        --tab-item-padding-y-reduced: 0.5rem;
        --tab-item-height: 2.5rem;
        --tab-item-border-radius: 0.75rem;
        height: 2.75rem;
        border-radius: 0.875rem;
    `,
    s: (stretch: boolean) => css`
        --tabs-shifting: -${stretch ? 0.75 : 1.125}rem;
        --tab-item-padding-x: ${stretch ? 0.625 : 1}rem;
        --tab-item-padding-y: 0.625rem;
        --tab-item-padding-y-reduced: 0.375rem;
        --tab-item-height: 2.25rem;
        --tab-item-border-radius: 0.75rem;
        height: 2.5rem;
        border-radius: 0.875rem;
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

export interface TabsProps
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
 * Миксин для фокуса
 */
const applyFocus = ({ size = 'l', pilled, focused, outlined }: TabsProps) => css`
    ${addFocus({
        focused,
        outlined,
        outlineRadius: pilled ? '6.375rem' : outlineSizes[size].radius,
    })}
`;

/**
 * Контейнер вкладок.
 */
export const Tabs = styled(BaseTabs)<TabsProps>`
    padding: 0.125rem 0;

    background-color: ${({ view = 'secondary' }) => views[view]};

    ${({ size = 'l', stretch = false, shiftLeft, shiftRight }) =>
        css`
            ${sizes[size](stretch)};

            ${
                stretch &&
                css`
                    & > * {
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

    /* stylelint-disable-next-line selector-max-universal */
    & > * {
        ${applyFocus};
        ${applyInteraction};

        margin-left: 0.125rem;
        margin-right: 0.125rem;
    }
`;

export interface TabItemProps extends BaseTabItemProps {}

/**
 * Элемент списка, недопустимо импользовать вне компонента Tabs.
 */
export const TabItem = styled(BaseTabItem)`
    ${button2};

    /**
    * Определенные на компоненте Tabs css vars испольуем тут,
    * потому что у айтемов нет свойства size,
    * чтобы не приходилось передавать кучу пропсов
    * на компонентах контейнере (Tabs) и элементах (TabItem).
    */
    height: var(--tab-item-height);
    padding: var(--tab-item-padding-y) var(--tab-item-padding-x);

    border-radius: var(--tab-item-border-radius);
    transition: background-color 0.3s ease-in-out, transform 0.1s ease-in-out;

    /**
    * Состояние активности
    */
    ${({ isActive }) =>
        isActive &&
        css`
            background-color: ${surfaceCard};
            box-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.05);
        `}
`;
