import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { BaseboxLabel, BaseboxDescription, BaseboxContentWrapper, useUniqId } from '@sberdevices/plasma-core';
import type { BaseboxProps, FocusProps, OutlinedProps } from '@sberdevices/plasma-core';
import { white } from '@sberdevices/plasma-tokens';

import { InteractionProps } from '../../mixins';
import {
    StyledRoot as CheckboxRoot,
    StyledInput as CheckboxInput,
    StyledTrigger as CheckboxTrigger,
    StyledContent as CheckboxContent,
} from '../Checkbox/Checkbox';

export interface RadioboxProps extends BaseboxProps, FocusProps, OutlinedProps, InteractionProps {}

const StyledTrigger = styled(CheckboxTrigger)`
    --plasma-trigger-border-radius: 1.25rem;
    --plasma-trigger-outline-radius: 1.375rem;
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

    transition: ${({ theme }) => (theme.lowPerformance ? 'unset' : 'transform 0.3s ease-in-out')};
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
    { id, label, description, disabled, focused, scaleOnInteraction, style, className, ...rest },
    ref,
) {
    const uniqId = useUniqId();
    const uniqLabelId = useUniqId();
    const uniqDescriptionId = useUniqId();
    const radioboxId = id || uniqId;
    return (
        <CheckboxRoot $disabled={disabled} style={style} className={className} tabIndex={-1}>
            <CheckboxInput
                aria-labelledby={uniqLabelId}
                aria-describedby={uniqDescriptionId}
                id={radioboxId}
                ref={ref}
                type="radio"
                disabled={disabled}
                {...rest}
            />
            <BaseboxContentWrapper htmlFor={radioboxId}>
                <StyledTrigger $focused={focused} $scaleOnInteraction={scaleOnInteraction}>
                    <StyledEllipse />
                </StyledTrigger>
                {label && (
                    <CheckboxContent>
                        <BaseboxLabel as="span" id={uniqLabelId}>
                            {label}
                        </BaseboxLabel>
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
