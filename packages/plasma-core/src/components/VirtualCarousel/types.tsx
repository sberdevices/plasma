import type { HTMLAttributes } from 'react';

import type { AsProps, SnapType } from '../../types';

export type ScrollAxis = 'x' | 'y';
export type ScrollAlign = 'start' | 'center' | 'end' | 'activeDirection';

export type ToIndex = (i: number) => void;
export type ToPrev = () => void;
export type ToNext = () => void;

export interface BasicProps extends AsProps, HTMLAttributes<HTMLDivElement> {
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
    onScroll?: HTMLAttributes<HTMLDivElement>['onScroll'];

    /**
     * Количество всех элементов в списке.
     */
    itemCount: number;
    /**
     * Вычисление размера элемента в зависимости от индекса.
     * По умолчанию размер = 50px
     */
    estimateSize: (index: number) => number;
    /**
     * количество элементов для рендера за видимой областью
     * при скролле
     */
    overscan?: number;
    /**
     * Функция для отрисовки элементов
     * @param visibleItems - текущие элементы
     * @param currentIndex - текущий выбранный индекс
     */
    renderItems: (visibleItems: { index: number; start: number }[], currentIndex: number) => React.FC;
    /**
     * Высота карусели
     */
    carouselHeight: number;
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
export interface NoDetectionProps {
    detectActive?: false;
    detectThreshold?: never;
    onIndexChange?: never;
    scaleCallback?: never;
    scaleResetCallback?: never;
}
export type VirtualCarouselProps = BasicProps & (DetectionProps | NoDetectionProps);
