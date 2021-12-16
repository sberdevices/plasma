import styled, { css } from 'styled-components';
import { Tabs as BaseTabs, surfaceLiquid01 } from '@sberdevices/plasma-core';
import type { TabsProps as BaseTabsProps } from '@sberdevices/plasma-core';

export interface TabsProps extends BaseTabsProps {
    /**
     * Вид компонента.
     */
    view?: 'secondary' | 'clear';
    /**
     * Кнопки табов и контейнер примут вид скругленных "капсул".
     */
    pilled?: boolean;
    /**
     * Размер компонента. По умолчанию 'l'
     */
    size?: 'l' | 's';
}

const sizes = {
    l: (stretch: boolean) => css`
        --tabs-height: 3rem;
        --tab-item-padding: ${stretch ? '0.75rem 1.25rem' : '0.75rem 1.75rem'};
    `,
    s: (stretch: boolean) => css`
        --tabs-height: 2.5rem;
        --tab-item-padding: ${stretch ? '0.625rem 0.5rem' : '0.625rem 1rem'};
    `,
};

const views = {
    secondary: css`
        --tabs-padding: 0.125rem;
        --tabs-background-color: ${surfaceLiquid01};
    `,
    clear: css`
        --tabs-padding: 0rem;
        --tabs-background-color: transparent;
    `,
};

/**
 * Контейнер вкладок, основной компонент для пользовательской сборки вкладок.
 */
export const Tabs = styled(BaseTabs)<TabsProps>`
    ${({ view = 'secondary' }) => views[view]}
    ${({ size = 'l', stretch = false }) => sizes[size](stretch)}

    --tabs-border-radius: ${({ pilled }) => (pilled ? '6.25rem' : '0.875rem')};
    --tab-item-height: calc(var(--tabs-height) - var(--tabs-padding) * 2);
    --tab-item-border-radius: calc(var(--tabs-border-radius) - var(--tabs-padding));

    height: var(--tabs-height);
    padding: var(--tabs-padding);

    background-color: var(--tabs-background-color);
    border-radius: var(--tabs-border-radius);
`;
