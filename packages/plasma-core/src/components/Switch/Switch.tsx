import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

import { body1 } from '../../tokens';
import { applyDisabled, addFocus, shadows, applyEllipsis } from '../../mixins';
import type { DisabledProps, FocusProps, OutlinedProps } from '../../mixins';
import type { InputHTMLAttributes } from '../../types';
import type { Item } from '../Basebox/Basebox';

interface PressedProps {
    pressed?: boolean;
}

export interface SwitchProps
    extends Item,
        DisabledProps,
        PressedProps,
        FocusProps,
        OutlinedProps,
        Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange' | 'onFocus' | 'onBlur'>,
        Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {}

const StyledRoot = styled.label<DisabledProps>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    ${applyDisabled}
`;
const StyledInput = styled.input`
    position: absolute;
    opacity: 0;

    &:focus {
        outline: 0 none;
    }
`;

const synthesizeFocus = (ruleset: FlattenSimpleInterpolation, focused?: boolean) => css`
    /* stylelint-disable-next-line selector-nested-pattern, selector-type-no-unknown */
    ${StyledInput}:focus ~ & {
        ${ruleset};
    }

    ${focused && ruleset};
`;

const StyledTrigger = styled.div<DisabledProps & PressedProps & FocusProps & OutlinedProps>`
    position: relative;
    display: flex;
    flex: 0 0 2.75rem;
    width: 2.75rem;
    height: 1.75rem;
    margin-left: auto;
    border-radius: 0.875rem;
    background-color: var(--plasma-switch-trigger-background);
    transition: background-color 0.15s ease-in-out 0.1s;

    &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        margin: auto 0.125rem;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 1.5rem;
        background-color: var(--plasma-switch-ellipse-background);
        box-shadow: ${shadows.tiny};
        transition: width 0.15s ease-in-out, left 0.3s ease-in-out, right 0.3s ease-in-out;
    }

    ${({ disabled, pressed }) =>
        !disabled &&
        css`
            /* stylelint-disable-next-line selector-nested-pattern, selector-type-no-unknown */
            ${StyledRoot}:active &::after {
                width: 1.875rem;
            }

            ${pressed &&
            css`
                &::after {
                    width: 1.875rem;
                }
            `}
        `}

    /* stylelint-disable-next-line selector-nested-pattern, selector-type-no-unknown */
    ${StyledInput}:checked ~ & {
        background-color: var(--plasma-switch-trigger-background-checked);

        &::after {
            left: auto;
            right: 0;
        }
    }

    ${({ focused, outlined }) =>
        addFocus({
            focused,
            outlined,
            outlineRadius: '1rem',
            synthesizeFocus,
        })}
`;
const StyledLabel = styled.span`
    ${body1};
    margin-right: 0.75rem;
    user-select: none;

    ${applyEllipsis}
`;

/**
 * Визуальный переключатель между двумя взаимоисключающими состояниями — вкл. и выкл.
 */
// eslint-disable-next-line prefer-arrow-callback
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
    {
        id,
        name,
        value,
        label,
        checked,
        defaultChecked,
        disabled,
        pressed,
        focused,
        outlined,
        tabIndex,
        onChange,
        onFocus,
        onBlur,
        ...rest
    },
    ref,
) {
    return (
        <StyledRoot disabled={disabled} {...rest}>
            <StyledInput
                id={id}
                ref={ref}
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
                defaultChecked={defaultChecked}
                disabled={disabled}
                tabIndex={tabIndex}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {label && <StyledLabel>{label}</StyledLabel>}
            <StyledTrigger disabled={disabled} pressed={pressed} focused={focused} outlined={outlined} />
        </StyledRoot>
    );
});
