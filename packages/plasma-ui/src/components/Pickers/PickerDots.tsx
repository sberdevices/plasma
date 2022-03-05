import styled, { css, SimpleInterpolation } from 'styled-components';
import { accent } from '@sberdevices/plasma-tokens';

import { DEFAULT_PICKER_SIZE } from './types';
import type { PickerSize } from './types';

const sizes: Record<PickerSize, SimpleInterpolation> = {
    l: css`
        width: 0.25rem;

        &::before,
        &::after {
            width: 0.25rem;
            height: 0.25rem;
        }

        &::before {
            margin-top: -0.625rem;
        }

        &::after {
            margin-top: 0.375rem;
        }
    `,
    s: css`
        width: 0.25rem;

        &::before,
        &::after {
            width: 0.25rem;
            height: 0.25rem;
        }

        /* stylelint-disable number-max-precision */
        &::before {
            margin-top: -0.3125rem;
        }

        &::after {
            margin-top: 0.1875rem;
        }
        /* stylelint-enable number-max-precision */
    `,
    xs: css`
        /* stylelint-disable number-max-precision */
        width: 0.1875rem;

        &::before,
        &::after {
            width: 0.1875rem;
            height: 0.1875rem;
        }

        &::before {
            margin-top: -0.3125rem;
        }

        &::after {
            margin-top: 0.1875rem;
        }
        /* stylelint-enable number-max-precision */
    `,
};

export const PickerDots = styled.div<{ $size?: PickerSize }>`
    position: relative;
    margin-left: 0.375rem;
    margin-right: 0.375rem;

    /* stylelint-disable-next-line selector-nested-pattern */
    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        background-color: ${accent};
        border-radius: 50%;
    }

    ${({ $size = DEFAULT_PICKER_SIZE }) => sizes[$size]}
`;
