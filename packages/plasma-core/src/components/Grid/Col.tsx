import React from 'react';
import styled from 'styled-components';

import type { Breakpoint } from '../../utils';

type IntCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type FltCount = 1.5 | 2.5 | 3.5 | 4.5 | 5.5 | 6.5 | 7.5 | 8.5 | 9.5 | 10.5 | 11.5;
export type ColCount = IntCount | FltCount;

export interface ColSizeProps {
    /**
     * Размер ячейки при разрешении S
     */
    sizeS?: ColCount;
    /**
     * Размер ячейки при разрешении M
     */
    sizeM?: ColCount;
    /**
     * Размер ячейки при разрешении L
     */
    sizeL?: ColCount;
    /**
     * Размер ячейки при разрешении XL
     */
    sizeXL?: ColCount;
}

export interface ColOffsetProps {
    /**
     * Отступ ячейки при разрешении S
     */
    offsetS?: ColCount;
    /**
     * Отступ ячейки при разрешении M
     */
    offsetM?: ColCount;
    /**
     * Отступ ячейки при разрешении L
     */
    offsetL?: ColCount;
    /**
     * Отступ ячейки при разрешении XL
     */
    offsetXL?: ColCount;
}

export const sizes: Record<Breakpoint, keyof ColSizeProps> = {
    S: 'sizeS',
    M: 'sizeM',
    L: 'sizeL',
    XL: 'sizeXL',
};

export const offsets: Record<Breakpoint, keyof ColOffsetProps> = {
    S: 'offsetS',
    M: 'offsetM',
    L: 'offsetL',
    XL: 'offsetXL',
};

export interface ColProps extends ColSizeProps, ColOffsetProps, React.HTMLAttributes<HTMLDivElement> {
    /**
     * Размер ячейки, зависящий от максимального количества столбцов
     */
    size?: ColCount;
    /**
     * Отступ ячейки, сдвинет ее на n ячеек вправо
     */
    offset?: ColCount;
}

/**
 * Блок для размещения контента или строк (``Row``) внутри себя.
 */
export const Col = styled.div`
    box-sizing: border-box;

    padding-left: var(--plasma-grid-gutter);
    padding-right: var(--plasma-grid-gutter);
`;
