import React from 'react';
import styled, { css } from 'styled-components';
import throttle from 'lodash.throttle';

import { useForkRef, useDebouncedFunction } from '../../hooks';
import type { PickOptional, SnapType } from '../../types';
import { animatedScrollToX, animatedScrollToY } from '../../utils';

import { CarouselContext, CarouselItemRefs } from './CarouselContext';
import type { Axis } from './Carousel.types';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Ось скроллирования
     */
    axis: Axis;
    /**
     * Индекс текущего элемента
     */
    index: number;
    /**
     * Анимированная прокрутка с помощью requestAnimationFrame
     */
    animatedScrollByIndex?: boolean;
    /**
     * Вычислять центральный элемент
     */
    detectCentral?: boolean;
    /**
     * Пороговое значение определения центрального элемента (0-1)
     */
    detectThreshold?: number;
    /**
     * Коллбек изменения индекса
     */
    onIndexChange?: (index: number) => void;
    /**
     * Плавное увеличение к центру
     */
    scaleCentral?: boolean;
    /**
     * Величина плавного увеличения к центру
     */
    scaleDelta?: number;
    /**
     * Обработчик увеличения элемента
     */
    scaleCallback?: (itemEl: HTMLElement, slot: number) => void;
    /**
     * Обработчик для сброса стилей элементов, находящихся вне вьюпорта
     */
    scaleResetCallback?: (itemEl: HTMLElement) => void;
    /**
     * Включить поддержку CSS Scroll Snap
     */
    scrollSnap?: boolean;
    /**
     * Тип Scroll Snap
     */
    scrollSnapType?: SnapType;
    /**
     * Отступ слева, используется при центрировании крайних элементов
     */
    overscrollLeft?: string;
    /**
     * Отступ справа, используется при центрировании крайних элементов
     */
    overscrollRight?: string;
    /**
     * Throttling внутренних обработчиков события onScroll
     */
    throttleMs?: number;
    /**
     * Debounce внутренних обработчиков события onScroll
     */
    debounceMs?: number;
}

const THROTTLE_DEFAULT_MS = 100;
const DEBOUNCE_DEFAULT_MS = 150;

/**
 * Подсчет смещения из-за паддингов.
 */
const calcOffset = (axis: Axis, scroll: Element, track: Element) => {
    const paddingProp = axis === 'x' ? 'paddingLeft' : 'paddingTop';
    return parseInt(getComputedStyle(scroll)[paddingProp], 10) + parseInt(getComputedStyle(track)[paddingProp], 10);
};

/**
 * Подсчет скролла до определенного индекса.
 */
const calcPos = (
    offset: number,
    axis: Axis,
    index: number,
    scroll: HTMLElement,
    items: React.MutableRefObject<HTMLElement | null>[],
) => {
    let pos = offset;
    let carouselSize;
    let itemSize;

    for (let i = index - 1; i >= 0; i--) {
        if (axis === 'x') {
            pos += items[i].current?.offsetWidth || 0;
        } else {
            pos += items[i].current?.offsetHeight || 0;
        }
    }

    if (axis === 'x') {
        carouselSize = scroll.offsetWidth;
        itemSize = items[index].current?.offsetWidth || 0;
    } else {
        carouselSize = scroll.offsetHeight;
        itemSize = items[index].current?.offsetHeight || 0;
    }

    pos -= carouselSize / 2 - itemSize / 2;

    return pos;
};

/**
 * Прокрутка к указанной позиции
 */
const toPos = (pos: number, axis: Axis, animated: boolean, scroll: HTMLElement) => {
    if (Math.abs(pos - scroll.scrollLeft) > 1) {
        if (axis === 'x') {
            if (animated) {
                animatedScrollToX(scroll, pos);
            } else {
                scroll.scrollTo({ left: pos });
            }
        }
        if (axis === 'y') {
            if (animated) {
                animatedScrollToY(scroll, pos);
            } else {
                scroll.scrollTo({ top: pos });
            }
        }
    }
};

