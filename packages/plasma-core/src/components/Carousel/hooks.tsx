import { useContext, useRef, useMemo, useEffect, useCallback } from 'react';
import throttle from 'lodash.throttle';

import { useDebouncedFunction } from '../../hooks';

import { CarouselContext } from './CarouselContext';
import { CarouselItemRefs } from './CarouselItemRefs';
import type { BasicProps, DetectionProps } from './types';
import { scrollToPos, getCalculatedPos, getCalculatedOffset, getItemSlot } from './utils';

export const useCarouselContext = () => useContext(CarouselContext);

/**
 * Хук для передачи рефа айтема в контекст карусели.
 */
export function useCarouselItem<T extends HTMLElement | null>() {
    const innerRef = useRef<T>(null);
    const { refs } = useCarouselContext();

    useEffect(() => {
        refs?.register(innerRef);
        return () => refs?.unregister(innerRef);
    }, [refs]);

    return innerRef;
}

const THROTTLE_DEFAULT_MS = 100;
const DEBOUNCE_DEFAULT_MS = 150;

export const useCarousel = ({
    index,
    axis,
    detectActive = false,
    detectThreshold = 0.5,
    scrollAlign = 'center',
    scaleCallback,
    scaleResetCallback,
    onScroll,
    onIndexChange,
    animatedScrollByIndex = false,
    throttleMs = THROTTLE_DEFAULT_MS,
    debounceMs = DEBOUNCE_DEFAULT_MS,
}: BasicProps & Omit<Partial<DetectionProps>, 'detectActive'> & { detectActive?: boolean }) => {
    const prevIndex = useRef<number | null>(null);
    const direction = useRef<boolean | null>(null);
    const offset = useRef(0);
    const refs = useMemo(() => new CarouselItemRefs(), []);
    const scrollRef = useRef<HTMLElement | null>(null);
    const trackRef = useRef<HTMLElement | null>(null);

    /**
     * Для того, чтобы не спамить изменениями индекса.
     * Задержка дебаунса слегка больше, чем у тротлинга.
     * Таким образом, событие срабатывает при завершении скролла.
     */
    const debouncedOnIndexChange = useDebouncedFunction((i: number) => onIndexChange?.(i), debounceMs);

    /**
     * Вычисление центрального элемента.
     * Подсчет: от 0 до 1, какое количество ширины/высоты
     * каждого элемента находится по центру скролла.
     */
    const detectActiveItem = useCallback(
        throttle(() => {
            if (!scrollRef.current || !trackRef.current || !detectActive) {
                return;
            }

            /**
             * Правая (или нижняя для Оу) граница элемента.
             */
            let itemEdge = offset.current;

            /**
             * Смещение (отрицательный или положительный отступ)
             * и размер карусели (для Ox - ширина, для Oy - высота).
             */
            const scrollPos = scrollRef.current[axis === 'x' ? 'scrollLeft' : 'scrollTop'];
            const scrollSize = scrollRef.current[axis === 'x' ? 'offsetWidth' : 'offsetHeight'];

            /**
             * Граница скролла (видимой части).
             * Смещение + размер.
             */
            const scrollEdge = scrollPos + scrollSize;

            /**
             * Элементы перед, после и в видимой части.
             * перед [ ВИДИМЫЕ ] после
             */
            const prevItems: HTMLElement[] = [];
            const nextItems: HTMLElement[] = [];
            let count = 0;

            /**
             * Проходим по всему списку, суммируя ширины элементов,
             * пока не найдем один элемент, чей центр будет в центре карусели.
             */
            refs.items.forEach((itemRef, itemIndex) => {
                if (!itemRef.current) {
                    return;
                }

                /**
                 * Для Ox - ширина, для Oy - высота.
                 */
                const itemSize = itemRef.current[axis === 'x' ? 'offsetWidth' : 'offsetHeight'];

                /**
                 * Все элементы правее вьюпорта выпадают из процедуры.
                 * Сравниваем по предыдущему элементу.
                 * [ ... ] ...|n| <- Левый край элемента за пределами начала видимой части
                 */
                if (itemEdge > scrollEdge) {
                    if (scaleCallback && scaleResetCallback) {
                        nextItems.push(itemRef.current);
                    }
                    return;
                }

                itemEdge += itemSize;

                /**
                 * Все элементы левее вьюпорта выпадают из процедуры.
                 * Сравниваем по текущему элементу.
                 * Правый край элемента за пределами начала видимой части -> |p|... [ ... ]
                 */
                if (scrollPos > itemEdge) {
                    if (scaleCallback && scaleResetCallback) {
                        prevItems.push(itemRef.current);
                    }
                    return;
                }

                const itemSlot = getItemSlot(
                    itemIndex,
                    itemEdge,
                    itemSize,
                    scrollPos,
                    scrollSize,
                    scrollAlign,
                    prevIndex.current || 0,
                    offset.current,
                );

                if (itemSlot !== null) {
                    if (detectThreshold && Math.abs(itemSlot) <= detectThreshold) {
                        debouncedOnIndexChange(itemIndex);
                    }

                    if (scaleCallback) {
                        scaleCallback(itemRef.current, itemSlot);
                        /**
                         * Количество айтемов в видимой части.
                         */
                        count++;
                    }
                }
            });

            if (scaleCallback && scaleResetCallback) {
                window.requestAnimationFrame(() => {
                    if (direction.current) {
                        if (nextItems.length) {
                            nextItems.splice(0, count).forEach((elem) => scaleCallback(elem, count));
                            if (nextItems.length) {
                                nextItems.splice(0, count).forEach((elem) => scaleResetCallback(elem));
                            }
                        }
                    } else if (prevItems.length) {
                        const prItemsRev = prevItems.reverse();
                        prItemsRev.splice(0, count).forEach((elem) => scaleCallback(elem, count * -1));
                        if (prItemsRev.length) {
                            prItemsRev.splice(0, count).forEach((elem) => scaleResetCallback(elem));
                        }
                    }
                });
            }
        }, throttleMs),
        [axis, scrollRef, onIndexChange],
    );

    /**
     * Обработчик скролла на DOM-узел.
     */
    const handleScroll = useCallback(
        (event) => {
            detectActiveItem();
            onScroll?.(event);
        },
        [detectActiveItem, onScroll],
    );

    /**
     * Прокрутка до нужной позиции индекса.
     */
    const toIndex = useCallback((i: number) => {
        if (scrollRef.current && trackRef.current && refs.items.length && i >= 0) {
            scrollToPos({
                scrollEl: scrollRef.current,
                pos: getCalculatedPos({
                    scrollEl: scrollRef.current,
                    items: refs.items,
                    axis,
                    index: i,
                    offset: offset.current,
                    scrollAlign,
                }),
                axis,
                /**
                 * Без анимации при переходе на другой конец списка
                 */
                animated:
                    animatedScrollByIndex &&
                    (prevIndex.current === null || Math.abs(i - prevIndex.current) !== refs.items.length - 1),
            });
            prevIndex.current = i;
        }
    }, []);

    /**
     * Операции на маунте/анмаунте компонента.
     * Здесь нужно сделать кешируемые вычисления,
     * Создать слушатели событи и т.п.
     */
    useEffect(() => {
        if (scrollRef.current && trackRef.current) {
            offset.current = getCalculatedOffset(scrollRef.current, trackRef.current, axis);

            setTimeout(() => {
                /**
                 * Прокрутка до начального индекса.
                 */
                toIndex(index);

                /**
                 * Если на момент запуска карусель уже находится на нужной позиции,
                 * событие скролла не произойдет, не сработает и определение центра,
                 * необходимо вызвать его вручную.
                 */
                detectActiveItem();
            });
        }
    }, []);

    /**
     * Прокрутка до нужной позиции индекса, если индекс изменился.
     */
    useEffect(() => {
        if (index !== prevIndex.current) {
            toIndex(index);
        }
    }, [index]);

    return {
        scrollRef,
        trackRef,
        refs,
        handleScroll,
    };
};
