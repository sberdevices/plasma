import React from 'react';
import styled from 'styled-components';

import { applyEllipsis, applyNoSelect } from '../../mixins';
import { secondary } from '../../tokens';
import type { InputHTMLAttributes } from '../../types';
import { Body1, Footnote1 } from '../Typography';

export type ControlProps = {
    /**
     * Уникальный идентификатор контрола
     */
    id?: string;
    /**
     * Метка-подпись к элементу
     */
    label?: React.ReactNode;
    /**
     * Описание элемента
     */
    description?: React.ReactNode;
};
export interface BaseboxProps extends ControlProps, InputHTMLAttributes<HTMLInputElement> {
    children?: never;
}

export const StyledRoot = styled.div`
    ${applyNoSelect}

    position: relative;
    align-items: flex-start;
    display: flex;
    cursor: pointer;
`;

export const StyledContentWrapper = styled.label`
    position: relative;
    align-items: flex-start;
    display: flex;
    width: 100%;
`;

export const StyledInput = styled.input`
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    opacity: 0;

    &:focus {
        outline: 0 none;
    }
`;
export const StyledTrigger = styled.div`
    box-sizing: border-box;
    position: relative;
    transition: all 0.1s ease-in-out;
`;
export const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 0.75rem;
`;
export const StyledLabel = styled(Body1)`
    ${applyEllipsis}
`;
export const StyledDescription = styled(Footnote1)`
    color: ${secondary};
`;
