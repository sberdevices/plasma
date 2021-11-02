import styled from 'styled-components';

import { applyEllipsis } from '../../mixins';
import type { InputHTMLAttributes } from '../../types';
import type { FieldProps } from '../Field';

import { applyInputStyles, StyledInputProps } from './Input.mixins';

export interface InputProps extends FieldProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * Видимая ширина поля в символах.
     */
    htmlSize?: InputHTMLAttributes<HTMLInputElement>['size'];
}

/**
 * Base input.
 */
export const Input = styled.input<StyledInputProps>`
    ${applyInputStyles}
    ${applyEllipsis}
`;
