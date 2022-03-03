import { ScrollAxis, ScrollAlign } from './types';

/**
 * Подсчет смещения из-за паддингов.
 */
export const getCalculatedOffset = (scrollEl: Element, trackEl: Element, axis: ScrollAxis) => {
    const paddingProp = axis === 'x' ? 'paddingLeft' : 'paddingTop';
    return parseInt(getComputedStyle(scrollEl)[paddingProp], 10) + parseInt(getComputedStyle(trackEl)[paddingProp], 10);
};

const round = (n: number) => Math.round(n * 100) / 100;

/**
 * Получить позицию (слот) айтема в каруселе.
 * Каждый айтем имеет свой слот относительно вьюпорта карусели.
 */
export const getItemSlot = (
    itemIndex: number,
    itemEnd: number,
    itemSize: number,
    scrollStart: number,
    scrollSize: number,
    scrollAlign: ScrollAlign,
    prevIndex = 0,
    offset = 0,
) => {
    /**
     * Граница и центр скролла (видимой части).
     * Смещение + размер.
     */
    const scrollEnd = scrollStart + scrollSize;
    const scrollCenter = scrollStart + scrollSize / 2;
    const itemCenter = itemEnd - itemSize / 2;

    if (scrollAlign === 'center') {
        return round((itemCenter - scrollCenter) / itemSize);
    }
    if (scrollAlign === 'start') {
        return round((itemEnd - itemSize - scrollStart) / itemSize);
    }
    if (scrollAlign === 'end') {
        return round((itemEnd - (scrollSize + scrollStart)) / itemSize);
    }
    if (scrollAlign === 'activeDirection') {
        const prevStart = offset + itemSize * prevIndex;
        const prevEnd = prevStart + itemSize;
        const prevVisible = prevEnd > scrollStart && prevStart < scrollEnd;

        if (!prevVisible) {
            if (prevIndex < itemIndex) {
                return round((itemEnd - (scrollSize + scrollStart)) / itemSize);
            }
            return round((itemEnd - itemSize - scrollStart) / itemSize);
        }
    }
    return null;
};
