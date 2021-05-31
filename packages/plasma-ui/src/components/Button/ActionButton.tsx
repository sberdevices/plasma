import styled from 'styled-components';
import { Button as BaseButton } from '@sberdevices/plasma-core';
import type { ButtonProps as BaseProps, SizeProps, ViewProps, PinProps } from '@sberdevices/plasma-core';

import { applyInteraction, InteractionProps } from '../../mixins';

type Pin = Extract<PinProps['pin'], 'square-square' | 'circle-circle'>;

/**
 * Интерфейс кнопки.
 */
export type ActionButtonProps = Omit<BaseProps, 'stretch' | 'pin'> &
    Partial<SizeProps<'l' | 'm' | 's'> & ViewProps & { pin: Pin }> &
    InteractionProps;

const downsize: Record<string, SizeProps['size']> = {
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
export const ActionButton = styled(BaseButton).attrs(({ size, ...rest }: ActionButtonProps) => {
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
    pin: 'square-square',
    view: 'secondary',
    size: 'm',
    square: true,
    outlined: true,
    scaleOnInteraction: true,
};
