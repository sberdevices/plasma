import { css, InterpolationFunction } from 'styled-components';
import { background, accent, tertiary, fieldStatuses } from '@sberdevices/plasma-core';
import type { FieldProps } from '@sberdevices/plasma-core';

import { inputBorder, inputBorderHover } from '../../tokens';

export const applyInputStyles: InterpolationFunction<Pick<FieldProps, 'status' | '$isFocused'>> = ({
    status,
    $isFocused,
}) => css`
    background-color: ${background};
    box-shadow: inset 0 0 0 1px ${inputBorder};
    border-radius: 0.25rem;

    transition: box-shadow 0.1s ease-in-out;

    &:hover {
        box-shadow: inset 0 0 0 1px ${inputBorderHover};
    }

    &:focus {
        box-shadow: inset 0 0 0 1px ${accent};
    }

    /* stylelint-disable-next-line selector-nested-pattern */
    &:disabled,
    &:read-only,
    &:read-only:focus {
        box-shadow: inset 0 0 0 1px ${inputBorder};
    }

    &::placeholder {
        color: ${tertiary};
    }

    ${status &&
    css`
        color: ${fieldStatuses[status]};

        &,
        &:hover,
        &:focus,
        &:disabled {
            box-shadow: inset 0 0 0 1px ${fieldStatuses[status]};
        }
    `}

    ${$isFocused &&
    css`
        box-shadow: inset 0 0 0 1px ${accent};
    `}
`;
