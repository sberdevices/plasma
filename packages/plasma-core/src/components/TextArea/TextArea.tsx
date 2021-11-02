import styled, { css } from 'styled-components';

import type { TextareaHTMLAttributes, TextareaResize } from '../../types';
import type { FieldProps } from '../Field';
import { applyInputStyles } from '../Input/Input.mixins';

export interface TextAreaProps extends Omit<FieldProps, 'contentLeft'>, TextareaHTMLAttributes<HTMLTextAreaElement> {
    /**
     * Изменение размера текстового поля.
     */
    resize?: TextareaResize;
}

/**
 * Base textarea.
 */
export const TextArea = styled.textarea<Pick<TextAreaProps, 'resize' | 'status'>>`
    ${applyInputStyles}

    display: block;
    height: 9.375rem; /* 150px */
    min-height: 3.5rem; /* 56px */

    ${({ resize }) =>
        css`
            ${resize && `resize: ${resize};`}
            ${resize !== 'both' && resize !== 'horizontal' && 'min-width: 100%;max-width: 100%;'}
        `}
`;
