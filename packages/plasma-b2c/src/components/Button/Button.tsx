import styled from 'styled-components';
import { convertRoundnessMatrix } from '@sberdevices/plasma-core';
import { Button as BaseButton, ButtonProps } from '@sberdevices/plasma-web';

/**
 * Кнопка.
 * Поддерживает текстовое и контентное наполнение.
 */
export const Button = styled(BaseButton)<ButtonProps>`
    border-radius: ${({ pin }: ButtonProps) => convertRoundnessMatrix(pin, '0.75rem', '1.75rem')};
`;
