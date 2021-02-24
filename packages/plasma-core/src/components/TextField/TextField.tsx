import styled, { css, InterpolationFunction } from 'styled-components';

import { applyDisabled } from '../../mixins';
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    margin-top: 0.25rem;
    padding-left: 1rem;
    padding-right: 1rem;

    color: ${secondary};

    ${applyStatusColor};
`;
