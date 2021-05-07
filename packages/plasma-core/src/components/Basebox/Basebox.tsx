import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { applyDisabled } from '../../mixins';
import type { DisabledProps, FocusProps } from '../../mixins';
import type { InputHTMLAttributes } from '../../types';
import { body1, accent, white, transparent, blackSecondary } from '../../tokens';

import { IconDone } from './IconDone';

export type Value = string | number;
export type Item = {
    /**
     * Уникальный идентификатор контрола
     */
    id?: string;
    /**
     * Значение контрола
     */
    value: Value;
    /**
     * Метка-подпись к элементу
     */
    label?: string | number;
    /**
     * Описание элемента
     */
    description?: string | number | ReactNode;
};

interface InputTypeProps {
    /**
     * Тип контрола
     */
    type: 'checkbox' | 'radio';
}

export interface BaseboxProps
    extends Item,
        InputTypeProps,
        FocusProps,
        DisabledProps,
        Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor' | 'onChange' | 'onFocus' | 'onBlur'>,
        Pick<InputHTMLAttributes<HTMLInputElement>, 'name' | 'checked' | 'onChange' | 'onFocus' | 'onBlur'> {}

const StyledRoot = styled.label<DisabledProps>`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: max-content;
    max-width: 100%;
    cursor: pointer;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    & + & {
        margin-top: 1.25rem;
    }

    ${applyDisabled};
`;

const StyledInput = styled.input`
    position: absolute;
    opacity: 0;

    &:focus {
        outline: 0 none;
    }
`;

interface StyledTriggerProps {
    $type: InputTypeProps['type'];
    $focused?: FocusProps['focused'];
}

/**
 * Локальные токены.
 */
const trigger = {
    normal: {
        background: `var(--plasma-basebox-trigger-background, ${transparent})`,
        border: 'var(--plasma-basebox-trigger-border)',
        color: `var(--plasma-basebox-trigger-color, ${white})`,
    },
    disabled: {
        background: 'var(--plasma-basebox-trigger-disabled-background)',
        border: 'var(--plasma-basebox-trigger-disabled-border)',
    },
    checkedDisabled: {
        background: 'var(--plasma-basebox-trigger-checked-disabled-background)',
        border: 'var(--plasma-basebox-trigger-checked-disabled-border)',
        color: 'var(--plasma-basebox-trigger-checked-disabled-color)',
    },
};

export const StyledTrigger = styled.div<StyledTriggerProps>`
    box-sizing: border-box;
    position: relative;
    width: 1.25rem;
    height: 1.25rem;
    box-shadow: inset 0 0 0 0.125rem ${trigger.normal.border};
    color: ${white};
    transition: all 0.1s ease-in-out;
    cursor: pointer;

    ${({ $type, $focused }) => {
        const borderRadius = $type === 'checkbox' ? '0.25rem' : '1.25rem';
        const outlineRadius = $type === 'checkbox' ? '0.375rem' : '1.375rem';

        return css`
            border-radius: ${borderRadius};

            ${StyledInput}:focus ~ & {
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

    /* stylelint-disable-next-line selector-nested-pattern, selector-type-no-unknown */
    ${StyledInput}:disabled ~ & {
        background: ${trigger.disabled.background};
        box-shadow: inset 0 0 0 0.125rem ${trigger.disabled.border};
    }

    /* stylelint-disable-next-line selector-nested-pattern, selector-type-no-unknown */
    ${StyledInput}:checked ~ & {
        background: ${accent};
        box-shadow: inset 0 0 0 0.125rem ${accent};
    }
    /* stylelint-disable-next-line selector-nested-pattern, selector-type-no-unknown */
    ${StyledInput}:checked:disabled ~ & {
        background: ${trigger.checkedDisabled.background};
        color: ${trigger.checkedDisabled.color};
        box-shadow: inset 0 0 0 0.125rem ${trigger.checkedDisabled.border};
    }
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
    ${StyledInput}:checked ~ ${StyledTrigger} & {
        transform: scale(1);
    }
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
    transition: transform 0.1s ease-in-out;
    transform: scale(0);
    background-color: ${white};

    /* stylelint-disable-next-line selector-nested-pattern, selector-type-no-unknown */
    ${StyledInput}:checked ~ ${StyledTrigger} & {
        transform: scale(1);
    }
`;

const StyledLabel = styled.span`
    ${body1};
    margin-left: 0.75rem;
    user-select: none;
`;

const StyledDescription = styled.div`
    ${body1};
    margin-top: 0.42rem;
    margin-left: 2rem;
    flex-basis: 100%;
    user-select: none;
    color: ${blackSecondary};
`;

// eslint-disable-next-line prefer-arrow-callback
export const Basebox = React.forwardRef<HTMLInputElement, BaseboxProps>(function Basebox(
    {
        id,
        type,
        name,
        value,
        label,
        description,
        checked,
        focused,
        disabled,
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
                type={type}
                name={name}
                value={value}
                checked={checked}
                disabled={disabled}
                tabIndex={tabIndex}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <StyledTrigger $type={type} $focused={focused}>
                {type === 'checkbox' ? <StyledMark color="inherit" size="xs" /> : <StyledEllipse />}
            </StyledTrigger>
            {label && <StyledLabel>{label}</StyledLabel>}
            {description && <StyledDescription>{description}</StyledDescription>}
        </StyledRoot>
    );
});
