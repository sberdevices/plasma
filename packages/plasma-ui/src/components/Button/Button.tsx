import styled from 'styled-components';
import { Button as BaseButton } from '@sberdevices/plasma-core';
import type { ButtonProps as BaseProps, SizeProps, ViewProps, ButtonContentProps } from '@sberdevices/plasma-core';

import { applyInteraction, InteractionProps } from '../../mixins';

export type ButtonProps = BaseProps &
    Partial<SizeProps<'l' | 'm' | 's'> & ViewProps> &
    InteractionProps &
    ButtonContentProps;

/**
 * Основной компонент для создания кнопок.
 */
export const Button = styled(BaseButton)<ButtonProps>`
    ${applyInteraction}
`;

Button.defaultProps = {
    ...BaseButton.defaultProps,
    view: 'secondary',
    size: 'l',
    outlined: true,
    scaleOnInteraction: true,
};
