import { css, InterpolationFunction } from 'styled-components';
import { BaseboxTrigger } from '@sberdevices/plasma-core';
import type { BaseboxProps } from '@sberdevices/plasma-core';
import { accent, secondary, white, transparent } from '@sberdevices/plasma-tokens';

import type { InteractionProps } from '../../mixins';

/**
 * Input-type agnostic mixin for "boolean" inputs.
 */
export const basebox: InterpolationFunction<Omit<BaseboxProps, 'type' | 'description'> & InteractionProps> = ({
    scaleOnInteraction,
}) => css`
    --plasma-basebox-trigger-border: ${secondary};
    --plasma-basebox-trigger-disabled-background: ${transparent};
    --plasma-basebox-trigger-disabled-border: ${secondary};
    --plasma-basebox-trigger-checked-disabled-background: ${accent};
    --plasma-basebox-trigger-checked-disabled-border: ${accent};
    --plasma-basebox-trigger-checked-disabled-color: ${white};

    ${scaleOnInteraction &&
    css`
        ${BaseboxTrigger}:hover {
            transform: scale(1.04);
        }

        ${BaseboxTrigger}:active {
            transform: scale(0.96);
        }
    `}
`;
