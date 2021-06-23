import React from 'react';
import styled from 'styled-components';
import {
    CheckboxProps as BaseProps,
    CheckboxRoot as BaseRoot,
    CheckboxInput as Input,
    CheckboxTrigger as BaseTrigger,
    CheckboxLabel as BaseLabel,
    CheckboxDescription as BaseDescription,
    accent,
    buttonSecondary,
    tertiary,
    white,
    transparent,
} from '@sberdevices/plasma-core';
import { useForkRef } from '@sberdevices/plasma-core/hooks';

import { Done, Indeterminate } from './Icons';

export interface CheckboxProps extends BaseProps {
    /**
     * Неопределенное состояние компонента - когда часть потомков не выбрана.
     */
    indeterminate?: boolean;
}

export const Root = styled(BaseRoot)<{ $disabled?: boolean }>`
    align-items: center;
    /* stylelint-disable-next-line number-max-precision */
    margin-left: 0.1875rem;

    ${({ $disabled }) => $disabled && 'cursor: not-allowed'}
`;
export const Trigger = styled(BaseTrigger)`
    /* stylelint-disable-next-line number-max-precision */
    margin: 0.1875rem 0;
    width: 1.125rem;
    height: 1.125rem;

    background: ${transparent};
    border: 0.125rem solid ${tertiary};
    border-radius: 0.25rem;
    color: ${tertiary};

    /* stylelint-disable-next-line */
    ${Input}[type="checkbox"]:indeterminate ~ & {
        background: ${transparent};
        border-color: ${accent};
        color: ${accent};
    }

    /* stylelint-disable-next-line */
    ${Input}:disabled ~ & {
        background: ${buttonSecondary};
        border-color: ${transparent};
        color: ${transparent};
        cursor: inherit;
    }

    /* stylelint-disable-next-line */
    ${Input}:checked ~ & {
        background: ${accent};
        border-color: ${accent};
        color: ${white};
    }

    /* stylelint-disable-next-line */
    ${Input}:checked:disabled ~ & {
        background: ${buttonSecondary};
        border-color: ${transparent};
        color: ${tertiary};
    }
`;
export const Label = styled(BaseLabel)`
    margin-left: 0.875rem;

    /* stylelint-disable-next-line */
    ${Input}:disabled ~ & {
        opacity: 0.4;
    }
`;
export const Description = styled(BaseDescription)`
    margin-bottom: 1.125rem;

    /* stylelint-disable-next-line */
    ${Input}:disabled ~ & {
        opacity: 0.4;
    }
`;
const StyledDone = styled(Done)`
    position: absolute;
    top: -0.125rem;
    left: -0.125rem;

    transform: scale(0);
    transition: transform 0.15s ease-in-out;

    /* stylelint-disable-next-line */
    ${Input}:checked ~ ${BaseTrigger} & {
        transform: scale(1);
    }
`;
const StyledIndeterminate = styled(Indeterminate)`
    position: absolute;
    top: -0.125rem;
    left: -0.125rem;
`;

/**
 * Флажок или *чекбокс*. Позволяет пользователю управлять параметром с двумя состояниями — ☑ включено и ☐ отключено.
 */
// eslint-disable-next-line prefer-arrow-callback
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
    { id, label, description, indeterminate, disabled, style, className, ...rest },
    ref,
) {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const forkRef = useForkRef(inputRef, ref);

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.indeterminate = Boolean(indeterminate);
        }
    }, [inputRef, indeterminate]);

    return (
        <Root $disabled={disabled} htmlFor={id} style={style} className={className}>
            <Input id={id} ref={forkRef} type="checkbox" disabled={disabled} {...rest} />
            <Trigger>{indeterminate ? <StyledIndeterminate /> : <StyledDone />}</Trigger>
            {label && <Label>{label}</Label>}
            {description && <Description>{description}</Description>}
        </Root>
    );
});
