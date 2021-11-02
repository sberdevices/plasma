import { css, InterpolationFunction } from 'styled-components';

import { accent, tertiary } from '../../tokens';
import { fieldStatuses } from '../Field';
import type { FieldProps } from '../Field';

export interface StyledInputProps extends Pick<FieldProps, 'status'> {
    $size?: FieldProps['size'];
}

export const applyInputStyles: InterpolationFunction<StyledInputProps> = ({ status, $size = 'm' }) => css`
    box-sizing: border-box;

    width: 100%;
    border: 0 none;

    caret-color: ${status ? fieldStatuses[status] : accent};

    font: inherit;
    line-height: inherit;
    letter-spacing: inherit;

    &:focus {
        outline: none;
    }

    &:disabled {
        cursor: inherit;
    }

    /* stylelint-disable-next-line selector-nested-pattern */
    &[readonly] {
        cursor: default;
        box-shadow: none;
        color: ${tertiary};
    }

    ${$size === 'l'
        ? css`
              height: 3.5rem;
              padding: 1.125rem 1rem;

              &:not(:placeholder-shown) {
                  padding-top: 1.5rem;
                  padding-bottom: 0.375rem;
              }

              &::placeholder {
                  color: transparent;
              }
          `
        : css`
              height: 3rem;
              padding: 0.875rem 1rem;
          `}
`;
