import { css, InterpolationFunction } from 'styled-components';

export interface DisabledProps {
    /**
     * Компонент неактивен
     */
    disabled?: boolean;
}

const disabledCss = css`
    opacity: 0.4;
    cursor: not-allowed;

    /* stylelint-disable-next-line selector-nested-pattern */
    &:hover,
    &:active {
        transform: none;
    }
`;

/**
 * Миксин неактивной кнопки
 */
export const applyDisabled: InterpolationFunction<DisabledProps & { $disabled?: boolean }> = ({
    disabled,
    $disabled,
}) => css`
    &:disabled {
        ${disabledCss}
    }

    ${(disabled || $disabled) && disabledCss}
`;
