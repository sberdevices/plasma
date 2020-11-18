import React from 'react';
import styled, { css } from 'styled-components';
import { surfaceLiquid03, scalingPixelBasis } from '@sberdevices/plasma-tokens';

interface StyledTabsProps {
    isActive?: boolean;
    isChildren?: boolean;
    isContentLeft?: boolean;
}

/**
 * Этот спан нужен для сокращения
 * текстового контента и отступов.
 */
const StyledTabItemText = styled.span`
    display: inline;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

/**
 * Без этого спана баг - контент (например, иконка)
 * сжимался в угоду текстового контента,
 * при чем ширина иконки игнорируется.
 */
const StyledTabItemContentLeft = styled.span`
    display: flex;
`;

/**
 * Определенные на компоненте Tabs css vars испольуем тут,
 * потому что у айтемов нет свойства size,
 * чтобы не приходилось передавать кучу пропсов
 * на компонентах контейнере (Tabs) и элементах (TabItem).
 */
export const StyledTabItem = styled.li<StyledTabsProps>`
    align-items: center;
    box-sizing: border-box;
    display: flex;
    justify-content: center;

    height: var(--tab-item-height);
    padding: var(--tab-item-padding-y) var(--tab-item-padding-x);
    border-radius: var(--tab-item-border-radius);

    font: inherit;
    letter-spacing: inherit;
    text-align: center;

    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:focus {
        outline: 0 none;
    }

    ${({ isActive }) =>
        isActive &&
        css`
            background-color: ${surfaceLiquid03};
        `}

    /**
     * Не передали контент => квадратная кнопка.
     */
    ${({ isChildren }) =>
        !isChildren &&
        css`
            width: var(--tab-item-height);
            padding-left: 0;
            padding-right: 0;
        `}

    /**
     * Для центрирования иконки, нужно уменьшить вертикальные паддинги.
     */
    ${({ isContentLeft }) =>
        isContentLeft &&
        css`
            padding-top: var(--tab-item-padding-y-reduced);
            padding-bottom: var(--tab-item-padding-y-reduced);

            & ${StyledTabItemText} {
                margin-left: ${6 / scalingPixelBasis}rem;
            }
        `}
`;

export interface TabItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    /**
     * Активность элемента списка
     */
    isActive?: boolean;
    /**
     * Слот для контента слева, например <Icon/>
     */
    contentLeft?: React.ReactNode;
    onFocus?: React.FocusEventHandler<HTMLLIElement>;
    onBlur?: React.FocusEventHandler<HTMLLIElement>;
    onClick?: React.MouseEventHandler<HTMLLIElement>;
}

/**
 * Элемент списка, недопустимо импользовать вне компонента Tabs.
 */
export const TabItem: React.FC<TabItemProps> = ({ children, contentLeft, ...rest }) => (
    <StyledTabItem isChildren={!!children} isContentLeft={!!contentLeft} {...rest}>
        {contentLeft && <StyledTabItemContentLeft>{contentLeft}</StyledTabItemContentLeft>}
        {children && <StyledTabItemText>{children}</StyledTabItemText>}
    </StyledTabItem>
);
