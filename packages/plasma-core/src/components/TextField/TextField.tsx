import styled, { css, InterpolationFunction } from 'styled-components';

import { applyEllipsis, applyDisabled } from '../../mixins';
import { text, accent, success, warning, critical, secondary, tertiary, body1, caption } from '../../tokens';
import type { InputHTMLAttributes, TextareaHTMLAttributes, TextareaResize } from '../../types';

const statuses = {
    success,
    warning,
    error: critical,
};

interface SizeProps {
    /**
     * Размер контрола.
     */
    size?: 'm' | 'l';
}
interface StatusProps {
    /**
     * Статус компонента: заполнен успешно / с ошибкой.
     */
    status?: keyof typeof statuses;
}
interface StateProps {
    $isFocused?: boolean;
}
interface ControlProps {
    /**
     * Надпись лейбла.
     */
    label?: string | number; // ToDo: v2.0 переименовать в placeholder
    /**
     * Подсказка для поля ввода.
     */
    helperText?: string;
    /**
     * Слот для контента справа.
     */
    contentRight?: React.ReactElement;
}

export interface TextFieldProps
    extends SizeProps,
        StatusProps,
        StateProps,
        ControlProps,
        Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * Слот для контента слева.
     */
    contentLeft?: React.ReactElement;
    /**
     * Видимая ширина поля в символах.
     */
    htmlSize?: InputHTMLAttributes<HTMLInputElement>['size'];
}
export interface TextAreaProps
    extends StatusProps,
        StateProps,
        ControlProps,
        TextareaHTMLAttributes<HTMLTextAreaElement> {
    /**
     * Изменение размера текстового поля.
     */
    resize?: TextareaResize;
}

const applyInputStatus: InterpolationFunction<StatusProps> = ({ status }) =>
    status &&
    css`
        caret-color: ${statuses[status]};
    `;

const inputStyles = css`
    box-sizing: border-box;

    width: 100%;
    padding: 0.875rem 1rem;
    border-width: 1px;
    border-style: solid;

    color: ${text};
    caret-color: ${accent};

    font: inherit;
    line-height: inherit;
    letter-spacing: inherit;

    transition: background-color 0.1s ease-in-out, border-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;

    &:focus {
        outline: none;
    }

    &:disabled {
        cursor: inherit;
    }

    &::placeholder {
        color: ${secondary};
    }

    /* stylelint-disable-next-line selector-nested-pattern */
    &[readonly] {
        cursor: default;
        box-shadow: none;
        color: ${tertiary};
    }
`;

interface StyledInputProps extends StatusProps, StateProps {}

/**
 * Base input for both `web` and `ui`.
 */
export const TextFieldInput = styled.input<StyledInputProps>`
    ${inputStyles};
    ${applyInputStatus};
    ${applyEllipsis};
`;

interface StyledTextareaProps extends StatusProps, StateProps {
    $resize?: TextareaResize;
}

/**
 * Base textarea for both `web` and `ui`.
 */
export const TextFieldTextarea = styled.textarea<StyledTextareaProps>`
    display: block;
    height: 9.375rem; /* 150px */
    min-height: 3.5rem; /* 56px */

    ${inputStyles}
    ${applyInputStatus};
    ${applyEllipsis};

    ${({ $resize }) =>
        css`
            ${$resize && `resize: ${$resize};`}
            ${$resize !== 'both' && $resize !== 'horizontal' && 'min-width: 100%;max-width: 100%;'}
        `}
`;

/**
 * Common dynamic placeholder.
 */
export const TextFieldPlaceholder = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;

    width: 100%;
    height: 100%;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;

    color: ${tertiary};
    pointer-events: none;

    transition: all 0.1s ease-in;
    transform-origin: top left;

    ${applyEllipsis}
`;

/**
 * Content wrapper for left and right slots of the field.
 */
export const TextFieldContent = styled.div<{ pos: 'left' | 'right' }>`
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
export const TextFieldHelper = styled.span<TextFieldProps>`
    ${caption};

    display: block;

    margin-top: 0.25rem;
    padding-left: 1rem;
    padding-right: 1rem;

    ${applyEllipsis}
`;

interface StyledRootProps extends TextFieldProps {
    $size?: SizeProps['size'];
    $disabled?: boolean;
    $isContentLeft?: boolean;
    $isContentRight?: boolean;
    $isHelper?: boolean;
}

const applySizes: InterpolationFunction<StyledRootProps> = ({ $size }) => {
    switch ($size) {
        case 'm':
            return css`
                /* stylelint-disable-next-line selector-nested-pattern */
                ${TextFieldInput} {
                    height: 3rem;
                    /* stylelint-disable-next-line number-max-precision */
                    padding: 0.75rem 0.9375rem;
                }
                /* stylelint-disable-next-line selector-nested-pattern */
                ${TextFieldContent} {
                    height: 3rem;
                }
            `;
        case 'l':
            return css`
                /* stylelint-disable-next-line selector-nested-pattern */
                ${TextFieldInput} {
                    height: 3.5rem;
                    padding: 0.9375rem;

                    /* stylelint-disable-next-line selector-nested-pattern */
                    &:not(:placeholder-shown) {
                        padding-top: 1.5rem;
                        padding-bottom: 0.375rem;
                    }

                    &::placeholder {
                        color: transparent;
                    }
                }
                /* stylelint-disable-next-line selector-nested-pattern */
                ${TextFieldPlaceholder} {
                    /* stylelint-disable-next-line number-max-precision */
                    top: 1.125rem;
                    left: 0.9375rem;
                    right: 0.9375rem;
                }
                /* stylelint-disable-next-line selector-nested-pattern */
                ${TextFieldInput}:not(:placeholder-shown) ~ ${TextFieldPlaceholder} {
                    transform: scale(0.75);
                    top: 0.375rem;
                }
                /* stylelint-disable-next-line selector-nested-pattern */
                ${TextFieldContent} {
                    height: 3.5rem;
                }
            `;
        default:
            return null;
    }
};

/**
 * Common container for singular form item.
 * FixMe: v2.0 Переименовать в Field, т.к. данный функционал теперь используется и в Select.
 */
export const TextFieldRoot = styled.div<StyledRootProps>`
    ${body1};

    position: relative;

    display: block;
    box-sizing: border-box;

    color: ${secondary};

    ${applySizes}
    ${applyDisabled};

    ${({ $isContentLeft, $isContentRight }) => css`
        ${TextFieldInput}, ${TextFieldTextarea} {
            ${$isContentLeft && 'padding-left: 3.125rem;'} // 50px
            ${$isContentRight && 'padding-right: 3.125rem;'}
        }

        ${TextFieldPlaceholder} {
            ${$isContentLeft && 'left: 3.125rem;'} // 50px
            ${$isContentRight && 'right: 3.125rem;'}
        }
    `}

    ${({ $isHelper, status }) =>
        status &&
        ($isHelper
            ? css`
                  ${TextFieldHelper} {
                      color: ${statuses[status]};
                  }
              `
            : css`
                  ${TextFieldPlaceholder} {
                      color: ${statuses[status]};
                  }
              `)}
`;
