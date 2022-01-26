import { useEffect, useRef } from 'react';

import { PickerSize } from './types';

interface PickerItemScale {
    /**
     * Размер (transform: scale) при slot = 0, 1, 2.
     */
    scale: number[];
    /**
     * Коэффициент смещения по oY.
     */
    offset: number;
    /**
     * Высота элемента.
     */
    height: number;
}

const sizes: Record<PickerSize, PickerItemScale> = {
    l: {
        scale: [1, 0.8, 0.8],
        offset: -0.15,
        height: 5,
    },
    s: {
        scale: [1, 0.75, 0.5],
        offset: 0.35,
        height: 2.875,
    },
    xs: {
        scale: [1, 0.8334, 0.5834],
        offset: 0.35,
        height: 2.05,
    },
};

const round = (n: number) => Math.round(n * 100) / 100;

// 0 - Infinity
const MAX_SLOT = 3;
// 0 - 1
const FULL_OPACITY = 1;
const NONE_OPACITY = 0;

export function getOpacity(slot: number) {
    const absoluteSlot = Math.abs(slot);
    const ceilSlot = Math.ceil(absoluteSlot) || 1; // Ячейка, в которую перемещается элемент

    // Сколько осталось от размера ячкейки, чтобы элемент занял ее полностью (от 1 до 0)
    const progSlot = ceilSlot - absoluteSlot;

    if (absoluteSlot <= 1) {
        const opacityRangeSize = FULL_OPACITY - NONE_OPACITY;
        const opacity = NONE_OPACITY + progSlot * opacityRangeSize;
        return round(opacity);
    }
    return NONE_OPACITY;
}

export function getOffset(slot: number, size: PickerSize) {
    const absoluteSlot = Math.abs(slot);
    const ceilSlot = Math.ceil(absoluteSlot) || 1; // Ячейка, в которую перемещается элемент

    // Сколько осталось от размера ячкейки, чтобы элемент занял ее полностью (от 1 до 0)
    const progSlot = ceilSlot - absoluteSlot;

    const shift = (sizes[size].offset * sizes[size].height) / 2;

    // От середины до 1 ячейки
    if (absoluteSlot <= 1) {
        return round(slot * shift) || 0;
    }

    // От 1 ячейки до 2
    if (absoluteSlot <= 2) {
        return round(progSlot * shift * Math.sign(slot));
    }

    // От 2 ячейки
    return round(((absoluteSlot - 2) / (ceilSlot - 2)) * Math.sign(slot) * -1 * Math.abs(sizes[size].height));
}

export function getScale(slot: number, size: PickerSize) {
    const absoluteSlot = Math.abs(slot);
    const ceilSlot = Math.ceil(absoluteSlot) || 1; // Ячейка, в которую перемещается элемент

    // Сколько осталось от размера ячкейки, чтобы элемент занял ее полностью (от 1 до 0)
    const progSlot = ceilSlot - absoluteSlot;

    // От середины до 1 ячейки
    if (absoluteSlot <= 1) {
        return round(progSlot * (sizes[size].scale[0] - sizes[size].scale[1]) + sizes[size].scale[1]);
    }

    // От 1 ячейки до 2
    if (absoluteSlot <= 2) {
        return round(progSlot * (sizes[size].scale[1] - sizes[size].scale[2]) + sizes[size].scale[2]);
    }

    // От 2 ячейки
    return round(progSlot * sizes[size].scale[2]);
}

/**
 * Абстрактный просчет стилей в зависимости от слота,
 * не основываясь на реальном элементе списка.
 */
export const getStyles = (slot: number, size: PickerSize) => {
    const normalizedSlot = Math.min(Math.abs(slot), MAX_SLOT) * Math.sign(slot);
    const opacity = getOpacity(normalizedSlot);
    const offset = getOffset(normalizedSlot, size);
    const scale = getScale(normalizedSlot, size);

    return {
        wrapper: {
            /*
             * Размер плавно уменьшается с увеличением значения slot
             */
            transform: `scale(${scale}) translate3d(0,${offset}rem,0)`,
        },
        text: {
            /*
             * Непрозрачность уменьшается с увеличением значения slot
             */
            opacity: `${1 - opacity}`,
        },
        whiteText: {
            /*
             * Непрозрачность увеличивается с увеличением значения slot
             */
            opacity: `${opacity}`,
        },
    };
};

/**
 * Малый размер => большой размер
 * Серый текст => белый текст
 */
const scaleCallback = (size: PickerSize) => (itemEl: HTMLElement, slot: number) => {
    const styles = getStyles(slot, size);

    if (itemEl.children[0] instanceof HTMLElement) {
        const wrapper = itemEl.children[0];
        wrapper.style.transform = styles.wrapper.transform;

        /**
         * Серый текст
         */
        if (wrapper.children[0] instanceof HTMLElement) {
            wrapper.children[0].style.opacity = styles.text.opacity;
        }
        /**
         * Белый текст
         */
        if (wrapper.children[1] instanceof HTMLElement) {
            wrapper.children[1].style.opacity = styles.whiteText.opacity;
        }
    }
};

export const scaleCallbacks = {
    l: scaleCallback('l'),
    s: scaleCallback('s'),
    xs: scaleCallback('xs'),
};

/**
 * Сброс стилей
 */
export const scaleResetCallback = (itemEl: HTMLElement) => {
    if (itemEl.children[0] instanceof HTMLElement) {
        const transformable = itemEl.children[0];
        transformable.style.transform = '';

        if (transformable.children[0] instanceof HTMLElement) {
            transformable.children[0].style.opacity = '';
        }
        if (transformable.children[1] instanceof HTMLElement) {
            transformable.children[1].style.opacity = '';
        }
    }
};

/**
 * Вернет массив с временными компонентами переданной даты.
 */
export const getTimeValues = (date: Date) => [date.getHours(), date.getMinutes(), date.getSeconds()] as const;

/**
 * Вернет массив компонентами даты.
 */
export const getDateValues = (date: Date) => [date.getFullYear(), date.getMonth(), date.getDate()] as const;

/**
 * Проверит, изменился ли массив
 */
export const isChanged = (oldValues: readonly number[], newValues: readonly number[]) => {
    if (oldValues === newValues) {
        return false;
    }

    if (oldValues.length !== newValues.length) {
        return true;
    }

    for (let i = 0; i < oldValues.length; i++) {
        if (oldValues[i] !== newValues[i]) {
            return true;
        }
    }

    return false;
};

/**
 * Вернёт нормализованные значения в заданных пределах
 */
export const getNormalizeValues = (
    getValues: (date: Date) => readonly [number, number, number],
    getSeconds: (values: readonly [number, number, number]) => number,
) => (current: Date, min: Date, max: Date) => {
    const curValues = getValues(current);
    const minValues = getValues(min);
    const maxValues = getValues(max);

    const curSeconds = getSeconds(curValues);
    const minSeconds = getSeconds(minValues);
    const maxSeconds = getSeconds(maxValues);

    if (curSeconds < minSeconds) {
        return minValues;
    }

    if (curSeconds > maxSeconds) {
        return maxValues;
    }

    return curValues;
};

/**
 * Хук для сохранения предыдущего значения
 */
export const usePreviousValue = (value: string | number | Date) => {
    const ref = useRef<string | number | Date>();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
};
