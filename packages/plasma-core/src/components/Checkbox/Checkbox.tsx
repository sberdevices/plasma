import React from 'react';
import styled from 'styled-components';

import type { FocusProps } from '../../mixins';
import type { InputHTMLAttributes } from '../../types';
import { body1, footnote1, blackSecondary } from '../../tokens';

export type ControlProps = {
    /**
     * Уникальный идентификатор контрола
     */
    id?: string;
    /**
     * Метка-подпись к элементу
     */
    label?: string | number;
    /**
     * Описание элемента
     */
    description?: string | number | React.ReactNode;
};

export interface CheckboxProps
    extends ControlProps,
        FocusProps,
        Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor' | 'onChange' | 'onFocus' | 'onBlur'>,
        Pick<
            InputHTMLAttributes<HTMLInputElement>,
            'name' | 'value' | 'checked' | 'disabled' | 'onChange' | 'onFocus' | 'onBlur'
        > {}

export const Root = styled.label`
    position: relative;

    display: flex;
    flex-wrap: wrap;

    width: max-content;
    max-width: 100%;

    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;
export const Input = styled.input`
    position: absolute;
    opacity: 0;

    &:focus {
        outline: 0 none;
    }
`;
export const Trigger = styled.div`
    box-sizing: border-box;
    position: relative;

    transition: all 0.1s ease-in-out;
    cursor: pointer;
`;
export const Label = styled.span`
    ${body1};

    margin-left: 0.75rem;
    user-select: none;
`;
export const Description = styled.div`
    ${footnote1};

    margin-top: 0.25rem;
    margin-left: 2rem;
    flex-basis: 100%;
    user-select: none;
    color: ${blackSecondary};
`;
