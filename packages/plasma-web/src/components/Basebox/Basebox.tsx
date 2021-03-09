import { css, InterpolationFunction } from 'styled-components';
import type { BaseboxProps } from '@sberdevices/plasma-core/components/Basebox';
import { tertiary, transparent } from '@sberdevices/plasma-tokens-web';

/**
 * Input-type agnostic mixin for "boolean" inputs.
 */
export const basebox: InterpolationFunction<Omit<BaseboxProps, 'type'>> = () => css`
    --plasma-basebox-trigger-border: ${tertiary};
    --plasma-basebox-trigger-disabled-background: rgba(0, 0, 0, 0.08);
    --plasma-basebox-trigger-disabled-border: ${transparent};
    --plasma-basebox-trigger-checked-disabled-background: rgba(0, 0, 0, 0.08);
    --plasma-basebox-trigger-checked-disabled-border: ${transparent};
    --plasma-basebox-trigger-checked-disabled-color: ${tertiary};
`;
