import styled from 'styled-components';
import { Button as BaseButton } from '@sberdevices/plasma-core/components/Button';
import type { ButtonProps as BaseProps, SizeProps, ViewProps } from '@sberdevices/plasma-core/components/Button/Button';

import { applyInteraction, InteractionProps } from '../../mixins';

/**
 * Интерфейс кнопки.
 */
export type ActionButtonProps = BaseProps & Partial<SizeProps<'l' | 'm' | 's'> & ViewProps> & InteractionProps;

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
    ...BaseButton.defaultProps,
    view: 'secondary',
    size: 'm',
    outlined: true,
    scaleOnInteraction: true,
};
