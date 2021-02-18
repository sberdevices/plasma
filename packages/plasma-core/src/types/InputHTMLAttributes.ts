import React from 'react';

export interface InputHTMLAttributes<T> {
    /**
     * Тип элемента формы
     */
    type?: string;
    /**
     * Определяет уникальное имя элемента формы
     */
    name?: string;
    /**
     * Определяет значение элемента формы
     */
    value?: string | ReadonlyArray<string> | number;
    /**
     * Помечен ли заранее такой элемент формы, как флажок или переключатель
     */
    checked?: boolean;
    /**
     * Элемент формы не может изменяться пользователем
     */
    readOnly?: boolean;
    /**
     * Выводит текст внутри поля формы, который исчезает при получении фокуса
     */
    placeholder?: string;
    /**
     * Обработчик изменения элемента формы
     */
    onChange?: React.InputHTMLAttributes<T>['onChange'];
    /**
     * Обработчик фокуса на элементе формы
     */
    onFocus?: React.InputHTMLAttributes<T>['onFocus'];
    /**
     * Обработчик блюра на элементе формы
     */
    onBlur?: React.InputHTMLAttributes<T>['onBlur'];
}
