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

const getInitPos = (axis: Axis, scroll: Element, track: Element) => {
    const paddingProp = axis === 'x' ? 'paddingLeft' : 'paddingTop';
    return parseInt(getComputedStyle(scroll)[paddingProp], 10) + parseInt(getComputedStyle(track)[paddingProp], 10);
};

const calcPos = (
    axis: Axis,
    index: number,
    scroll: HTMLElement,
    track: HTMLElement,
    items: React.MutableRefObject<HTMLElement | null>[],
) => {
    let pos = getInitPos(axis, scroll, track);
    let carouselSize;
    let itemSize;

    if (!items.length) {
        return pos;
    }

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

export const StyledCarouselTrack = styled.div<
    PickOptional<CarouselProps, 'axis' | 'overscrollLeft' | 'overscrollRight'>
>`
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

    ${({ overscrollLeft }) =>
        overscrollLeft &&
        css`
            padding-left: ${overscrollLeft};
        `}

    ${({ overscrollRight }) =>
        overscrollRight &&
        css`
            padding-right: ${overscrollRight};
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
            const scrollPos = scrollRef.current[axis === 'x' ? 'scrollLeft' : 'scrollTop'];
            const scrollSize = scrollRef.current[axis === 'x' ? 'offsetWidth' : 'offsetHeight'];
            const scrollEdge = scrollPos + scrollSize;
            const scrollCenter = scrollPos + scrollSize / 2;
            let itemPos = getInitPos(axis, scrollRef.current, trackRef.current);

            let viewportCount = 0;
            const leftItems: HTMLElement[] = [];
            const rightItems: HTMLElement[] = [];

            refs.items.forEach((itemRef, i) => {
                if (!itemRef.current) {
                    return;
                }

                const itemSize = itemRef.current[axis === 'x' ? 'offsetWidth' : 'offsetHeight'];

                /**
                 * Все элементы правее вьюпорта выпадают из процедуры.
                 */
                if (itemPos > scrollEdge) {
                    if (scaleCentral && scaleCallback) {
                        rightItems.push(itemRef.current);
                    }
                    return;
                }

                itemPos += itemSize;

                /**
                 * Все элементы левее вьюпорта выпадают из процедуры.
                 */
                if (scrollPos > itemPos) {
                    if (scaleCentral && scaleCallback) {
                        leftItems.push(itemRef.current);
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
                    viewportCount++;
                }
            });

            if (scaleCentral && scaleCallback) {
                window.requestAnimationFrame(() => {
                    // viewportItems.forEach((entry) => scaleCallback(entry[0], entry[1]));
                    leftItems.forEach((elem) => scaleCallback(elem, viewportCount * -1));
                    rightItems.forEach((elem) => scaleCallback(elem, viewportCount));
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
     * Прокрутка к указанной позиции
     */
    const toPos = React.useCallback(
        (pos: number) => {
            if (!scrollRef.current) {
                return;
            }
            if (Math.abs(pos - scrollRef.current.scrollLeft) > 1) {
                if (axis === 'x') {
                    if (animatedScrollByIndex) {
                        animatedScrollToX(scrollRef.current, pos);
                    } else {
                        scrollRef.current.scrollTo({ left: pos });
                    }
                }
                if (axis === 'y') {
                    if (animatedScrollByIndex) {
                        animatedScrollToY(scrollRef.current, pos);
                    } else {
                        scrollRef.current.scrollTo({ top: pos });
                    }
                }
            }
        },
        [axis],
    );

    /**
     * Прокрутка к начальному элементу
     */
    React.useEffect(() => {
        setTimeout(() => {
            if (scrollRef.current && trackRef.current) {
                toPos(calcPos(axis, index, scrollRef.current, trackRef.current, refs.items));
            }
        });
    }, [index]);

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
