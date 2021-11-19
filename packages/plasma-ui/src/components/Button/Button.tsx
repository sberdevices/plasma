import styled from 'styled-components';
import { createButton, ButtonRoot, applyNoSelect } from '@sberdevices/plasma-core';
import type {
    ButtonProps as BaseProps,
    ButtonContentProps,
    ButtonSizeProps,
    ButtonViewProps,
} from '@sberdevices/plasma-core';

import { applyInteraction, InteractionProps } from '../../mixins';

import { applySizes, applyViews } from './Button.mixins';

export type ButtonProps = BaseProps &
    ButtonContentProps &
    Partial<ButtonSizeProps> &
    Partial<ButtonViewProps> &
    InteractionProps;

const StyledButtonRoot = styled(ButtonRoot)<InteractionProps>`
    ${applySizes}
    ${applyViews}
    ${applyInteraction}
    ${applyNoSelect}
`;

/**
 * Основной компонент для отображения кнопок.
 * Поддерживает несколько режимов отображения (`view`) и размеров (`size`).
 */
export const Button = createButton<HTMLButtonElement, ButtonProps>(StyledButtonRoot);

Button.defaultProps = {
    size: 'l',
    view: 'secondary',
    pin: 'square-square',
    outlined: true,
    scaleOnInteraction: true,
};
