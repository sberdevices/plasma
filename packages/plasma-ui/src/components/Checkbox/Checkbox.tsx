import React from 'react';
import styled, { css } from 'styled-components';
import {
    CheckboxProps as BaseProps,
    CheckboxRoot as BaseRoot,
    CheckboxInput as Input,
    CheckboxTrigger as BaseTrigger,
    CheckboxLabel as Label,
    CheckboxDescription as Description,
    applyDisabled,
} from '@sberdevices/plasma-core';
import { accent, white, secondary, transparent } from '@sberdevices/plasma-tokens';

import { InteractionProps } from '../../mixins';

import { IconDone } from './IconDone';

export interface CheckboxProps extends BaseProps, InteractionProps {}

export const Root = styled(BaseRoot)`
    ${applyDisabled};

    & + & {
        margin-top: 1.25rem;
    }
`;
export const Trigger = styled(BaseTrigger)<{
    $type: 'radio' | 'checkbox';
    $focused?: boolean;
    $scaleOnInteraction?: boolean;
}>`
    width: 1.25rem;
    height: 1.25rem;

    background: ${transparent};
    box-shadow: inset 0 0 0 0.125rem ${secondary};
    color: ${white};

    /* stylelint-disable-next-line selector-nested-pattern, selector-type-no-unknown */
    ${Input}:checked ~ & {
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

    ${({ $type, $focused }) => {
        const borderRadius = $type === 'checkbox' ? '0.25rem' : '1.25rem';
        const outlineRadius = $type === 'checkbox' ? '0.375rem' : '1.375rem';

        return css`
            border-radius: ${borderRadius};

            ${Input}:focus ~ & {
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
                border-radius: ${outlineRadius};

                transition: box-shadow 0.2s ease-in-out;

                pointer-events: none;
            }

            ${$focused &&
            css`
                border-color: transparent;

                &::before {
                    box-shadow: 0 0 0 0.125rem ${accent};
                }
            `}
        `;
    }}
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
    ${Input}:checked ~ ${BaseTrigger} & {
        transform: scale(1);
    }
`;

/**
 * Флажок или *чекбокс*. Позволяет пользователю управлять параметром с двумя состояниями — ☑ включено и ☐ отключено.
 */
// eslint-disable-next-line prefer-arrow-callback
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
    { id, label, description, scaleOnInteraction, focused, disabled, style, className, ...rest },
    ref,
) {
    return (
        <Root $disabled={disabled} $isDescription={!!description} style={style} className={className}>
            <Input id={id} ref={ref} type="checkbox" disabled={disabled} {...rest} />
            <Trigger $type="checkbox" $focused={focused} $scaleOnInteraction={scaleOnInteraction}>
                <StyledMark color="inherit" size="xs" />
            </Trigger>
            {label && <Label>{label}</Label>}
            {description && <Description>{description}</Description>}
        </Root>
    );
});
