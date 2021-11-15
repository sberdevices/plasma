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

const StyledTabs = styled.div<TabsProps>`
    ${applyDisabled}

    position: relative;
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

    & > ${StyledTabItem} {
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
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(({ role = 'tablist', ...rest }, ref) => (
    <StyledTabs ref={ref} role={role} {...rest} />
));
