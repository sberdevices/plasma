import React from 'react';
import styled, { css } from 'styled-components';
import throttle from 'lodash.throttle';

import { useForkRef, useDebouncedFunction } from '../../hooks';
import type { PickOptional } from '../../types';
import { animatedScrollToX, animatedScrollToY } from '../../utils';

import { CarouselContext, CarouselItemRefs } from './CarouselContext';
import type { Axis, SnapType } from './Carousel.types';

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
    animated?: boolean;
    /**
     * Вычислять центральный элемент
     */
    detectCentral?: boolean;
    /**
     * Пороговое значение определения центрального элемента (0-1)
     */
    detectThreshold?: number;
    /**
     * Коллбек изменения центрального элемента
     */
    onCentralChange?: (index: number) => void;
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
}

/**
 * Throttling и debounce внутренних обработчиков события onScroll
 */
const THROTTLING_MS = 100;
const DEBOUNCING_MS = 150;

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
        index,
        axis,
        animated = false,
        scrollSnap = false,
        scrollSnapType = 'mandatory',
        detectCentral,
        detectThreshold,
        scaleCentral,
        scaleCallback,
        scaleResetCallback,
        overscrollLeft,
        overscrollRight,
        children,
        onScroll,
        onCentralChange,
        ...rest
    },
    ref,
) {
    const refs = React.useMemo(() => new CarouselItemRefs(), []);
    const scrollRef = React.useRef<HTMLDivElement | null>(null);
    const handleRef = useForkRef(scrollRef, ref);
    const trackRef = React.useRef<HTMLDivElement | null>(null);
    const prevIndex = React.useRef<number>();
    const [isTouching, setIsTouching] = React.useState(false);
    const [scrollRect, setScrollRect] = React.useState<DOMRect | null>(null);

    const getInitPos = React.useCallback(() => {
        if (!scrollRef.current || !trackRef.current) {
            return 0;
        }
        const paddingProp = axis === 'x' ? 'paddingLeft' : 'paddingTop';
        return (
            parseInt(getComputedStyle(scrollRef.current)[paddingProp], 10) +
            parseInt(getComputedStyle(trackRef.current)[paddingProp], 10)
        );
    }, [axis]);

    /**
     * Для того, чтобы не спамить изменениями индекса центрального элемента.
     * Задержка дебаунса слегка больше, чем у тротлинга скролла.
     * Таким образом, событие срабатывает при завершении скроллинга.
     */
    const internalOnCentralChange = useDebouncedFunction((i: number) => onCentralChange?.(i), DEBOUNCING_MS);

    const centralDetection = React.useCallback(
        throttle(() => {
            /**
             * Вычисление центрального элемента.
             * Подсчет: от 0 до 1, какое количество ширины/высоты
             * каждого элемента находится по центру скролла.
             */
            if (!scrollRect || !scrollRef.current || (!scaleCentral && !detectCentral)) {
                return;
            }

            const scrollPos = scrollRef.current[axis === 'x' ? 'scrollLeft' : 'scrollTop'];
            const scrollSize = scrollRef.current[axis === 'x' ? 'offsetWidth' : 'offsetHeight'];
            const scrollEdge = scrollPos + scrollSize;
            const scrollCenter = scrollPos + scrollSize / 2;
            let itemPos = getInitPos();

            refs.items.forEach((itemRef, i) => {
                if (!itemRef.current) {
                    return;
                }

                const itemSize = itemRef.current[axis === 'x' ? 'offsetWidth' : 'offsetHeight'];

                /**
                 * Все элементы правее вьюпорта выпадают из процедуры.
                 * Захватим +1 элемент, чтобы была плавность переключения по стрелочкам.
                 */
                if (itemPos > scrollEdge + itemSize) {
                    if (scaleResetCallback) {
                        scaleResetCallback(itemRef.current);
                    }
                    return;
                }

                itemPos += itemSize;

                /**
                 * Все элементы правее вьюпорта выпадают из процедуры.
                 * Захватим +1 элемент, чтобы была плавность переключения по стрелочкам.
                 */
                if (scrollPos > itemPos + itemSize) {
                    if (scaleResetCallback) {
                        scaleResetCallback(itemRef.current);
                    }
                    return;
                }

                const itemCenter = itemPos - itemSize / 2;
                const itemSlot = Math.round(((itemCenter - scrollCenter) / itemSize) * 100) / 100;

                if (detectCentral && detectThreshold && Math.abs(itemSlot) <= detectThreshold) {
                    internalOnCentralChange(i);
                }

                if (scaleCentral && scaleCallback) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    scaleCallback(itemRef.current, itemSlot);
                }
            });
        }, THROTTLING_MS),
        [axis, scrollRef, scrollRect],
    );

    const handleScroll = React.useCallback(
        (event) => {
            centralDetection();
            onScroll?.(event);
        },
        [centralDetection, onScroll],
    );

    React.useEffect(() => {
        if (scrollRef.current && (detectCentral || scaleCentral)) {
            setScrollRect(scrollRef.current.getBoundingClientRect());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [axis, refs.items.length]);

    /**
     * Прокрутка карусели по индексу.
     */
    React.useEffect(() => {
        /**
         * Запрещаем прокрутку, пока пользователь не доскроллит на тач-устройстве.
         */
        if (
            !isTouching &&
            scrollRef.current &&
            trackRef.current &&
            refs &&
            refs.items.length &&
            index !== prevIndex.current
        ) {
            let pos = getInitPos();

            for (let i = index - 1; i >= 0; i--) {
                const itemRef = refs.items[i];
                if (itemRef && itemRef.current) {
                    if (axis === 'x') {
                        pos += itemRef.current.offsetWidth;
                    } else {
                        pos += itemRef.current.offsetHeight;
                    }
                }
            }

            let carouselSize;
            let itemSize;

            if (axis === 'x') {
                carouselSize = scrollRef.current.offsetWidth;
                itemSize = refs.items[index].current?.offsetWidth || 0;
            } else {
                carouselSize = scrollRef.current.offsetHeight;
                itemSize = refs.items[index].current?.offsetHeight || 0;
            }

            pos -= carouselSize / 2 - itemSize / 2;

            if (Math.abs(pos - scrollRef.current.scrollLeft) > 1) {
                if (scaleResetCallback) {
                    refs.items.forEach((itemRef) => itemRef.current && scaleResetCallback(itemRef.current));
                }
                if (axis === 'x') {
                    if (animated) {
                        animatedScrollToX(scrollRef.current, pos);
                    } else {
                        scrollRef.current.scrollTo({ left: pos });
                    }
                }
                if (axis === 'y') {
                    if (animated) {
                        animatedScrollToY(scrollRef.current, pos);
                    } else {
                        scrollRef.current.scrollTo({ top: pos });
                    }
                }
            }
        }

        prevIndex.current = index;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [axis, index, refs.items.length]);

    return (
        <CarouselContext.Provider value={{ axis, refs }}>
            <StyledCarousel
                ref={handleRef}
                axis={axis}
                scrollSnap={scrollSnap}
                scrollSnapType={scrollSnapType}
                onScroll={handleScroll}
                onTouchStart={() => setIsTouching(true)}
                onTouchEnd={() => setIsTouching(false)}
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
