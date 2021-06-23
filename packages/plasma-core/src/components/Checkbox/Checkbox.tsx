import React from 'react';
import styled, { css } from 'styled-components';

import { applyEllipsis } from '../../mixins';
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

export interface CheckboxProps extends ControlProps, FocusProps, InputHTMLAttributes<HTMLInputElement> {}

export const Root = styled.label<{ $isDescription?: boolean }>`
    position: relative;

    align-items: center;
    display: grid;
    grid-template-columns: max-content 1fr;

    ${({ $isDescription }) =>
        $isDescription
            ? css`
                  grid-template-rows: repeat(2, max-content);
                  gap: 0.25rem 0.75rem;
                  grid-template-areas:
                      'trigger label'
                      '. descr';
                  margin-bottom: 0.1875rem;
              `
            : css`
                  grid-gap: 0 0.75rem;
                  grid-template-areas: 'trigger label';
              `}

    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;
export const Input = styled.input`
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    opacity: 0;

    &:focus {
        outline: 0 none;
    }
`;
export const Trigger = styled.div`
    box-sizing: border-box;
    position: relative;

    grid-area: trigger;

    transition: all 0.1s ease-in-out;
`;
export const Label = styled.span`
    ${body1};

    grid-area: label;

    ${applyEllipsis}
`;
export const Description = styled.div`
    ${footnote1};

    grid-area: descr;
    color: ${blackSecondary};
`;
