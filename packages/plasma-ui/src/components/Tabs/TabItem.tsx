import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { TabItem as BaseTabItem, TabItemProps as BaseTabItemProps } from '@sberdevices/plasma-core';
import { button2 } from '@sberdevices/plasma-tokens';
import type { AsProps } from '@sberdevices/plasma-core';

import { useTabsContext } from './TabsContext';
import { StyledSlider, activeItemStyle } from './TabsSlider';

export interface TabItemProps extends AsProps, BaseTabItemProps {
    hasAnimation?: boolean;
}

export const StyledTabItem = styled(BaseTabItem)`
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
    * При нажатии слайдер также прожимается
    */
    &:active ~ ${StyledSlider} {
        transform: scale(0.96);
    }

    /**
    * Если анимация отключена
    */
    ${({ hasAnimation, isActive }) =>
        !hasAnimation &&
        isActive &&
        css`
            ${activeItemStyle}
        `}
`;

/**
 * Элемент списка, недопустимо импользовать вне компонента Tabs.
 */
export const TabItem: React.FC<TabItemProps> = ({ children, ...rest }) => {
    const itemRef = useRef<HTMLElement>(null);
    const { refs, hasAnimation } = useTabsContext();

    useEffect(() => {
        refs?.register(itemRef);
        return () => refs?.unregister(itemRef);
    }, [refs]);

    return (
        <StyledTabItem ref={itemRef} hasAnimation={hasAnimation} {...rest}>
            {children}
        </StyledTabItem>
    );
};
