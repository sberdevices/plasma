import React from 'react';

export type Axis = 'x' | 'y';
export type SnapType = 'mandatory' | 'proximity';
export type SnapAlign = 'start' | 'center' | 'end';

export interface DirectionProps {
    /**
     * Ось скроллирования
     */
    axis: Axis;
}
export interface DetectCentralProps {
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
}
export interface OverscrollProps {
    /**
     * Отступ слева, используется при центрировании крайних элементов
     */
    overscrollLeft?: string;
    /**
     * Отступ справа, используется при центрировании крайних элементов
     */
    overscrollRight?: string;
}
export interface ScaleCentralProps {
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
}
export interface ScrollSnapProps {
    /**
     * Включить поддержку CSS Scroll Snap
     */
    scrollSnap?: boolean;
    /**
     * Тип Scroll Snap
     */
    scrollSnapType?: SnapType;
    /**
     * Центрирование Scroll Snap
     */
    scrollSnapAlign?: SnapAlign;
}

/**
 * Тип-заглушка для стилизованных компонентов, в которые передается ref
 */
export interface StyledRefProps<T extends HTMLElement | null> {
    ref?: React.MutableRefObject<T>;
}
