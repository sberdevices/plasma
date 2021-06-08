import React from 'react';

import { DisabledProps } from '../mixins';

export interface TextareaHTMLAttributes<T> extends DisabledProps, React.HTMLAttributes<T> {
    autoComplete?: string;
    autoFocus?: boolean;
    cols?: number;
    dirName?: string;
    form?: string;
    /**
     * Минимальная длина значения поля
     */
    minLength?: number;
    /**
     * Максимальная длина значения поля
     */
    maxLength?: number;
    /**
     * Определяет уникальное имя элемента формы
     */
    name?: string;
    /**
     * Выводит текст внутри поля формы, который исчезает при получении фокуса
     */
    placeholder?: string;
    /**
     * Элемент формы не может изменяться пользователем
     */
    readOnly?: boolean;
    /**
     * Флаг обязательности поля
     */
    required?: boolean;
    rows?: number;
    /**
     * Определяет значение элемента формы
     */
    value?: string | ReadonlyArray<string> | number;
    wrap?: string;
    /**
     * Обработчик изменения элемента формы
     */
    onChange?: React.TextareaHTMLAttributes<T>['onChange'];
    /**
     * Обработчик фокуса на элементе формы
     */
    onFocus?: React.TextareaHTMLAttributes<T>['onFocus'];
    /**
     * Обработчик блюра на элементе формы
     */
    onBlur?: React.TextareaHTMLAttributes<T>['onBlur'];
}
