import { css, InterpolationFunction } from 'styled-components';

export interface DisabledProps {
    /**
     * Компонент неактивен
     */
    disabled?: boolean;
}

/**
 * Миксин неактивной кнопки
 */
export const applyDisabled: InterpolationFunction<DisabledProps> = ({ disabled }) => css`
    &:disabled {
        opacity: 0.4;

        &:hover,
        &:active {
            transform: none;
        }
    }

    ${disabled &&
    css`
        opacity: 0.4;

        &:hover,
        &:active {
            transform: none;
        }
    `}
`;
