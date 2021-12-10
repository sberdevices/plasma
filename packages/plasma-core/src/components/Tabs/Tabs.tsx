import React from 'react';
import styled, { css } from 'styled-components';

import { applyDisabled } from '../../mixins';
import type { DisabledProps } from '../../mixins';
import type { AsProps } from '../../types';

import { StyledTabItem } from './TabItem';

export interface TabsProps extends AsProps, DisabledProps, React.HTMLAttributes<HTMLDivElement> {
    /**
     * Кнопки табов примут фиксированную ширину,
     * максимально равную 25% контейнера Tabs,
     * в количестве, максимально равном 4
     */
    stretch?: boolean;
}

export const StyledTabs = styled.div<TabsProps>`
    position: relative;
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    flex-wrap: nowrap;
    justify-content: stretch;

    padding: 0;
    margin: 0;
    width: max-content;

    list-style-type: none;
    user-select: none;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    ${({ stretch = false }) =>
        !stretch &&
        css`
            margin: 0 var(--tabs-margin);
        `}
`;

export const StyledWrapper = styled.div<TabsProps>`
    overflow-x: auto;

    margin-left: calc(var(--tab-focus-border-size) * -1);
    margin-top: calc(var(--tab-focus-border-size) * -2);
    padding: var(--tab-focus-border-size);
    transform: translateY(var(--tab-focus-border-size));

    &::-webkit-scrollbar {
        display: none;
    }

    ${StyledTabs} {
        ${applyDisabled}
    }

    /**
     * Стили айтемов, зависимые от модификаторов контейнера, определяем тут.
     */
    ${({ stretch }) =>
        stretch &&
        css`
            width: 100%;

            ${StyledTabs} {
                width: 100%;
            }

            /**
             * Айтемы помещаются максимум по 4 штуки в контейнер,
             * а при минимальном количестве занимают максимум половину ширины.
             */
            ${StyledTabItem} {
                min-width: 25%;
                max-width: 50%;
                width: 100%;
            }
        `}

    ${({ stretch = false }) =>
        !stretch &&
        css`
            margin-left: calc(var(--tabs-margin) * -1 + var(--tab-focus-border-size) * -1);
            margin-right: calc(var(--tabs-margin) * -1);
        `}

    ${StyledTabItem} {
        ${({ disabled }) =>
            disabled &&
            css`
                cursor: not-allowed;
            `}
    }
`;

/**
 * Контейнер вкладок.
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
    ({ role = 'tablist', as, children, stretch, ...rest }, ref) => (
        <StyledWrapper stretch={stretch} {...rest}>
            <StyledTabs as={as} ref={ref} role={role} stretch={stretch}>
                {children}
            </StyledTabs>
        </StyledWrapper>
    ),
);
