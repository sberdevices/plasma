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

const StyledWrapper = styled.div<TabsProps>`
    box-sizing: border-box;
    overflow-x: auto;

    /* stylelint-disable-next-line selector-max-empty-lines, selector-nested-pattern, selector-type-no-unknown */
    ::-webkit-scrollbar {
        display: none;
    }

    ${applyDisabled}

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
            ${StyledTabItem} {
                min-width: 25%;
                max-width: 50%;
                width: 100%;
            }
        `}

    ${StyledTabItem} {
        ${({ disabled }) =>
            disabled &&
            css`
                cursor: not-allowed;
            `}
    }
`;
const StyledTabs = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    flex-wrap: nowrap;
    justify-content: stretch;

    min-width: 100%;
    width: max-content;
    height: var(--plasma-tabs-list-height);
    margin: 0;
    padding: 0;

    background: var(--plasma-tabs-list-background);
    border-radius: var(--plasma-tabs-list-border-radius);

    list-style-type: none;
    user-select: none;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

/**
 * Контейнер вкладок.
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(({ role = 'tablist', as, children, ...rest }, ref) => (
    <StyledWrapper {...rest}>
        <StyledTabs as={as} ref={ref} role={role}>
            {children}
        </StyledTabs>
    </StyledWrapper>
));
