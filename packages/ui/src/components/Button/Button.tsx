import styled from 'styled-components';
import { Button as BaseButton, ButtonProps as BaseButtonProps } from '@sberdevices/plasma-core/components/Button';

import { applyInteraction, InteractionProps } from '../../mixins';

export type ButtonProps = BaseButtonProps<'l' | 'm' | 's'> & InteractionProps;

/**
 * Основной компонент для создания кнопок.
 */
export const Button = styled(BaseButton)<ButtonProps>`
    ${applyInteraction}
`;

Button.defaultProps = {
    ...BaseButton.defaultProps,
    size: 'l',
    outlined: true,
    scaleOnInteraction: true,
};