export const StyledCarousel = styled.div<PickOptional<CarouselProps, 'axis' | 'scrollSnap' | 'scrollSnapType'>>`
    position: relative;

    ${({ axis }) =>
        axis === 'x'
            ? css`
                  width: 100%;
                  overflow-x: auto;
                  overflow-y: hidden;
              `
            : css`
                  height: 100%;
                  overflow-x: hidden;
                  overflow-y: auto;
              `}

    ${({ scrollSnap, scrollSnapType, axis }) =>
        scrollSnap &&
        css`
            scroll-snap-type: ${axis} ${scrollSnapType};
        `}

    /* stylelint-disable-next-line selector-max-empty-lines, selector-nested-pattern, selector-type-no-unknown */
    ::-webkit-scrollbar {
        display: none;
    }
`;

const StyledCarouselTrack = styled.div<PickOptional<CarouselProps, 'axis' | 'overscrollLeft' | 'overscrollRight'>>`
    ${({ axis }) =>
        axis === 'x'
            ? css`
                  display: inline-flex;
                  flex-direction: row;
              `
            : css`
                  display: flex;
                  flex-direction: column;
              `}
`;

// eslint-disable-next-line prefer-arrow-callback
export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
    {
        index = 0,
        axis = 'x',
        animatedScrollByIndex = false,
        scrollSnap = false,
        scrollSnapType = 'mandatory',
        detectCentral = false,
        detectThreshold = 0.5,
        scaleCentral = false,
        scaleCallback,
        scaleResetCallback,
        overscrollLeft,
        overscrollRight,
        children,
        onScroll,
        onIndexChange,
        throttleMs = THROTTLE_DEFAULT_MS,
        debounceMs = DEBOUNCE_DEFAULT_MS,
        ...rest
    },
    ref,
) {
    const prevIndex = React.useRef(-1);
    const direction = React.useRef<boolean | null>(null);
    const offset = React.useRef(0);
    const refs = React.useMemo(() => new CarouselItemRefs(), []);
    const scrollRef = React.useRef<HTMLDivElement | null>(null);
    const handleRef = useForkRef(scrollRef, ref);
    const trackRef = React.useRef<HTMLDivElement | null>(null);

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
    const centralDetection = React.useCallback(
        throttle(() => {
            if (!scrollRef.current || !trackRef.current || (!scaleCentral && !detectCentral)) {
                return;
            }

            /**
             * Правая (или нижняя для Оу) граница элемента.
             */
            let itemPos = offset.current;

            /**
             * Смещение (отрицательный или положительный отступ)
             * и размер карусели (для Ox - ширина, для Oy - высота).
             */
            const scrollPos = scrollRef.current[axis === 'x' ? 'scrollLeft' : 'scrollTop'];
            const scrollSize = scrollRef.current[axis === 'x' ? 'offsetWidth' : 'offsetHeight'];

            /**
             * Граница и центр скролла (видимой части).
             * Смещение + размер.
             */
            const scrollEdge = scrollPos + scrollSize;
            const scrollCenter = scrollPos + scrollSize / 2;

            /**
             * Элементы перед, после и в видимой части.
             * перед [ ВИДИМЫЕ ] после
             */
            const prevItems: HTMLElement[] = [];
            const nextItems: HTMLElement[] = [];
            let viewportCount = 0;

            /**
             * Проходим по всему списку, суммируя ширины элементов,
             * пока не найдем один элемент, чей центр будет в центре карусели.
             */
            refs.items.forEach((itemRef, i) => {
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
                if (itemPos > scrollEdge) {
                    if (scaleCentral && scaleCallback) {
                        nextItems.push(itemRef.current);
                    }
                    return;
                }

                itemPos += itemSize;

                /**
                 * Все элементы левее вьюпорта выпадают из процедуры.
                 * Сравниваем по текущему элементу.
                 * Правый край элемента за пределами начала видимой части -> |p|... [ ... ]
                 */
                if (scrollPos > itemPos) {
                    if (scaleCentral && scaleCallback) {
                        prevItems.push(itemRef.current);
                    }
                    return;
                }

                const itemCenter = itemPos - itemSize / 2;
                const itemSlot = Math.round(((itemCenter - scrollCenter) / itemSize) * 100) / 100;

                if (detectCentral && detectThreshold && Math.abs(itemSlot) <= detectThreshold) {
                    debouncedOnIndexChange(i);
                }

                if (scaleCentral && scaleCallback) {
                    scaleCallback(itemRef.current, itemSlot);
                    /**
                     * Количество айтемов в видимой части.
                     */
                    viewportCount++;
                }
            });

            if (scaleCentral && scaleCallback && scaleResetCallback) {
                window.requestAnimationFrame(() => {
                    if (direction.current) {
                        if (nextItems.length) {
                            nextItems.splice(0, viewportCount).forEach((elem) => scaleCallback(elem, viewportCount));
                            if (nextItems.length) {
                                nextItems.splice(0, viewportCount).forEach((elem) => scaleResetCallback(elem));
                            }
                        }
                    } else if (prevItems.length) {
                        const prItemsRev = prevItems.reverse();
                        prItemsRev.splice(0, viewportCount).forEach((elem) => scaleCallback(elem, viewportCount * -1));
                        if (prItemsRev.length) {
                            prItemsRev.splice(0, viewportCount).forEach((elem) => scaleResetCallback(elem));
                        }
                    }
                });
            }
        }, throttleMs),
        [axis, scrollRef],
    );

    /**
     * Обработчик скролла на DOM-узел.
     */
    const handleScroll = React.useCallback(
        (event) => {
            centralDetection();
            onScroll?.(event);
        },
        [centralDetection, onScroll],
    );

    /**
     * Прокрутка до нужной позиции индекса.
     */
    const toIndex = React.useCallback((i: number) => {
        if (scrollRef.current && trackRef.current && refs.items.length) {
            toPos(
                calcPos(offset.current, axis, i, scrollRef.current, refs.items),
                axis,
                /**
                 * Без анимации при переходе на другой конец списка
                 */
                animatedScrollByIndex && Math.abs(i - prevIndex.current) !== refs.items.length - 1,
                scrollRef.current,
            );
            prevIndex.current = i;
        }
    }, []);

    /**
     * Операции на маунте/анмаунте компонента.
     * Здесь нужно сделать кешируемые вычисления,
     * Создать слушатели событи и т.п.
     */
    React.useEffect(() => {
        if (scrollRef.current && trackRef.current) {
            offset.current = calcOffset(axis, scrollRef.current, trackRef.current);

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
                centralDetection();
            });
        }
    }, []);

    /**
     * Прокрутка до нужной позиции индекса, если индекс изменился.
     * Данный участок кода призван ускорить работу карусели,
     * потому что вызов useEffect весьма затратен по времени
     * для устройств по типу SberBox.
     */
    if (index !== prevIndex.current && prevIndex.current !== -1) {
        direction.current = index !== prevIndex.current ? index > prevIndex.current : null;
        toIndex(index);
    }

    return (
        <CarouselContext.Provider value={{ axis, refs }}>
            <StyledCarousel
                ref={handleRef}
                axis={axis}
                scrollSnap={scrollSnap}
                scrollSnapType={scrollSnapType}
                onScroll={handleScroll}
                {...rest}
            >
                <StyledCarouselTrack
                    ref={trackRef}
                    axis={axis}
                    overscrollLeft={overscrollLeft}
                    overscrollRight={overscrollRight}
                >
                    {children}
                </StyledCarouselTrack>
            </StyledCarousel>
        </CarouselContext.Provider>
    );
});
