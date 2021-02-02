import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { accent, white, surfaceLiquid03, body1 } from '@sberdevices/plasma-tokens';

import { applyDisabled, DisabledProps, addFocus, FocusProps, OutlinedProps } from '../../mixins';
import { InputHTMLAttributes } from '../../types';
import { Item } from '../Checkbox/Basebox';

export interface SwitchProps
    extends Item,
        DisabledProps,
        FocusProps,
        OutlinedProps,
        Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor' | 'onChange' | 'onFocus' | 'onBlur'>,
        Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {}

const StyledRoot = styled.label<DisabledProps>`
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    cursor: pointer;

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

const StyledTrigger = styled.div<DisabledProps & FocusProps & OutlinedProps>`
    position: relative;
    display: flex;
    flex: 0 0 2.75rem;
    height: 1.75rem;
    border-radius: 0.875rem;
    background-color: ${surfaceLiquid03};
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
        background: ${white};
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.11);
        transition: width 0.15s ease-in-out, left 0.3s ease-in-out, right 0.3s ease-in-out;
    }

    ${({ disabled }) =>
        !disabled &&
        css`
            /* stylelint-disable-next-line selector-nested-pattern, selector-type-no-unknown */
            ${StyledRoot}:active &::after {
                width: 1.875rem;
            }
        `}

    /* stylelint-disable-next-line selector-nested-pattern, selector-type-no-unknown */
    ${StyledInput}:checked ~ & {
        background-color: ${accent};

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
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
    white-space: nowrap;

    /* stylelint-disable-next-line max-line-length */
    /* stylelint-disable-next-line selector-nested-pattern, declaration-block-semicolon-newline-after, rule-empty-line-before */
    ${StyledTrigger} ~ & {
        margin-left: 0.75rem;
        margin-right: 0;
    }
`;

/**
 * Визуальный переключатель между двумя взаимоисключающими состояниями — вкл. и выкл.
 */
// eslint-disable-next-line prefer-arrow-callback
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
    { id, name, value, label, checked, disabled, focused, outlined, tabIndex, onChange, onFocus, onBlur, ...rest },
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
                disabled={disabled}
                tabIndex={tabIndex}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {label && <StyledLabel>{label}</StyledLabel>}
            <StyledTrigger disabled={disabled} focused={focused} outlined={outlined} />
        </StyledRoot>
    );
});
