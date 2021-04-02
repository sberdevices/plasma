import React from 'react';
import styled, { css } from 'styled-components';

import { applyDisabled } from '../../mixins';
import type { DisabledProps } from '../../mixins';

export interface TabsProps extends DisabledProps {
    /**
     * Кнопки табов примут фиксированную ширину,
     * максимально равную 25% контейнера Tabs,
     * в количестве, максимально равном 4
     */
    stretch?: boolean;
}

/**
 * Контейнер вкладок.
 */
export const Tabs = styled.ul<TabsProps>`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    flex-wrap: nowrap;
    justify-content: stretch;

    margin: 0;
    padding: 0;
    width: max-content;

    list-style-type: none;
    user-select: none;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    /**
     * Стили айтемов, зависимые от модификаторов контейнера, определяем тут.
     */
    ${({ stretch }) =>
        stretch &&
        css`
            width: 100%;

            /**
             * Айтемы помещаются максимум по 4 штуки в контейнер,
             * а при минимальном количестве занимают максимум половину ширины.
             */
            & > * {
                min-width: 25%;
                max-width: 50%;
                width: 100%;
            }
        `}

    /* stylelint-disable-next-line selector-max-universal */
    & > * {
        ${applyDisabled}
    }
`;

interface StyledTabItemProps {
    isActive?: boolean;
    isChildren?: boolean;
    isContentLeft?: boolean;
}

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
 * Без этого спана баг - контент (например, иконка)
 * сжимался в угоду текстового контента,
 * при чем ширина иконки игнорируется.
 */
const StyledTabItemContentLeft = styled.span`
    display: flex;
`;

/**
 * Этот спан нужен для сокращения
 * текстового контента и отступов.
 */
const StyledTabItemText = styled.span`
    display: inline;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    /* stylelint-disable-next-line */
    ${StyledTabItemContentLeft} ~ & {
        margin-left: 0.375rem;
    }
`;

const StyledTabItem = styled.li<StyledTabItemProps>`
    align-items: center;
    box-sizing: border-box;
    display: flex;
    justify-content: center;

    letter-spacing: inherit;
    text-align: center;

    cursor: pointer;

    &:focus {
        outline: 0 none;
    }

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
        `}
`;

/**
 * Элемент списка, недопустимо импользовать вне компонента Tabs.
 */
export const TabItem: React.FC<TabItemProps> = ({ children, contentLeft, ...rest }) => (
    <StyledTabItem isChildren={!!children} isContentLeft={!!contentLeft} {...rest}>
        {contentLeft && <StyledTabItemContentLeft>{contentLeft}</StyledTabItemContentLeft>}
        {children && <StyledTabItemText>{children}</StyledTabItemText>}
    </StyledTabItem>
);
