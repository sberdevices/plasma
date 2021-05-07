import styled, { css, InterpolationFunction } from 'styled-components';

import { applyDisabled, applyEllipsis } from '../../mixins';
import { accent, critical, secondary, body1, caption } from '../../tokens';
import { InputHTMLAttributes } from '../../types';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    /**
     * Надпись лейбла.
     */
    label?: string;
    /**
     * Подсказка для поля ввода.
     */
    helperText?: string;
    /**
     * Слот для контента справа.
     */
    contentRight?: React.ReactElement;
    /**
     * Статус компонента: заполнен успешно / с ошибкой.
     */
    status?: 'success' | 'error';
}

const applyStatusColor: InterpolationFunction<TextFieldProps> = ({ status }) => css`
    ${status === 'success' &&
    css`
        color: ${accent};
    `};
    ${status === 'error' &&
    css`
        color: ${critical};
    `};
`;

/**
 * ToDo: Переименовать в Field, т.к. данный функционал теперь используется и в Select.
 */
export const TextFieldRoot = styled.div<Pick<TextFieldProps, 'status' | 'disabled'>>`
    ${body1};

    display: block;
    box-sizing: border-box;

    ${applyDisabled};
    ${applyStatusColor};
`;

export const TextFieldHelper = styled.span<Pick<TextFieldProps, 'status' | 'disabled'>>`
    ${caption};

    display: block;

    margin-top: 0.25rem;
    padding-left: 1rem;
    padding-right: 1rem;

    color: ${secondary};

    ${applyStatusColor};
    ${applyEllipsis}
`;
