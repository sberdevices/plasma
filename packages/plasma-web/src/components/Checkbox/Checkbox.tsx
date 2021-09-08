import React, { forwardRef, useRef } from 'react';
import styled from 'styled-components';
import {
    BaseboxRoot,
    BaseboxInput,
    BaseboxTrigger,
    BaseboxContent,
    BaseboxLabel,
    BaseboxDescription,
    accent,
    buttonSecondary,
    tertiary,
    white,
    transparent,
    useForkRef,
} from '@sberdevices/plasma-core';
import type { BaseboxProps } from '@sberdevices/plasma-core';

import { Done, Indeterminate } from './Icons';

export interface CheckboxProps extends BaseboxProps {
    /**
     * Неопределенное состояние компонента - когда часть потомков не выбрана.
     */
    indeterminate?: boolean;
}

export const StyledRoot = styled(BaseboxRoot)<{ $disabled?: boolean }>`
    /* stylelint-disable-next-line number-max-precision */
    margin-left: 0.1875rem; /* FixMe: Выпилить, v2.0 Привести к единому стилю с UI */
    /* stylelint-disable-next-line number-max-precision */
    margin-bottom: 0.1875rem; /* FixMe: Выпилить, v2.0 Привести к единому стилю с UI */

    ${({ $disabled }) => $disabled && 'cursor: not-allowed;'}
`;
export const StyledTrigger = styled(BaseboxTrigger)`
    /* stylelint-disable-next-line number-max-precision */
    margin: 0.1875rem 0; /* FixMe: Выпилить, v2.0 Привести к единому стилю с UI */
    width: 1.125rem;
    height: 1.125rem;

    background: ${transparent};
    border: 0.125rem solid ${tertiary};
    border-radius: 0.25rem;
    color: ${tertiary};

    /* stylelint-disable-next-line */
    input[type='checkbox']:indeterminate ~ & {
        background: ${transparent};
        border-color: ${accent};
        color: ${accent};
    }

    /* stylelint-disable-next-line */
    input:disabled ~ & {
        background: ${buttonSecondary};
        border-color: ${transparent};
        color: ${transparent};
        cursor: inherit;
    }

    /* stylelint-disable-next-line */
    input:checked ~ & {
        background: ${accent};
        border-color: ${accent};
        color: ${white};
    }

    /* stylelint-disable-next-line */
    input:checked:disabled ~ & {
        background: ${buttonSecondary};
        border-color: ${transparent};
        color: ${tertiary};
    }
`;
export const StyledContent = styled(BaseboxContent)`
    margin-left: 0.875rem;
`;
export const StyledLabel = styled(BaseboxLabel)`
    line-height: 1.5rem;

    /* stylelint-disable-next-line */
    input:disabled ~ ${StyledContent} & {
        opacity: 0.4;
    }
`;
export const StyledDescription = styled(BaseboxDescription)`
    /* stylelint-disable-next-line */
    input:disabled ~ & {
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
    input:checked ~ ${BaseboxTrigger} & {
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
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
    { id, label, description, indeterminate, disabled, style, className, ...rest },
    ref,
) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const forkRef = useForkRef(inputRef, ref);

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.indeterminate = Boolean(indeterminate);
        }
    }, [inputRef, indeterminate]);

    return (
        <StyledRoot $disabled={disabled} style={style} className={className} htmlFor={id}>
            <BaseboxInput id={id} ref={forkRef} type="checkbox" {...rest} />
            <StyledTrigger>{indeterminate ? <StyledIndeterminate /> : <StyledDone />}</StyledTrigger>
            {label && (
                <StyledContent>
                    {label && <StyledLabel as="span">{label}</StyledLabel>}
                    {description && <BaseboxDescription mt={4}>{description}</BaseboxDescription>}
                </StyledContent>
            )}
        </StyledRoot>
    );
});
