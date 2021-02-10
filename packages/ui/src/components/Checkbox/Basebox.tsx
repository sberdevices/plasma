import React from 'react';
import styled, { css } from 'styled-components';
import { body1, accent, secondary, white } from '@sberdevices/plasma-tokens';
import { IconDone } from '@sberdevices/plasma-icons';

import { applyDisabled, DisabledProps, FocusProps, InteractionProps } from '../../mixins';
import { InputHTMLAttributes } from '../../types';

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
        InteractionProps,
        Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor' | 'onChange' | 'onFocus' | 'onBlur'>,
        Pick<InputHTMLAttributes<HTMLInputElement>, 'name' | 'checked' | 'onChange' | 'onFocus' | 'onBlur'> {}

const StyledRoot = styled.label<DisabledProps>`
    position: relative;
    display: flex;
    width: max-content;
    max-width: 100%;
    cursor: pointer;

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

interface StyledTriggerProps extends InteractionProps {
    $type: InputTypeProps['type'];
    $focused?: FocusProps['focused'];
}

const StyledTrigger = styled.div<StyledTriggerProps>`
    box-sizing: border-box;
    position: relative;
    width: 1.25rem;
    height: 1.25rem;
    border: 0.125rem solid ${secondary};
    color: ${white};
    transition: all 0.1s ease-in-out;
    cursor: pointer;

    ${({ $type, $focused }) => {
        const borderRadius = $type === 'checkbox' ? '0.25rem' : '1.25rem';
        const outlineRadius = $type === 'checkbox' ? '0.375rem' : '1.375rem';

        return css`
            border-radius: ${borderRadius};

            ${StyledInput}:focus ~ & {
                border-color: transparent;

                &::before {
                    box-shadow: 0 0 0 0.125rem ${accent};
                }
            }

            &::before {
                content: '';

                position: absolute;
                top: -0.25rem;
                left: -0.25rem;
                right: -0.25rem;
                bottom: -0.25rem;

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

    ${({ scaleOnInteraction }) =>
        scaleOnInteraction &&
        css`
            ${StyledRoot}:hover & {
                transform: scale(1.04);
            }

            ${StyledRoot}:active & {
                transform: scale(0.96);
            }
        `}

    /* stylelint-disable-next-line selector-nested-pattern, selector-type-no-unknown */
    ${StyledInput}:checked ~ & {
        background: ${accent};
        border-color: ${accent};
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

// eslint-disable-next-line prefer-arrow-callback
export const Basebox = React.forwardRef<HTMLInputElement, BaseboxProps>(function Basebox(
    {
        id,
        type,
        name,
        value,
        label,
        checked,
        focused,
        disabled,
        tabIndex,
        scaleOnInteraction = true,
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
            <StyledTrigger $type={type} $focused={focused} scaleOnInteraction={scaleOnInteraction}>
                {type === 'checkbox' ? <StyledMark color="inherit" size="xs" /> : <StyledEllipse />}
            </StyledTrigger>
            {label && <StyledLabel>{label}</StyledLabel>}
        </StyledRoot>
    );
});
