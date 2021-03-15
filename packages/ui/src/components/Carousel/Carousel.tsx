import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import throttle from 'lodash.throttle';
import { FixedSizeList as List, ListChildComponentProps, ListProps } from 'react-window';
import AutoResizer from 'react-virtualized-auto-sizer';
import type { SnapType, AsProps } from '@sberdevices/plasma-core/types';
import { animatedScrollToX, animatedScrollToY } from '@sberdevices/plasma-core/utils';

import { useForkRef, useDebouncedFunction } from '../../hooks';

import { CarouselContext, CarouselItemRefs } from './CarouselContext';
import type { Axis } from './Carousel.types';

type DetectionProps =
    | {
          /**
           * Вычислять активный элемент
           */
          detectActive: true;
          /**
           * Пороговое значение определения центрального элемента (0-1)
           */
          detectThreshold: number;
          /**
           * Коллбек изменения индекса
           */
          onIndexChange?: (index: number) => void;
          /**
           * Обработчик стилизации элемента во вьюпорте
           */
          scaleCallback?: (itemEl: HTMLElement, slot: number) => void;
      }
    | {
          detectActive?: false;
          detectThreshold?: never;
          onIndexChange?: never;
          scaleCallback?: never;
      };

export type CarouselProps = React.HTMLAttributes<HTMLDivElement> &
    DetectionProps &
    AsProps & {
        /**
         * Ось прокрутки
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
         * Центрирование активного элемента при скролле
         */
        scrollAlign?: 'start' | 'center';
        /**
         * Тип CSS Scroll Snap
         */
        scrollSnapType?: SnapType;
        /**
         * Отступ с переднего края, используется при центрировании крайних элементов
         */
        paddingStart?: string;
        /**
         * Отступ с заднего края, используется при центрировании крайних элементов
         */
        paddingEnd?: string;
        /**
         * Throttling внутренних обработчиков события onScroll
         */
        throttleMs?: number;
        /**
         * Debounce внутренних обработчиков события onScroll
         */
        debounceMs?: number;
    };

const THROTTLE_DEFAULT_MS = 100;
const DEBOUNCE_DEFAULT_MS = 150;

/**
 * Подсчет смещения из-за паддингов.
 */
const calcOffset = (axis: Axis, scroll: Element | null) => {
    const paddingProp = axis === 'x' ? 'paddingLeft' : 'paddingTop';

    return scroll ? parseInt(getComputedStyle(scroll)[paddingProp], 10) * 2 : 0;
};

/**
 * Подсчет скролла до определенного индекса.
 */
const calcPos = (
    offset: number,
    axis: Axis,
    index: number,
    scroll: ReactElement | null,
    items: React.MutableRefObject<HTMLElement | null>[],
    scrollAlign: 'start' | 'center',
) => {
    let pos = scrollAlign === 'center' ? offset : 0;
    let carouselSize;
    let itemSize;

    for (let i = 0; i < index; i++) {
        if (axis === 'x') {
            pos += items[0]?.current?.offsetWidth || 0;
        } else {
            pos += items[0]?.current?.offsetHeight || 0;
        }
    }

    if (scrollAlign === 'center') {
        if (axis === 'x') {
            carouselSize = scroll?.props?.width ?? 0;
            itemSize = items[0]?.current?.offsetWidth || 0;
        } else {
            carouselSize = scroll?.props?.height ?? 0;
            itemSize = items[0].current?.offsetHeight || 0;
        }

        pos -= carouselSize / 2 - itemSize / 2;
    }

    return pos;
};

/**
 * Прокрутка к указанной позиции
 */
const toPos = (pos: number, prevPosition: number, axis: Axis, animated = false, scroll: HTMLElement | null) => {
    if (!scroll) {
        return;
    }

    requestAnimationFrame(() => {
        if (!animated) {
            scroll.scrollTo(pos, 0);
            return;
        }

        if (axis === 'x') {
            animatedScrollToX(scroll, pos, prevPosition);
        } else {
            animatedScrollToY(scroll, pos, prevPosition);
        }
    });
};

interface StyledListProps extends ListProps {
    axis: Axis;
    scrollSnapType: SnapType;
}

export const StyledList = styled(List)<StyledListProps>`
    position: relative;
    padding-left: var(--plasma-grid-margin);

    ::-webkit-scrollbar {
        display: none;
    }

    /* stylelint-disable-next-line */
    & > div {
        position: relative;
        padding-right: var(--plasma-grid-margin);

        ${({ scrollSnapType, axis }) =>
            scrollSnapType &&
            css`
                scroll-snap-type: ${axis} ${scrollSnapType};
            `}
    }
`;

export const StyledAutoResizer = styled(AutoResizer)`
    height: 100% !important;
    width: 100% !important;
    min-height: 1px;
    display: block;
`;

