import styled, { css } from 'styled-components';
import {
    TabItem as BaseTabItem,
    TabItemProps as BaseTabItemProps,
    button2,
    surfaceLiquid03,
} from '@sberdevices/plasma-core';
import type { AsProps } from '@sberdevices/plasma-core';

export interface TabItemProps extends AsProps, BaseTabItemProps {
    animated?: boolean;
}

/**
 * Элемент списка, недопустимо импользовать вне компонента Tabs.
 */
export const TabItem = styled(BaseTabItem)<TabItemProps>`
    ${button2};

    height: var(--tab-item-height);
    padding: var(--tab-item-padding);

    border-radius: var(--tab-item-border-radius);
    transition: background-color 0.3s ease-in-out;

    /**
    * Если анимация отключена
    */
    ${({ animated, isActive }) =>
        !animated &&
        isActive &&
        css`
            background-color: ${surfaceLiquid03};
            /* stylelint-disable-next-line number-max-precision */
            box-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.05);
        `}
`;
