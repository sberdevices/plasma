import styled, { css } from 'styled-components';

import type { SnapType } from '../../types';

import type { ScrollAxis, ScrollAlign } from './types';

export interface BaseProps {
    /**
     * Индекс текущего элемента
     */
    index: number;
    /**
     * Ось прокрутки
     */
    axis: ScrollAxis;
    /**
     * Тип CSS Scroll Snap
     */
    scrollSnapType?: SnapType;
    /**
     * Центрирование активного элемента при скролле
     */
    scrollAlign?: ScrollAlign;
    /**
     * Отступ в начале, используется при центрировании крайних элементов
     */
    paddingStart?: string;
    /**
     * Отступ в конце, используется при центрировании крайних элементов
     */
    paddingEnd?: string;
    /**
     * Анимированная прокрутка с помощью requestAnimationFrame
     */
    animatedScrollByIndex?: boolean;
    /**
     * Throttling внутренних обработчиков события onScroll
     */
    throttleMs?: number;
    /**
     * Debounce внутренних обработчиков события onScroll
     */
    debounceMs?: number;
    /**
     * Обработчик события скролла
     */
    onScroll?: Function;
}
export interface DetectionProps {
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
    /**
     * Обработчик для сброса стилей элементов, находящихся вне вьюпорта
     */
    scaleResetCallback?: (itemEl: HTMLElement) => void;
}
export type CarouselProps = BaseProps &
    (
        | DetectionProps
        | {
              detectActive?: false;
              detectThreshold?: never;
              onIndexChange?: never;
              scaleCallback?: never;
              scaleResetCallback?: never;
          }
    );

/**
 * Компонент применяется, если требуется компенсировать отступы контейнера в сетке.
 * При обертывании вокруг ``Carousel``, добавляет карусели и ее прокрутке дополнительные отступы.
 * Стилизованный компонент, обладающий всеми свойствами ``div``.
 */
export const CarouselGridWrapper = styled.div`
    overflow: hidden;
    margin-left: calc(var(--plasma-grid-margin) * -1);
    margin-right: calc(var(--plasma-grid-margin) * -1);
`;

export const Carousel = styled.div<Pick<CarouselProps, 'axis' | 'scrollSnapType'>>`
    position: relative;

    /* stylelint-disable-next-line selector-max-empty-lines, selector-nested-pattern, selector-type-no-unknown */
    ::-webkit-scrollbar {
        display: none;
    }

    ${({ axis }) =>
        axis === 'x'
            ? css`
                  overflow-x: auto;
                  overflow-y: hidden;
              `
            : css`
                  height: 100%;
                  overflow-x: hidden;
                  overflow-y: auto;
              `}

    ${({ scrollSnapType, axis }) =>
        scrollSnapType &&
        css`
            scroll-behavior: smooth;
            scroll-snap-type: ${axis} ${scrollSnapType};
        `}

    /* stylelint-disable-next-line */
    ${CarouselGridWrapper} & {
        scroll-padding: 0 var(--plasma-grid-margin);
        padding-left: var(--plasma-grid-margin);
    }
`;

export const CarouselTrack = styled.div<Pick<CarouselProps, 'axis' | 'paddingStart' | 'paddingEnd'>>`
    ${({ axis, paddingStart, paddingEnd }) =>
        axis === 'x'
            ? css`
                  display: inline-flex;
                  flex-direction: row;

                  ${paddingStart &&
                  css`
                      padding-left: ${paddingStart};
                  `}
                  ${paddingEnd
                      ? css`
                            padding-right: ${paddingEnd};
                        `
                      : css`
                            /* stylelint-disable-next-line selector-nested-pattern */
                            ${CarouselGridWrapper} & {
                                padding-right: var(--plasma-grid-margin);
                            }
                        `}
              `
            : css`
                  display: flex;
                  flex-direction: column;
                  width: 100%;

                  ${paddingStart &&
                  css`
                      padding-top: ${paddingStart};
                  `}
                  ${paddingEnd &&
                  css`
                      padding-bottom: ${paddingEnd};
                  `}
              `}
`;
