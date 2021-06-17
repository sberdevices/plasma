import styled, { css, InterpolationFunction } from 'styled-components';
import { TextFieldProps, TextFieldContent } from '@sberdevices/plasma-core';
import {
    secondary,
    background,
    accent,
    success,
    warning,
    critical,
    inputBorder,
    inputBorderHover,
} from '@sberdevices/plasma-tokens-web';

const statuses = {
    success,
    warning,
    error: critical,
};

const applyInputStatus: InterpolationFunction<Pick<TextFieldProps, 'status'>> = ({ status }) =>
    status &&
    css`
        caret-color: ${statuses[status]};
        border-color: ${statuses[status]};
        color: ${statuses[status]};

        &:focus {
            border-color: ${statuses[status]};
        }

        /* stylelint-disable-next-line selector-nested-pattern */
        &:hover,
        &:disabled {
            border-color: ${statuses[status]};
        }
    `;

export const FieldInput = styled.input<Pick<TextFieldProps, 'status'> & { $isFocused?: boolean }>`
    background: ${background};
    border-color: ${inputBorder};
    border-radius: 0.25rem;

    &:hover {
        border-color: ${inputBorderHover};
    }

    &:focus {
        border-color: ${accent};
    }

    /* stylelint-disable-next-line selector-nested-pattern */
    &:disabled,
    &:read-only,
    &:read-only:focus {
        border-color: ${inputBorder};
    }

    ${({ $isFocused }) =>
        $isFocused &&
        css`
            border-color: ${accent};
        `}

    ${applyInputStatus}
`;
export const FieldContent = styled(TextFieldContent)`
    ${({ pos }) => (pos === 'left' ? 'left: 0.75rem' : 'right: 0.75rem')};
`;
export const FieldHelperBlock = styled.div`
    color: ${secondary};
`;
