import type { ReactNode } from 'react';

import type { DisabledProps, FocusProps, OutlinedProps, BlurProps } from '../../mixins';
import type { PinProps } from '../../utils';
import type { ShiftProps, AsProps } from '../../types';

/**
 * Размеры кнопки
 */
interface SizeProps<T> {
    /**
     * Размер кнопки
     */
    size: T;
    /**
     * Квадратная кнопка (со сторанами 1:1)
     */
    square?: boolean;
    /**
     * Растягиваемость кнопки
     */
    resizible?: boolean;
}

/**
 * Виды кнопки
 */
export interface ViewProps<T> {
    /**
     * Вид кнопки
     */
    view: T;
}

/**
 * С текстом и/или контентом слева.
 */
export interface WithTextAndContentLeft {
    /**
     * Текстовая надпись на кнопке
     */
    text: string | number;
    /**
     * Кастомный контент кнопки. При указании этого свойства contentLeft, contentRight и text не применяются
     */
    children?: never;
    /**
     * Слот для контента слева, например Icon
     */
    contentLeft?: ReactNode;
}

/**
 * С текстом и/или контентом справа.
 */
export interface WithTextAndContentRight {
    text: string | number;
    children?: never;
    /**
     * Слот для контента справа, например Icon
     */
    contentRight?: ReactNode;
}

/**
 * С контентом слева.
 */
export interface WithContentLeft {
    children?: never;
    contentLeft: ReactNode;
}

/**
 * Через ``children``.
 */
export interface WithChildren {
    children: ReactNode;
}

/**
 * Интерфейс для обхода контентных опций
 */
export interface AllContentProps
    extends WithTextAndContentLeft,
        Pick<WithTextAndContentRight, 'contentRight'>,
        Pick<WithTextAndContentRight, 'children'> {}

/**
 * Интерфейс для стилизованного компонента, не включая контентных
 */
export interface StyledButtonProps<S, V>
    extends SizeProps<S>,
        ViewProps<V>,
        PinProps,
        FocusProps,
        OutlinedProps,
        DisabledProps,
        ShiftProps,
        BlurProps,
        AsProps {}
