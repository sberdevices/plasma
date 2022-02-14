import styled, { css } from 'styled-components';
import { HTMLAttributes } from 'react';

import { applyEllipsis, applyDisabled } from '../../mixins';
import { secondary, tertiary, body1, caption } from '../../tokens';

import { fieldStatuses } from './Field.statuses';

export interface FieldProps {
    $isFocused?: boolean;
    /**
     * Размер контрола.
     */
    size?: 'm' | 'l';
    /**
     * Статус компонента: заполнен успешно / с ошибкой.
     */
    status?: keyof typeof fieldStatuses;
    /**
     * Надпись лейбла.
     */
    label?: string | number; // ToDo: v2.0 переименовать в placeholder; убрать тип number
    /**
     * Подсказка для поля ввода.
     */
    helperText?: string;
    /**
     * Слот для контента слева.
     */
    contentLeft?: React.ReactElement;
    /**
     * Слот для контента справа.
     */
    contentRight?: React.ReactElement;
}

/**
 * Common dynamic placeholder.
 */
export const FieldPlaceholder = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;

    width: 100%;
    height: 100%;

    color: ${tertiary};
    pointer-events: none;

    transition: all 0.1s ease-in;
    transform-origin: top left;

    ${applyEllipsis}
`;

/**
 * Content wrapper for left and right slots of the field.
 */
export const FieldContent = styled.div<{ pos: 'left' | 'right' }>`
    position: absolute;
    top: 0;
    ${({ pos }) => (pos === 'left' ? 'left: 1rem' : 'right: 1rem')};
    bottom: 0;

    display: flex;
    align-items: center;
    height: 3rem;
`;

/**
 * An inline block to place a helper text under the form item.
 */
export const FieldHelper = styled.span`
    ${caption};

    display: block;

    margin-top: 0.25rem;

    ${applyEllipsis}
`;

export interface FieldRootProps extends Pick<FieldProps, 'status'>, HTMLAttributes<HTMLDivElement> {
    $size?: FieldProps['size'];
    $disabled?: boolean;
    $isContentLeft?: boolean;
    $isContentRight?: boolean;
    $isHelper?: boolean;
}

/**
 * Common container for singular form item.
 */
export const FieldRoot = styled.div<FieldRootProps>`
    ${body1};

    position: relative;

    display: block;
    box-sizing: border-box;

    color: ${secondary};

    ${applyDisabled}

    ${({ $size = 'm' }) =>
        $size === 'l'
            ? css`
                  /* stylelint-disable-next-line selector-nested-pattern */
                  ${FieldPlaceholder} {
                      top: 1.125rem;
                      left: 1rem;
                      right: 1rem;
                  }
                  /* stylelint-disable-next-line selector-nested-pattern */
                  input:not(:placeholder-shown) ~ ${FieldPlaceholder} {
                      transform: scale(0.75);
                      top: 0.375rem;
                  }
                  /* stylelint-disable-next-line selector-nested-pattern */
                  ${FieldContent} {
                      height: 3.5rem;
                  }
              `
            : css`
                  /* stylelint-disable-next-line selector-nested-pattern */
                  ${FieldContent} {
                      height: 3rem;
                  }
              `}

    ${({ $isContentLeft, $isContentRight }) => css`
        input, textarea {
            ${$isContentLeft && 'padding-left: 3.125rem;'} // 50px
            ${$isContentRight && 'padding-right: 3.125rem;'}
        }

        ${FieldPlaceholder} {
            ${$isContentLeft && 'left: 3.125rem;'} // 50px
            ${$isContentRight && 'right: 3.125rem;'}
        }
    `}

    ${({ $isHelper, status }) =>
        status &&
        ($isHelper
            ? css`
                  ${FieldHelper} {
                      color: ${fieldStatuses[status]};
                  }
              `
            : css`
                  ${FieldPlaceholder} {
                      color: ${fieldStatuses[status]};
                  }
              `)}
`;
