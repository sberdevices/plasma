import { useRef } from 'react';

export interface SmartPaginationDotsProps {
    items: Array<{ id: number | string }>;
    index: number;
    visibleItems?: number;
}

export const usePaginationDots = ({ items, index, visibleItems = 7 }: SmartPaginationDotsProps) => {
    const activeId = items[index].id;
    const prevIndex = useRef<number | null>(null);
    let direction = 0;

    if (prevIndex.current !== null) {
        direction = index > prevIndex.current ? 1 : -1;
    }

    let start: number;
    let end: number;

    if (direction === 1) {
        end = Math.min(Math.max(index + 2, visibleItems), items.length);
        start = Math.max(end - visibleItems, 0);
    } else if (direction === -1) {
        start = Math.min(Math.max(index - 1, 0), items.length - visibleItems);
        end = start + visibleItems;
    } else {
        start = Math.max(index - Math.floor(visibleItems / 2), 0);
        end = Math.min(start + visibleItems, items.length);
        start = end - visibleItems;
    }

    const sliced = items.slice(start, end);

    prevIndex.current = index;

    return {
        sliced,
        activeId,
    };
};
