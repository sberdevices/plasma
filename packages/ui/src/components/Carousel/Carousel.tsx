import React from 'react';
import styled, { css } from 'styled-components';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

import { animatedScrollToX, animatedScrollToY } from '../../utils/animatedScrollTo';

import { CarouselContext, CarouselItemRefs } from './CarouselContext';
import type {
    DirectionProps,
    DetectCentralProps,
    OverscrollProps,
    ScaleCentralProps,
    ScrollSnapProps,
} from './Carousel.types';

interface StyledCarouselProps extends DirectionProps, Omit<ScrollSnapProps, 'scrollSnapAlign'> {}

export const StyledCarousel = styled.div<StyledCarouselProps>`
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

interface StyledCarouselTrackProps extends DirectionProps, OverscrollProps {}

export const StyledCarouselTrack = styled.div<StyledCarouselTrackProps>`
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

export interface CarouselProps
    extends DirectionProps,
        DetectCentralProps,
        OverscrollProps,
        Omit<ScrollSnapProps, 'scrollSnapAlign'>,
        Omit<ScaleCentralProps, 'scaleDelta'> {
    /**
     * Индекс текущего элемента
     */
    index: number;
    /**
     * Анимированная прокрутка с помощью requestAnimationFrame
     */
    animated?: boolean;
    /**
     * Троттлинг внутренних обработчиков события onScroll
     */
    internalOnScrollThrottle?: number;
}

export const Carousel: React.FC<CarouselProps & React.HTMLAttributes<HTMLDivElement>> = ({
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
    internalOnScrollThrottle = 100,
    overscrollLeft,
    overscrollRight,
    children,
    onScroll,
    onCentralChange,
    ...rest
}) => {
    const refs = React.useMemo(() => new CarouselItemRefs(), []);
    const scrollRef = React.useRef<HTMLDivElement | null>(null);
    const trackRef = React.useRef<HTMLDivElement | null>(null);
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
    const internalOnCentralChange = React.useCallback(
        debounce((i) => onCentralChange?.(i), internalOnScrollThrottle * 1.1),
        [onCentralChange],
    );

    /**
     * Троттлинг на обработку скролла.
     * Величина троттлинга задается пропсом.
     */
    const internalOnScroll = React.useCallback(
        throttle(() => {
            if (!scrollRect || !scrollRef.current || (!scaleCentral && !detectCentral)) {
                return;
            }

            /**
             * Вычисление центрального элемента.
             * Подсчет: от 0 до 1, какое количество ширины/высоты
             * каждого элемента находится по центру скролла.
             */
            const scrollPos = scrollRef.current[axis === 'x' ? 'scrollLeft' : 'scrollTop'];
            const scrollSize = scrollRef.current[axis === 'x' ? 'offsetWidth' : 'offsetHeight'];
            const scrollEdge = scrollPos + scrollSize;
            const scrollCenter = scrollPos + scrollSize / 2;
            let itemPos = getInitPos();

            refs.items.forEach((itemRef, i) => {
                if (!itemRef.current) {
                    return;
                }
                if (itemPos > scrollEdge) {
                    if (scaleResetCallback) {
                        scaleResetCallback(itemRef.current);
                    }
                    return;
                }

                const itemSize = itemRef.current[axis === 'x' ? 'offsetWidth' : 'offsetHeight'];
                itemPos += itemSize;

                if (scrollPos > itemPos) {
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
        }, internalOnScrollThrottle),
        [axis, scrollRef, scrollRect],
    );

    const handleScroll = React.useCallback(
        (event) => {
            internalOnScroll();
            onScroll?.(event);
        },
        [internalOnScroll, onScroll],
    );

    /**
     * Прокрутка к текущему индексу.
     */
    const scrollToCurrentIndex = React.useCallback(() => {
        if (!scrollRef.current || !trackRef.current || !refs) {
            return;
        }
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
    }, []);

    React.useEffect(() => {
        if (scrollRef.current && (detectCentral || scaleCentral)) {
            setScrollRect(scrollRef.current.getBoundingClientRect());
        }
    }, [axis, refs.items.length]);

    /**
     * При изменении индекса отматываем карусель к нужной позиции.
     */
    React.useEffect(() => {
        if (!detectCentral && scrollRef.current && trackRef.current && refs) {
            scrollToCurrentIndex();
        }
    }, [axis, index, animated, scaleCentral, detectCentral, refs.items.length]);

    /**
     * Возможен баг: при ScrollSnap скролл встает в произвольную позицию,
     * но детектирование скролла конфлуктует с прокруткой по индексу,
     * потому при первом старте нужно ОДИН раз отмотать к элементу 'index'.
     */
    React.useEffect(() => {
        if (detectCentral) {
            scrollToCurrentIndex();
        }
    }, []);

    return (
        <CarouselContext.Provider value={{ axis, refs }}>
            <StyledCarousel
                ref={scrollRef}
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
};
