import React from 'react';
import styled from 'styled-components';
import { CheckboxProps as BaseProps, CheckboxInput as Input, white } from '@sberdevices/plasma-core';

import { Root, Trigger, Label, Description } from '../Checkbox/Checkbox';

export interface RadioboxProps extends BaseProps {}

const StyledTrigger = styled(Trigger)`
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 1.125rem;
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
    transition: transform 0.15s ease-in-out;
    transform: scale(0);

    /* stylelint-disable-next-line selector-nested-pattern, selector-type-no-unknown */
    ${Input}:checked ~ ${Trigger} & {
        transform: scale(1);
    }
`;

/**
 * Переключатель, или *радиокнопка*.
 */
// eslint-disable-next-line prefer-arrow-callback
export const Radiobox = React.forwardRef<HTMLInputElement, RadioboxProps>(function Radiobox(
    { id, label, description, disabled, style, className, ...rest },
    ref,
) {
    return (
        <Root $disabled={disabled} $isDescription={!!description} htmlFor={id} style={style} className={className}>
            <Input id={id} ref={ref} type="radio" disabled={disabled} {...rest} />
            <StyledTrigger>
                <StyledEllipse />
            </StyledTrigger>
            {label && <Label>{label}</Label>}
            {description && <Description>{description}</Description>}
        </Root>
    );
});