const GUTTER_SIZE = 15;

const Row = ({ data, index, style }: ListChildComponentProps) => {
    return <div style={style}>{data[index]}</div>;
};

/**
 * Компонент для создания списков с прокруткой.
 */
// eslint-disable-next-line prefer-arrow-callback
export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
    {
        index = 0,
        axis = 'x',
        animatedScrollByIndex = false,
        scrollSnapType = 'mandatory',
        detectActive = false,
        detectThreshold = 0.5,
        scaleCallback,
        paddingStart,
        paddingEnd,
        children,
        onScroll,
        onIndexChange,
        throttleMs = THROTTLE_DEFAULT_MS,
        debounceMs = DEBOUNCE_DEFAULT_MS,
        scrollAlign = 'center',
        ...rest
    },
    ref,
) {
    const prevIndex = React.useRef<number>();
    const offset = React.useRef(0);
    const refs = React.useMemo(() => new CarouselItemRefs(), []);
    const scrollRef = React.useRef(null);
    const handleRef = useForkRef(scrollRef, ref);

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
    const detectActiveItem = React.useCallback(
        throttle(({ visibleStartIndex, visibleStopIndex, overscanStartIndex }) => {
            if (!scrollRef.current || !detectActive || !visibleStopIndex) {
                return;
            }

            const presentIndex =
                scrollAlign === 'center' ? Math.floor((visibleStartIndex - visibleStopIndex) / 2) : visibleStartIndex;

            /**
             * Проходим по всему списку, суммируя ширины элементов,
             * пока не найдем один элемент, чей центр будет в центре карусели.
             */
            refs.items.forEach((itemRef, i) => {
                if (!itemRef.current) {
                    return;
                }

                if (detectThreshold) {
                    debouncedOnIndexChange(overscanStartIndex + i);
                }

                if (scaleCallback) {
                    scaleCallback(itemRef.current, presentIndex);
                }
            });
        }, throttleMs),
        [axis, scrollRef],
    );

    /**
     * Обработчик скролла на DOM-узел.
     */
    const handleScroll = React.useCallback((event) => onScroll?.(event), [onScroll]);

    /**
     * Прокрутка до нужной позиции индекса.
     */
    const toIndex = React.useCallback(
        (i: number, fromIndex = 0) => {
            if (scrollRef.current && refs.items.length && i >= 0) {
                toPos(
                    calcPos(offset.current, axis, i, scrollRef.current, refs.items, scrollAlign),
                    calcPos(offset.current, axis, fromIndex, scrollRef.current, refs.items, scrollAlign),
                    axis,
                    /**
                     * Без анимации при переходе на другой конец списка
                     */
                    animatedScrollByIndex &&
                        (prevIndex.current === null ||
                            Math.abs(i - (prevIndex.current ?? 0)) !== refs.items.length - 1),
                    scrollRef.current,
                );
                prevIndex.current = i;
            }
        },
        [scrollRef],
    );

    /**
     * Операции на маунте/анмаунте компонента.
     * Здесь нужно сделать кешируемые вычисления,
     * Создать слушатели событи и т.п.
     */
    React.useEffect(() => {
        if (scrollRef.current && scrollRef.current) {
            offset.current = calcOffset(axis, scrollRef.current);

            setTimeout(() => {
                /**
                 * Прокрутка до начального индекса.
                 */
                toIndex(index);
            });
        }
    }, []);

    /**
     * Прокрутка до нужной позиции индекса, если индекс изменился.
     * Данный участок кода призван ускорить работу карусели,
     * потому что вызов useEffect весьма затратен по времени
     * для устройств по типу SberBox.
     */
    if (index !== prevIndex.current) {
        toIndex(index, prevIndex.current);
    }

    return (
        <CarouselContext.Provider value={{ axis, refs }}>
            <StyledAutoResizer>
                {({ width }) => (
                    <StyledList
                        onItemsRendered={detectActiveItem}
                        scrollSnapType={scrollSnapType}
                        axis={axis}
                        paddingStart={paddingStart}
                        paddingEnd={paddingEnd}
                        onScroll={handleScroll}
                        /* @ts-ignore */
                        ref={handleRef}
                        width={width}
                        itemData={children}
                        /* @ts-ignore */
                        itemCount={children.length}
                        itemSize={refs?.items?.[0]?.current?.offsetWidth ?? GUTTER_SIZE}
                        height={(refs?.items?.[0]?.current?.offsetHeight ?? 0) + GUTTER_SIZE * 2}
                        layout={axis === 'y' ? 'vertical' : 'horizontal'}
                        overscanCount={3}
                        {...rest}
                    >
                        {Row}
                    </StyledList>
                )}
            </StyledAutoResizer>
        </CarouselContext.Provider>
    );
});
