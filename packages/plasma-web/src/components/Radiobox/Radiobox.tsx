import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { BaseboxInput, BaseboxDescription, white } from '@sberdevices/plasma-core';
import type { BaseboxProps } from '@sberdevices/plasma-core';

import {
    StyledRoot as CheckboxRoot,
    StyledTrigger as CheckboxTrigger,
    StyledContent as CheckboxContent,
    StyledLabel as CheckboxLabel,
} from '../Checkbox/Checkbox';

export interface RadioboxProps extends BaseboxProps {}

const StyledTrigger = styled(CheckboxTrigger)`
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
    input:checked ~ ${StyledTrigger} & {
        transform: scale(1);
    }
`;

/**
 * Переключатель, или *радиокнопка*.
 */
// eslint-disable-next-line prefer-arrow-callback
export const Radiobox = forwardRef<HTMLInputElement, RadioboxProps>(function Radiobox(
    { id, label, description, disabled, style, className, ...rest },
    ref,
) {
    return (
        <CheckboxRoot $disabled={disabled} style={style} className={className} htmlFor={id}>
            <BaseboxInput id={id} ref={ref} type="radio" disabled={disabled} {...rest} />
            <StyledTrigger>
                <StyledEllipse />
            </StyledTrigger>
            {label && (
                <CheckboxContent>
                    {label && <StyledLabel as="span">{label}</StyledLabel>}
                    {description && <BaseboxDescription mt={4}>{description}</BaseboxDescription>}
                </CheckboxContent>
            )}
        </CheckboxRoot>
    );
});
