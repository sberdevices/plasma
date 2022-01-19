import styled from 'styled-components';
import {
    createButton,
    ButtonRoot,
    getButtonSizesMixin,
    buttonViews,
    applyNoSelect,
    button2,
    caption,
} from '@sberdevices/plasma-core';
import type { ButtonProps as BaseProps, ButtonSizeProps, ButtonViewProps, PinProps } from '@sberdevices/plasma-core';

import { applyInteraction, InteractionProps } from '../../mixins';

export type ActionButtonProps = Omit<BaseProps, 'stretch' | 'pin'> &
    Partial<ButtonSizeProps> &
    Partial<ButtonViewProps> &
    InteractionProps & { pin?: Extract<PinProps['pin'], 'square-square' | 'circle-circle'> };

const buttonSizes = {
    l: {
        height: '2.25rem',
        paddingY: '0.5rem',
        paddingX: '0.625rem',
        paddingXContent: '0.625rem',
        paddingXResizable: '1.25',
        squareRadius: '0.625rem',
        sOutlineRadius: '0.75rem',
        circleRadius: '1.125rem',
        cOutlineRadius: '1.25rem',
    },
    m: {
        height: '2rem',
        paddingY: '0.4375rem',
        paddingX: '0.5rem',
        paddingXContent: '0.5rem',
        paddingXResizable: '0.875rem',
        squareRadius: '0.5625rem',
        sOutlineRadius: '0.6875rem',
        circleRadius: '1rem',
        cOutlineRadius: '1.125rem',
    },
    s: {
        height: '1.75rem',
        paddingY: '0.3125rem',
        paddingX: '0.375rem',
        paddingXContent: '0.375rem',
        paddingXResizable: '0.875rem',
        squareRadius: '0.5rem',
        sOutlineRadius: '0.625rem',
        circleRadius: '0.875rem',
        cOutlineRadius: '1rem',
    },
};
const buttonTypography = {
    xs: button2,
    xxs: caption,
    xxxs: caption,
};

const applySizes = getButtonSizesMixin(buttonSizes, buttonTypography);
const applyViews = ({ view }: ButtonViewProps) => buttonViews[view];

const StyledButtonRoot = styled(ButtonRoot)<InteractionProps>`
    ${applySizes}
    ${applyViews}
    ${applyInteraction}
    ${applyNoSelect}
`;

/**
 * Кнопка для размещения внутри карточек.
 * Упрощенная версия ``Button`` для создания квадратных кнопок (с соотношением сторон 1:1).
 * Размеры ``ActionButton`` меньше размеров ``Button``.
 * Обладает теми же цветами, размерами и модификаторами, что и основная кнопка.
 */
export const ActionButton = createButton<HTMLButtonElement, ActionButtonProps>(StyledButtonRoot);

ActionButton.defaultProps = {
    size: 'm',
    view: 'secondary',
    pin: 'square-square',
    square: true,
    outlined: true,
    scaleOnInteraction: true,
};
