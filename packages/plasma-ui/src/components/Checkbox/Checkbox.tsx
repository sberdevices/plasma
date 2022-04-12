import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import {
    BaseboxRoot,
    BaseboxInput,
    BaseboxTrigger,
    BaseboxContent,
    BaseboxContentWrapper,
    BaseboxLabel,
    BaseboxDescription,
    applyDisabled,
    useUniqId,
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
export const StyledInput = styled(BaseboxInput)`
    /* SberBox не видит этот элемент, нужно спрятать от глаз,
     * но сделать достаточно большим, чтобы сфокусироваться на нем. */
    appearance: none;
    width: 100%;
    height: 100%;
`;
export const StyledTrigger = styled(BaseboxTrigger)<{
    $focused?: boolean;
    $scaleOnInteraction?: boolean;
}>`
    --plasma-trigger-border-radius: 0.25rem;
    --plasma-trigger-outline-radius: 0.375rem;

    width: 1.25rem;
    height: 1.25rem;
    flex: 0 0 1.25rem;

    background: ${transparent};
    box-shadow: inset 0 0 0 0.125rem ${secondary};
    color: ${white};

    /* stylelint-disable-next-line selector-nested-pattern, selector-type-no-unknown */
    input:checked + label & {
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

        input:focus + label & {
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

            transition: ${({ theme }) => (theme.lowPerformance ? 'unset' : 'box-shadow 0.2s ease-in-out')};

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

    transition: ${({ theme }) => (theme.lowPerformance ? 'unset' : 'transform 0.1s ease-in-out')};
    transform: scale(0);

    /* stylelint-disable-next-line selector-nested-pattern, selector-type-no-unknown */
    input:checked + label ${StyledTrigger} & {
        transform: scale(1);
    }
`;
export const StyledContent = styled(BaseboxContent)`
    width: calc(100% - 2rem);
`;

/**
 * Флажок или *чекбокс*. Позволяет пользователю управлять параметром с двумя состояниями — ☑ включено и ☐ отключено.
 */
// eslint-disable-next-line prefer-arrow-callback
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
    { id, label, description, disabled, focused, scaleOnInteraction, style, className, ...rest },
    ref,
) {
    const uniqId = useUniqId();
    const uniqLabelId = useUniqId();
    const uniqDescriptionId = useUniqId();
    const checkboxId = id || uniqId;
    return (
        <StyledRoot $disabled={disabled} style={style} className={className} tabIndex={-1}>
            <StyledInput
                aria-labelledby={uniqLabelId}
                aria-describedby={uniqDescriptionId}
                id={checkboxId}
                ref={ref}
                type="checkbox"
                disabled={disabled}
                {...rest}
            />
            <BaseboxContentWrapper htmlFor={checkboxId}>
                <StyledTrigger $focused={focused} $scaleOnInteraction={scaleOnInteraction}>
                    <StyledMark color="inherit" size="xs" />
                </StyledTrigger>
                {label && (
                    <StyledContent>
                        <BaseboxLabel as="span" id={uniqLabelId}>
                            {label}
                        </BaseboxLabel>
                        {description && (
                            <BaseboxDescription mt={4} id={uniqDescriptionId}>
                                {description}
                            </BaseboxDescription>
                        )}
                    </StyledContent>
                )}
            </BaseboxContentWrapper>
        </StyledRoot>
    );
});
