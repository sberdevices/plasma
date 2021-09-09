import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import {
    BaseboxRoot,
    BaseboxInput,
    BaseboxTrigger,
    BaseboxContent,
    BaseboxLabel,
    BaseboxDescription,
    applyDisabled,
} from '@sberdevices/plasma-core';
import type { BaseboxProps, FocusProps, OutlinedProps } from '@sberdevices/plasma-core';
import { accent, white, secondary, transparent } from '@sberdevices/plasma-tokens';

import { InteractionProps } from '../../mixins';

import { IconDone } from './IconDone';

export interface CheckboxProps extends BaseboxProps, FocusProps, OutlinedProps, InteractionProps {}

export const StyledRoot = styled(BaseboxRoot)`
    ${applyDisabled};

    & + & {
        margin-top: 1.25rem;
    }
`;
export const StyledTrigger = styled(BaseboxTrigger)<{
    $focused?: boolean;
    $scaleOnInteraction?: boolean;
}>`
    --plasma-trigger-border-radius: 0.25rem;
    --plasma-trigger-outline-radius: 0.375rem;

    width: 1.25rem;
    height: 1.25rem;

    background: ${transparent};
    box-shadow: inset 0 0 0 0.125rem ${secondary};
    color: ${white};

    /* stylelint-disable-next-line selector-nested-pattern, selector-type-no-unknown */
    input:checked ~ & {
        background: ${accent};
        box-shadow: inset 0 0 0 0.125rem ${accent};
    }

    ${({ $scaleOnInteraction }) =>
        $scaleOnInteraction &&
        css`
            &:hover {
                transform: scale(1.04);
            }

            &:active {
                transform: scale(0.96);
            }
        `}

    ${({ $focused }) => css`
        border-radius: var(--plasma-trigger-border-radius);

        input:focus ~ & {
            box-shadow: none;

            &::before {
                box-shadow: 0 0 0 0.125rem ${accent};
            }
        }

        &::before {
            content: '';

            position: absolute;
            top: -0.125rem;
            left: -0.125rem;
            right: -0.125rem;
            bottom: -0.125rem;

            display: block;

            border: 0.125rem solid transparent;
            border-radius: var(--plasma-trigger-outline-radius);

            transition: box-shadow 0.2s ease-in-out;

            pointer-events: none;
        }

        ${$focused &&
        css`
            box-shadow: none;

            &::before {
                box-shadow: 0 0 0 0.125rem ${accent};
            }
        `}
    `}
`;
const StyledMark = styled(IconDone)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    margin: auto;
    width: 1rem;
    height: 1rem;

    transition: transform 0.1s ease-in-out;
    transform: scale(0);

    /* stylelint-disable-next-line selector-nested-pattern, selector-type-no-unknown */
    input:checked ~ ${StyledTrigger} & {
        transform: scale(1);
    }
`;

/**
 * Флажок или *чекбокс*. Позволяет пользователю управлять параметром с двумя состояниями — ☑ включено и ☐ отключено.
 */
// eslint-disable-next-line prefer-arrow-callback
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
    { id, label, description, disabled, focused, scaleOnInteraction, style, className, ...rest },
    ref,
) {
    return (
        <StyledRoot $disabled={disabled} style={style} className={className} htmlFor={id}>
            <BaseboxInput id={id} ref={ref} type="checkbox" {...rest} />
            <StyledTrigger $focused={focused} $scaleOnInteraction={scaleOnInteraction}>
                <StyledMark color="inherit" size="xs" />
            </StyledTrigger>
            {label && (
                <BaseboxContent>
                    {label && <BaseboxLabel as="span">{label}</BaseboxLabel>}
                    {description && <BaseboxDescription mt={4}>{description}</BaseboxDescription>}
                </BaseboxContent>
            )}
        </StyledRoot>
    );
});
