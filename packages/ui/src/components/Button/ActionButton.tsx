import React from 'react';
import styled from 'styled-components';
import { Button as BaseButton, ButtonProps as BaseButtonProps } from '@sberdevices/plasma-core/components/Button';
import { PickOptional } from '@sberdevices/plasma-core/types';

import { applyInteraction, InteractionProps } from '../../mixins';

/**
 * Интерфейс кнопки.
 */
export interface ActionButtonProps
    extends PickOptional<BaseButtonProps<'l' | 'm' | 's'>, 'view' | 'size' | 'pin'>,
        InteractionProps,
        React.ButtonHTMLAttributes<HTMLButtonElement> {}

const downsize: Record<string, BaseButtonProps['size']> = {
    l: 'xs',
    m: 'xxs',
    s: 'xxxs',
};

/**
 * Кнопка для размещения внутри карточек.
 * Упрощенная версия ``Button`` для создания квадратных кнопок (с соотношением сторон 1:1).
 * Размеры ``ActionButton`` меньше размеров ``Button``.
 * Обладает теми же цветами, размерами и модификаторами, что и основная кнопка.
 */
export const ActionButton = styled(BaseButton).attrs(({ size, ...rest }) => {
    /**
     * Перевод в уменьшенные размеры
     */
    if (!size) {
        return rest;
    }
    return { size: downsize[size], ...rest };
})<ActionButtonProps>`
    ${applyInteraction}
`;

ActionButton.defaultProps = {
    ...BaseButton.defaultProps,
    size: 'm',
    outlined: true,
    scaleOnInteraction: true,
};
