import React, { forwardRef, useMemo } from 'react';
import styled from 'styled-components';
import { BaseboxDescription, BaseboxContentWrapper, useUniqId, white } from '@sberdevices/plasma-core';
import type { BaseboxProps } from '@sberdevices/plasma-core';

import { extractTextFrom } from '../../utils';
import {
    StyledRoot as CheckboxRoot,
    StyledInput as CheckboxInput,
    StyledTrigger as CheckboxTrigger,
    StyledContent as CheckboxContent,
    StyledLabel as CheckboxLabel,
} from '../Checkbox/Checkbox';

export interface RadioboxProps extends BaseboxProps {}

const StyledTrigger = styled(CheckboxTrigger).attrs({
    outlineRadius: '1.125rem',
})`
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 1.125rem;
`;
const StyledLabel = styled(CheckboxLabel)`
    line-height: 1.625rem;
`;
const StyledEllipse = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    margin: auto;
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 0.625rem;

    background-color: ${white};
    transition: transform 0.3s ease-in-out;
    transform: scale(0);

    /* stylelint-disable-next-line selector-nested-pattern, selector-type-no-unknown */
    input:checked + label ${StyledTrigger} & {
        transform: scale(1);
    }
`;

/**
 * Переключатель, или *радиокнопка*.
 */
// eslint-disable-next-line prefer-arrow-callback
export const Radiobox = forwardRef<HTMLInputElement, RadioboxProps>(function Radiobox(
    { id, label, description, disabled, style, className, 'aria-label': ariaLabelExternal, ...rest },
    ref,
) {
    const uniqId = useUniqId();
    const uniqLabelId = useUniqId();
    const uniqDescriptionId = useUniqId();
    const radioboxId = id || uniqId;
    const ariaLabel = useMemo(() => ariaLabelExternal || extractTextFrom(label), [ariaLabelExternal, label]);

    return (
        <CheckboxRoot $disabled={disabled} style={style} className={className} tabIndex={-1}>
            <CheckboxInput
                {...rest}
                id={radioboxId}
                ref={ref}
                type="radio"
                disabled={disabled}
                aria-label={ariaLabel}
                aria-describedby={uniqDescriptionId}
            />
            <BaseboxContentWrapper htmlFor={radioboxId}>
                <StyledTrigger>
                    <StyledEllipse />
                </StyledTrigger>
                {label && (
                    <CheckboxContent>
                        <StyledLabel as="span" id={uniqLabelId} aria-hidden={typeof label === 'string'}>
                            {label}
                        </StyledLabel>
                        {description && (
                            <BaseboxDescription mt={4} id={uniqDescriptionId}>
                                {description}
                            </BaseboxDescription>
                        )}
                    </CheckboxContent>
                )}
            </BaseboxContentWrapper>
        </CheckboxRoot>
    );
});
