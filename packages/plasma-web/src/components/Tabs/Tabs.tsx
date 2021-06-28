import styled, { css } from 'styled-components';
import {
    Tabs as BaseTabs,
    TabsProps as BaseTabsProps,
    TabItem as BaseTabItem,
    TabItemProps as BaseTabItemProps,
} from '@sberdevices/plasma-core/components/Tabs';
import { accent, secondary, footnote2 } from '@sberdevices/plasma-core';

export interface TabsProps extends BaseTabsProps {}

/**
 * Контейнер вкладок.
 */
export const Tabs = styled(BaseTabs)``;

export interface TabItemProps extends BaseTabItemProps {}

/**
 * Элемент списка, недопустимо импользовать вне компонента Tabs.
 */
export const TabItem = styled(BaseTabItem)`
    ${footnote2};

    /* stylelint-disable-next-line number-max-precision */
    padding: 1rem 1.3125rem;
    height: 3.75rem;

    /* stylelint-disable-next-line number-max-precision */
    box-shadow: inset 0 -0.0625rem 0 rgba(0, 0, 0, 0.16);
    color: ${secondary};

    transition: color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;

    /**
     * Состояние активности
     */
    ${({ isActive }) =>
        isActive &&
        css`
            color: ${accent};
            box-shadow: inset 0 -0.125rem 0 ${accent};
        `}
`;
