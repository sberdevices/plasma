import React, { forwardRef, useRef, useMemo } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import {
    BaseboxRoot,
    BaseboxInput,
    BaseboxTrigger,
    BaseboxContent,
    BaseboxContentWrapper,
    BaseboxLabel,
    BaseboxDescription,
    accent,
    buttonSecondary,
    tertiary,
    white,
    transparent,
    useForkRef,
    useUniqId,
    addFocus,
} from '@sberdevices/plasma-core';
import type { BaseboxProps } from '@sberdevices/plasma-core';

import { extractTextFrom } from '../../utils';

import { Done, Indeterminate } from './Icons';

export interface CheckboxProps extends BaseboxProps {
    /**
     * Неопределенное состояние компонента - когда часть потомков не выбрана.
     */
    indeterminate?: boolean;
}

export const syntheticFocus = (ruleset: FlattenSimpleInterpolation, focused?: boolean) => css`
    input[data-focus-visible-added] + label & {
        outline: none;
        ${ruleset}
    }

    ${focused && ruleset};
`;
export const StyledRoot = styled(BaseboxRoot)<{ $disabled?: boolean }>`
    /* stylelint-disable-next-line number-max-precision */
    margin-left: 0.1875rem; /* FixMe: Выпилить, v2.0 Привести к единому стилю с UI */
    /* stylelint-disable-next-line number-max-precision */
    margin-bottom: 0.1875rem; /* FixMe: Выпилить, v2.0 Привести к единому стилю с UI */

    ${({ $disabled }) => $disabled && 'cursor: not-allowed;'}
`;
export const StyledInput = styled(BaseboxInput)`
    /* Спрятать от IE */
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
`;

export const StyledTrigger = styled(BaseboxTrigger)<{ outlineRadius?: string }>`
    /* stylelint-disable-next-line number-max-precision */
    margin: 0.1875rem 0; /* FixMe: Выпилить, v2.0 Привести к единому стилю с UI */
    width: 1.125rem;
    height: 1.125rem;

    background: ${transparent};
    border: 0.125rem solid ${tertiary};
    border-radius: 0.25rem;
    color: ${tertiary};
    flex-shrink: 0;
    flex-grow: 0;

    /* stylelint-disable-next-line */
    input[type='checkbox']:indeterminate + label & {
        background: ${transparent};
        border-color: ${accent};
        color: ${accent};
    }

    /* stylelint-disable-next-line */
    input:disabled + label & {
        background: ${buttonSecondary};
        border-color: ${transparent};
        color: ${transparent};
        cursor: inherit;
    }

    /* stylelint-disable-next-line */
    input:checked + label & {
        background: ${accent};
        border-color: ${accent};
        color: ${white};
    }

    /* stylelint-disable-next-line */
    input:checked:disabled + label & {
        background: ${buttonSecondary};
        border-color: ${transparent};
        color: ${tertiary};
    }

    ${({ outlineRadius = '0.25rem' }) => css`
        ${addFocus({
            synthesizeFocus: syntheticFocus,
            outlineOffset: '0.25rem',
            outlineRadius,
        })}
    `}
`;
export const StyledContent = styled(BaseboxContent)`
    margin-left: 0.875rem;

    /* stylelint-disable-next-line */
    input:disabled + label & {
        opacity: 0.4;
    }
`;
export const StyledLabel = styled(BaseboxLabel)`
    line-height: 1.5rem;
`;
export const StyledDescription = styled(BaseboxDescription)`
    /* stylelint-disable-next-line */
    input:disabled + label & {
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
    input:checked + label ${BaseboxTrigger} & {
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
    { id, label, description, indeterminate, disabled, style, className, 'aria-label': ariaLabelExternal, ...rest },
    ref,
) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const forkRef = useForkRef(inputRef, ref);

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.indeterminate = Boolean(indeterminate);
        }
    }, [inputRef, indeterminate]);

    const uniqId = useUniqId();
    const uniqLabelId = useUniqId();
    const uniqDescriptionId = useUniqId();
    const checkboxId = id || uniqId;
    const ariaLabel = useMemo(() => ariaLabelExternal || extractTextFrom(label), [ariaLabelExternal, label]);

    return (
        <StyledRoot $disabled={disabled} style={style} className={className} tabIndex={-1}>
            <StyledInput
                {...rest}
                id={checkboxId}
                ref={forkRef}
                type="checkbox"
                disabled={disabled}
                aria-label={ariaLabel}
                aria-describedby={uniqDescriptionId}
            />
            <BaseboxContentWrapper htmlFor={checkboxId}>
                <StyledTrigger>{indeterminate ? <StyledIndeterminate /> : <StyledDone />}</StyledTrigger>
                {label && (
                    <StyledContent>
                        <StyledLabel as="span" id={uniqLabelId} aria-hidden={typeof label === 'string'}>
                            {label}
                        </StyledLabel>
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
