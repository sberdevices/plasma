import styled, { css, InterpolationFunction } from 'styled-components';
import type { FieldProps, ThemeProps } from '@sberdevices/plasma-core';
import {
    FieldHelper as BaseHelper,
    primary,
    secondary,
    surfaceLiquid01,
    surfaceLiquid02,
} from '@sberdevices/plasma-core';

export const FieldHelper = styled(BaseHelper)`
    padding-left: 1rem;
    padding-right: 1rem;
`;

export const applyInputStyles: InterpolationFunction<ThemeProps & Pick<FieldProps, '$isFocused'>> = ({
    $isFocused,
}) => css`
    background-color: ${surfaceLiquid01};
    color: ${primary};

    transition: ${({ theme }) => (theme.lowPerformance ? 'unset' : 'background-color 0.1s ease-in-out')};

    &::placeholder {
        color: ${secondary};
    }

    &:focus:not(:read-only) {
        background-color: ${surfaceLiquid02};
    }

    ${$isFocused &&
    css`
        background-color: ${surfaceLiquid02};
    `}
`;
