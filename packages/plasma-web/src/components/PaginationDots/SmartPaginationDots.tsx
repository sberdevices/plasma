import React from 'react';
import { usePaginationDots, SmartPaginationDotsProps as BaseProps } from '@sberdevices/plasma-core';

import { PaginationDots } from './PaginationDots';
import { PaginationDot } from './PaginationDot';

export interface SmartPaginationDotsProps extends BaseProps, React.HTMLAttributes<HTMLUListElement> {
    /**
     * Обработчик изменения индекса
     */
    onIndexChange?: (index: number) => void;
}

/**
 * Компонент для отображения точек пагинации
 * с возможностью ограничения количества видимых элементов.
 */
export const SmartPaginationDots: React.FC<SmartPaginationDotsProps> = ({
    items,
    index,
    visibleItems,
    onIndexChange,
    ...rest
}) => {
    const { sliced, activeId } = usePaginationDots({ items, index, visibleItems });

    return (
        <PaginationDots {...rest}>
            {sliced.map(({ id }, i) => (
                <PaginationDot key={`item:${i}`} isActive={id === activeId} onClick={() => onIndexChange?.(i)} />
            ))}
        </PaginationDots>
    );
};
